import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FileText,
  Star,
  Mail,
  Users,
  ShieldCheck,
  LogOut,
  Sprout,
  Layers,
  UserCog,
  Share2,
  X,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/products', label: 'Products', icon: Package },
    { to: '/stock', label: 'Stock Matrix', icon: Layers },
    { to: '/orders', label: 'Orders', icon: ShoppingBag },
    { to: '/blog', label: 'Blog Posts', icon: FileText },
    { to: '/reviews', label: 'Reviews', icon: Star },
    { to: '/messages', label: 'Messages', icon: Mail },
    { to: '/newsletter', label: 'Subscribers', icon: Users },
    { to: '/social-media', label: 'Social Media', icon: Share2 },
    ...(user?.role === 'admin'
      ? [
          { to: '/accounts', label: 'Account Mgmt', icon: UserCog },
          { to: '/audit-logs', label: 'Audit Logs', icon: ShieldCheck },
        ]
      : []),
  ];

  const sidebarContent = (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="overflow-y-auto">
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src="/logo-mark.png"
              alt="The Farm's Logo"
              className="w-9 h-9 object-contain rounded-lg drop-shadow-[0_2px_8px_rgba(234,161,34,0.3)] shrink-0"
            />
            <div>
              <h1 className="font-bold text-slate-100 tracking-tight text-sm whitespace-nowrap">The Farm's</h1>
              <p className="text-[11px] text-amber-500/90 font-medium whitespace-nowrap">Admin Control Panel</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Session */}
      <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Admin User'}</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">{user?.role || 'admin'}</p>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on lg: 1024px+) */}
      <div className="hidden lg:block shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Drawer (visible on < lg: 1024px when open) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          {/* Slide-out Sidebar */}
          <div className="relative z-10 animate-slide-right h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
