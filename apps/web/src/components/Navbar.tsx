import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const Navbar: React.FC = () => {
  const { openCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = getTotalItems();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/wholesale', label: 'Wholesale' },
    { to: '/blog', label: 'Recipes' },
    { to: '/our-story', label: 'Our Story' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-turmeric-500/10 transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 2xl:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 xs:gap-3.5 group shrink-0 whitespace-nowrap">
          <img
            src="/logo-mark.png"
            alt="The Farm's Official Logo"
            className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 object-contain rounded-xl drop-shadow-[0_4px_12px_rgba(234,161,34,0.35)] group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="shrink-0">
            <span className="font-serif text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-paper leading-none block whitespace-nowrap">
              The Farm's
            </span>
            <span className="block text-[9px] xs:text-[10px] uppercase tracking-widest text-turmeric-500 font-semibold mt-0.5 whitespace-nowrap">
              Pure &amp; Cold-Ground
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 2xl:gap-10 shrink-0">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-xs lg:text-sm 2xl:text-base font-medium transition-colors hover:text-turmeric-500 whitespace-nowrap ${
                  isActive ? 'text-turmeric-500 font-semibold' : 'text-slate-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 xs:gap-3 shrink-0">
          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative p-2 sm:p-2.5 rounded-xl bg-turmeric-500 text-slate-950 hover:bg-turmeric-600 transition-all font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-turmeric-500/20 cursor-pointer whitespace-nowrap"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="hidden sm:inline text-xs uppercase tracking-wider whitespace-nowrap">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-chilli-500 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center border-2 border-charcoal">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile/Tablet Menu Button (Visible on < lg screens) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 border border-turmeric-500/20 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-turmeric-500/20 px-4 py-5 space-y-3 glass-panel bg-[var(--card-bg)] animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-300 hover:text-turmeric-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
