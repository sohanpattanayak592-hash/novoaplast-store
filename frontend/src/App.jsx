import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { EngagementProvider } from './context/EngagementContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import CollectionsHub from './pages/CollectionsHub'
import CollectionDetails from './pages/CollectionDetails'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <EngagementProvider>
      <CartProvider>
        <div className="grain-overlay min-h-screen bg-dark-900 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsHub />} />
              <Route path="/collections/:id" element={<CollectionDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </EngagementProvider>
  )
}

export default App

