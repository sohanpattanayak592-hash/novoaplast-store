import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { EngagementProvider } from './context/EngagementContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy loaded pages for performance optimization
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const CollectionsHub = lazy(() => import('./pages/CollectionsHub'))
const CollectionDetails = lazy(() => import('./pages/CollectionDetails'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const FanClubPage = lazy(() => import('./pages/FanClubPage'))

// Account Layouts
const AccountLayout = lazy(() => import('./pages/account/AccountLayout'))
const Dashboard = lazy(() => import('./pages/account/Dashboard'))
const OrderHistory = lazy(() => import('./pages/account/OrderHistory'))
const Addresses = lazy(() => import('./pages/account/Addresses'))
const Wishlist = lazy(() => import('./pages/account/Wishlist'))
const Support = lazy(() => import('./pages/account/Support'))
const ProfileSettings = lazy(() => import('./pages/account/ProfileSettings'))

// Legal Pages
const AboutUs = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.AboutUs })))
const ShippingPolicy = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.ShippingPolicy })))
const RefundPolicy = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.RefundPolicy })))
const ContactUs = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.ContactUs })))
const PrivacyPolicy = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.PrivacyPolicy })))
const TermsOfService = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.TermsOfService })))

// Simple loading spinner fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="w-12 h-12 border-4 border-novo-500/30 border-t-novo-500 rounded-full animate-spin"></div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <EngagementProvider>
        <CartProvider>
          <div className="grain-overlay min-h-screen bg-dark-900 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
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
              </Suspense>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </EngagementProvider>
    </AuthProvider>
  )
}

export default App

