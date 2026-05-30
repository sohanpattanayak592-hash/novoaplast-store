import urllib.request
import urllib.error
import json

req = urllib.request.Request(
    'https://novoplast-store.vercel.app/api/orders',
    data=json.dumps({
        'items': [{
            'productId': '1', 
            'productName': 'test', 
            'selectedSize': 'A4', 
            'selectedQty': '1', 
            'personalization': '', 
            'shloka': '', 
            'totalPrice': 100
        }], 
        'contactInfo': {
            'name': 'test', 
            'email': 'test@example.com', 
            'phone': '123', 
            'address': '1', 
            'city': '1', 
            'state': '1', 
            'pincode': '1'
        }, 
        'totalAmount': 100
    }).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    res = urllib.request.urlopen(req)
    print("Success:", res.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Error:", e.code, e.read().decode('utf-8'))
