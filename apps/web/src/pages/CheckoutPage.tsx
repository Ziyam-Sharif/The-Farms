import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { fetchApi } from '../lib/api';
import { ShieldCheck, CheckCircle2, CreditCard, Smartphone, Banknote, ArrowRight, Truck, AlertCircle } from 'lucide-react';
import { PaymentMethodEnum } from '@farms/shared-types';

export const CheckoutPage: React.FC = () => {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    province: 'Punjab',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>('COD');

  const subtotal = getSubtotal();
  const shipping = subtotal >= 2000 ? 0 : 200;
  const grandTotal = subtotal + shipping;

  const validateForm = (): boolean => {
    setValidationError(null);

    if (!shippingAddress.name.trim() || shippingAddress.name.trim().length < 3) {
      setValidationError('Please enter your full name (minimum 3 characters).');
      return false;
    }

    const cleanPhone = shippingAddress.phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      setValidationError('Please enter a valid Pakistani mobile number (e.g. 0300-1234567 or +923001234567).');
      return false;
    }

    if (!shippingAddress.street.trim() || shippingAddress.street.trim().length < 6) {
      setValidationError('Please provide a complete delivery street address with house/block details.');
      return false;
    }

    if (!shippingAddress.city.trim()) {
      setValidationError('Please enter your destination city.');
      return false;
    }

    return true;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        items: items.map((item) => ({
          product: item.product._id,
          title: item.product.title,
          qty: item.qty,
        })),
        shippingAddress: {
          ...shippingAddress,
          name: shippingAddress.name.trim(),
          phone: shippingAddress.phone.trim(),
          street: shippingAddress.street.trim(),
          city: shippingAddress.city.trim(),
        },
        paymentMethod,
      };

      const res = await fetchApi('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res.data?.order) {
        setPlacedOrder(res.data.order);
        clearCart();
      }
    } catch (err: any) {
      setValidationError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="max-w-3xl 2xl:max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-paper">Order Placed Successfully!</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Thank you for ordering from <span className="font-bold text-turmeric-500">The Farm's</span>. Your tracking number is:
        </p>
        <div className="p-4 rounded-xl bg-turmeric-500/10 border border-turmeric-500/30 text-turmeric-500 font-mono text-2xl font-bold inline-block">
          {placedOrder.orderNumber}
        </div>
        <p className="text-xs text-slate-500">
          We will contact you via WhatsApp / SMS ({placedOrder.shippingAddress?.phone}) to confirm delivery dispatch.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl 2xl:max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-paper">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500">Please add items to your cart before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 space-y-6 sm:space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-paper tracking-tight">Checkout</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Complete your delivery and payment details.</p>
      </div>

      {validationError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Shipping Form & Payment Selection */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Shipping Address */}
          <div className="p-4 sm:p-6 rounded-2xl bg-paperDark/5 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-bold text-base text-charcoal dark:text-paper flex items-center gap-2">
              <Truck className="w-5 h-5 text-turmeric-500" />
              <span>1. Delivery Destination</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mahmood"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  className="w-full bg-paper dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full bg-paper dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Street Address / House # *</label>
              <input
                type="text"
                required
                placeholder="House #, Street name, Sector/Block"
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                className="w-full bg-paper dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full bg-paper dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Province *</label>
                <select
                  value={shippingAddress.province}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })}
                  className="w-full bg-paper dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm cursor-pointer"
                >
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="KPK">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Islamabad">Islamabad Capital Territory</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-4 sm:p-6 rounded-2xl bg-paperDark/5 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-bold text-base text-charcoal dark:text-paper flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-turmeric-500" />
              <span>2. Payment Option</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { id: 'COD', label: 'Cash on Delivery (COD)', desc: 'Pay when order arrives', icon: Banknote },
                { id: 'Card', label: 'Credit/Debit Card (Stripe)', desc: 'Secure Visa & Mastercard', icon: CreditCard },
                { id: 'JazzCash', label: 'JazzCash Wallet', desc: 'Instant mobile redirect', icon: Smartphone },
                { id: 'Easypaisa', label: 'Easypaisa Mobile', desc: 'Instant mobile payment', icon: Smartphone },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as PaymentMethodEnum)}
                    className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-turmeric-500 bg-turmeric-500/10'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-turmeric-500' : 'text-slate-400'}`} />
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-charcoal dark:text-paper">{method.label}</p>
                        <p className="text-[10px] sm:text-xs text-slate-500">{method.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-paperDark/5 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 sm:space-y-6">
          <h2 className="font-bold text-base text-charcoal dark:text-paper">Order Summary</h2>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.product._id} className="flex items-center justify-between text-xs">
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-charcoal dark:text-paper truncate">{item.product.title}</p>
                  <p className="text-slate-500">Qty: {item.qty}</p>
                </div>
                <span className="font-bold text-turmeric-500 shrink-0">PKR {item.product.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span>PKR {subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Shipping Delivery</span>
              <span>{shipping === 0 ? 'FREE' : `PKR ${shipping}`}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-bold text-charcoal dark:text-paper pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>Total Payable</span>
              <span className="text-turmeric-500">PKR {grandTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-shimmer w-full text-slate-950 font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-turmeric-500/20 disabled:opacity-50 cursor-pointer text-xs sm:text-sm whitespace-nowrap"
          >
            <span className="whitespace-nowrap">{loading ? 'Processing Order...' : 'Place Order Now'}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </form>
    </div>
  );
};
