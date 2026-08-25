import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { StarfieldBackground } from './components/StarfieldBackground';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';
import { AboutPage } from './pages/AboutPage';
import { WholesalePage } from './pages/WholesalePage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';

export default function App() {
  useEffect(() => {
    // Permanently enforce dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between bg-[var(--bg-paper)] bg-fixed text-paper transition-colors duration-500 relative selection:bg-turmeric-500 selection:text-slate-950">
        {/* Continuous Twinkling Glowing Stars & Radiant Ambient Light Orbs */}
        <StarfieldBackground />

        <div className="relative z-10">
          <Navbar />
          <CartDrawer />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/wholesale" element={<WholesalePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/track" element={<OrderTrackingPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
              <Route path="/our-story" element={<AboutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
