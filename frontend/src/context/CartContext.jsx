import React, { createContext, useContext, useState, useEffect } from 'react'

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

  const getCartTotal = () => {
    return items.reduce((sum, item) => sum + (item.totalPrice || 0), 0)
  }

  const itemCount = items.length

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, getCartTotal, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}
