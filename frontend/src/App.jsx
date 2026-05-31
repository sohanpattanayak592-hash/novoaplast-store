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
import AuthPage from './pages/AuthPage'
import TrackOrder from './pages/TrackOrder'
import AccountLayout from './pages/account/AccountLayout'
import Dashboard from './pages/account/Dashboard'
import OrderHistory from './pages/account/OrderHistory'
import Addresses from './pages/account/Addresses'
import Wishlist from './pages/account/Wishlist'
import Support from './pages/account/Support'
import ProfileSettings from './pages/account/ProfileSettings'
import { AuthProvider } from './context/AuthContext'
import { AboutUs, ShippingPolicy, RefundPolicy, ContactUs, PrivacyPolicy, TermsOfService } from './pages/LegalPages'
import AdminPage from './pages/AdminPage'
import FanClubPage from './pages/FanClubPage'

function App() {
  return (
    <AuthProvider>
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
                <Route path="/login" element={<AuthPage />} />
                <Route path="/track" element={<TrackOrder />} />
                
                {/* Admin Dashboard */}
                <Route path="/admin" element={<AdminPage />} />
                
                {/* Fan Club Pages */}
                <Route path="/fanclub/:id" element={<FanClubPage />} />
                
                {/* Account Dashboard Routes */}
                <Route path="/account" element={<AccountLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="orders" element={<OrderHistory />} />
                  <Route path="addresses" element={<Addresses />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="support" element={<Support />} />
                  <Route path="settings" element={<ProfileSettings />} />
                </Route>

                {/* Legal & Info Pages */}
                <Route path="/about" element={<AboutUs />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/refund" element={<RefundPolicy />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </EngagementProvider>
    </AuthProvider>
  )
}

export default App

