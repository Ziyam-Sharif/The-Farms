import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { OrdersPage } from './pages/OrdersPage';
import { BlogPage } from './pages/BlogPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { MessagesPage } from './pages/MessagesPage';
import { SubscribersPage } from './pages/SubscribersPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { AccountsPage } from './pages/AccountsPage';
import { SocialMediaPage } from './pages/SocialMediaPage';
import { StockPage } from './pages/StockPage';
import { Menu, Sprout } from 'lucide-react';

const ProtectedLayout: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 flex-col lg:flex-row">
      {/* Mobile Top Header (Visible on < lg: 1024px) */}
      <header className="lg:hidden h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-100 text-sm">The Farm's Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 capitalize">
            {user?.role || 'admin'}
          </span>
        </div>
      </header>

      {/* Responsive Sidebar (Desktop Fixed / Mobile Drawer) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/newsletter" element={<SubscribersPage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/audit-logs" element={<AuditLogsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
