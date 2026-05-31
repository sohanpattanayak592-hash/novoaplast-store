import React, { createContext, useContext, useState, useEffect } from 'react'
import { BUNDLE_DISCOUNTS } from '../data/pricingConfig'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('novoplast_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('novoplast_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (item) => {
    // Each item gets a unique cartId so the same product with different configs can exist
    const cartItem = {
      ...item,
      cartId: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    }
    setItems((prev) => [...prev, cartItem])
    return cartItem
  }

  const removeFromCart = (cartId) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId))
  }

  const clearCart = () => {
    setItems([])
  }

  const getCartSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.totalPrice || 0), 0)
  }

  const getBundleDiscount = () => {
    // Count only items that are posters (either custom posters or collection posters)
    const posterCount = items.filter(i => 
      i.variant === 'standard' || 
      i.variant === 'collection-poster' || 
      i.productId === 'custom-posters' || 
      i.category === 'posters'
    ).length
    
    if (posterCount === 0) return { discountValue: 0, label: null, percentage: 0 }

    // Find applicable discount (ordered highest to lowest in config, or we sort to be safe)
    const sortedDiscounts = [...BUNDLE_DISCOUNTS].sort((a, b) => b.minQty - a.minQty)
    const applicableDiscount = sortedDiscounts.find(d => posterCount >= d.minQty)

    if (applicableDiscount) {
      // Calculate total price of ALL posters to apply discount to
      const posterSubtotal = items
        .filter(i => i.variant === 'standard' || i.variant === 'collection-poster' || i.productId === 'custom-posters' || i.category === 'posters')
        .reduce((sum, item) => sum + (item.totalPrice || 0), 0)
        
      return {
        discountValue: Math.round(posterSubtotal * applicableDiscount.discount),
        label: applicableDiscount.label,
        percentage: applicableDiscount.discount
      }
    }
    
    return { discountValue: 0, label: null, percentage: 0 }
  }

  const getCartTotal = () => {
    const subtotal = getCartSubtotal()
    const { discountValue } = getBundleDiscount()
    return subtotal - discountValue
  }

  const itemCount = items.length

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartSubtotal, 
      getBundleDiscount, 
      getCartTotal, 
      itemCount 
    }}>
      {children}
    </CartContext.Provider>
  )
}
