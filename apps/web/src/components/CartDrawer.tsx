import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const CartDrawer: React.FC = () => {
  const { isOpen, closeCart, items, updateQty, removeItem, getSubtotal } = useCartStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 xs:pl-10">
        <div className="w-screen max-w-full xs:max-w-md bg-paper dark:bg-charcoal border-l border-turmeric-500/20 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-turmeric-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-turmeric-500" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-charcoal dark:text-paper">Your Cart</h2>
            </div>
            <button onClick={closeCart} className="p-2 text-slate-400 hover:text-slate-200 cursor-pointer" aria-label="Close cart">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-turmeric-500/10 border-b border-turmeric-500/20 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">🎉 You qualify for FREE Nationwide Delivery!</p>
            ) : (
              <div>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-xs">
                  Add <span className="font-bold text-turmeric-500">PKR {freeShippingThreshold - subtotal}</span> more for Free Shipping!
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-turmeric-500 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-slate-500 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-400 opacity-50" />
                <p className="text-sm font-medium">Your cart is currently empty.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product._id} className="flex gap-3 sm:gap-4 p-3 rounded-xl bg-paperDark/5 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <img
                    src={item.product.images[0]?.url || 'https://via.placeholder.com/80'}
                    alt={item.product.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-charcoal dark:text-paper truncate">{item.product.title}</h3>
                    <p className="text-xs text-turmeric-500 font-bold mt-0.5">PKR {item.product.price}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item.product._id, item.qty - 1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-charcoal dark:text-paper">{item.qty}</span>
                        <button onClick={() => updateQty(item.product._id, item.qty + 1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.product._id)} className="text-slate-400 hover:text-rose-500 cursor-pointer p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-turmeric-500/10 space-y-3 sm:space-y-4 bg-paper dark:bg-charcoal">
              <div className="flex items-center justify-between text-sm sm:text-base font-bold text-charcoal dark:text-paper">
                <span>Subtotal</span>
                <span>PKR {subtotal}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn-shimmer w-full text-slate-950 font-bold py-3 sm:py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-turmeric-500/20 cursor-pointer text-xs sm:text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
