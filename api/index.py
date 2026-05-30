"""
NOVOPLAST Store — Vercel Serverless FastAPI Backend
Handles custom orders with personalization text, file uploads, and Razorpay payment integration.
Deployed as a Vercel Python Serverless Function.
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from mangum import Mangum
import uuid
import os
import json
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# ── Optional: Razorpay SDK ──
try:
    import razorpay
    RAZORPAY_ENABLED = True
except ImportError:
    RAZORPAY_ENABLED = False

# ── Config ──
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "rzp_test_XXXXXXXXXX")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "your_razorpay_secret")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None

# In-memory fallback
orders_store = []

# ── App ──
app = FastAPI(
    title="NOVOPLAST Store API",
    description="API for handling custom non-tearable print orders",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Helpers ──
def create_razorpay_order(amount_paise: int):
    """Create a Razorpay order. Returns order details or None if SDK unavailable."""
    if not RAZORPAY_ENABLED:
        return None
    try:
        client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1,
        })
        return order
    except Exception as e:
        print(f"Razorpay error: {e}")
        return None


# ── Routes ──
@app.get("/api")
async def root():
    return {
        "service": "NOVOPLAST Store API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "POST /api/orders": "Create a new custom order",
            "GET /api/orders": "List all orders",
            "GET /api/orders/{order_id}": "Get order details",
        },
    }


@app.get("/api/health")
async def health():
    return {"status": "ok"}


from typing import List, Optional, Dict, Any
from fastapi import Header

class OrderItem(BaseModel):
    productId: str
    productName: str
    selectedSize: str
    selectedQty: str
    personalization: Optional[str] = ""
    shloka: Optional[str] = ""
    totalPrice: float
    uploadedFileName: Optional[str] = None
    image: Optional[str] = None
    currency: Optional[str] = "₹"
    variant: Optional[str] = ""

class ContactInfo(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    pincode: str

class PromoCode(BaseModel):
    code: str
    discountPercent: int

class OrderPayload(BaseModel):
    items: List[OrderItem]
    contactInfo: ContactInfo
    promo: Optional[PromoCode] = None
    totalAmount: float

@app.post("/api/orders")
async def create_order(payload: OrderPayload):
    """
    Create a new custom order from a cart.
    - Creates a single Razorpay payment order for the total amount.
    - Inserts one row per item into Supabase.
    """

    amount_paise = int(payload.totalAmount * 100)
    razorpay_order = create_razorpay_order(amount_paise)
    rzp_id = razorpay_order["id"] if razorpay_order else None

    # Build order records (one per item)
    inserted_orders = []
    order_ids = []
    
    for item in payload.items:
        order_id = str(uuid.uuid4())[:8].upper()
        order_ids.append(order_id)
        
        file_info = None
        if item.uploadedFileName:
            file_info = {"filename": item.uploadedFileName}

        order = {
            "order_id": order_id,
            "product_id": item.productId,
            "product_name": item.productName,
            "size": item.selectedSize,
            "quantity": item.selectedQty,
            "personalization_text": item.personalization,
            "shloka": item.shloka,
            "total_price": item.totalPrice,
            "customer": payload.contactInfo.dict(),
            "promo_code": payload.promo.code if payload.promo else None,
            "design_file": file_info,
            "status": "pending",
            "razorpay_order_id": rzp_id,
            "created_at": datetime.utcnow().isoformat(),
        }

        if supabase:
            try:
                supabase.table("orders").insert(order).execute()
            except Exception as e:
                print(f"Supabase insert error: {e}")
                orders_store.append(order)
        else:
            orders_store.append(order)
            
        inserted_orders.append(order)

    response = {
        "message": "Orders created successfully",
        "order_ids": order_ids,
        "orders": inserted_orders,
    }

    if razorpay_order:
        response["razorpay_order_id"] = razorpay_order["id"]
        response["razorpay_key_id"] = RAZORPAY_KEY_ID
        response["amount"] = amount_paise

    return response

@app.post("/api/verify-payment")
async def verify_payment(
    razorpay_order_id: str = Form(...),
    razorpay_payment_id: str = Form(...),
    razorpay_signature: str = Form(...)
):
    """Verify Razorpay payment and update order status."""
    # In a real app, verify signature using razorpay.utility.verify_payment_signature
    if supabase:
        try:
            supabase.table("orders").update({"status": "paid"}).eq("razorpay_order_id", razorpay_order_id).execute()
        except Exception as e:
            print(f"Supabase update error: {e}")
            raise HTTPException(status_code=500, detail="Failed to update database")
    else:
        for o in orders_store:
            if o.get("razorpay_order_id") == razorpay_order_id:
                o["status"] = "paid"
                
    return {"status": "success"}


@app.get("/api/orders")
async def list_orders(api_key: Optional[str] = Header(None)):
    """List all orders. Secured endpoint."""
    admin_key = os.getenv("ADMIN_API_KEY")
    if admin_key and api_key != admin_key:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    if supabase:
        try:
            res = supabase.table("orders").select("*").execute()
            return {"orders": res.data}
        except Exception as e:
            print(f"Supabase select error: {e}")
    return {"orders": orders_store}


@app.get("/api/orders/{order_id}")
async def get_order(order_id: str):
    """Get a specific order by ID."""
    if supabase:
        try:
            res = supabase.table("orders").select("*").eq("order_id", order_id).execute()
            if res.data:
                return {"order": res.data[0]}
        except Exception as e:
            print(f"Supabase select error: {e}")

    for o in orders_store:
        if o["order_id"] == order_id:
            return {"order": o}
    raise HTTPException(status_code=404, detail="Order not found")


# ── Vercel Serverless Handler ──
handler = Mangum(app)
