import React, { useState } from 'react';
import { fetchApi } from '../lib/api';
import { Search, CheckCircle2, Clock, Truck, Package, AlertCircle } from 'lucide-react';
import { IOrder } from '@farms/shared-types';

export const OrderTrackingPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<IOrder | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await fetchApi(`/orders/track/${orderNumber}?phone=${phone}`);
      if (res.data?.order) {
        setOrder(res.data.order);
      }
    } catch (err: any) {
      setError(err.message || 'Order not found matching provided details.');
    } finally {
      setLoading(false);
    }
  };

  const statuses = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'];

  const getStepIndex = (currentStatus: string) => {
    const idx = statuses.indexOf(currentStatus);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-paper tracking-tight">Track Your Farm Order</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Enter your order reference number to check real-time fulfillment status.</p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-paperDark/5 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-xl mx-auto">
        <form onSubmit={handleTrack} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Order Number</label>
            <input
              type="text"
              required
              placeholder="e.g. FARMS-100234"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full bg-paper dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number (Optional verification)</label>
            <input
              type="text"
              placeholder="+92 300 1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-paper dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-shimmer w-full text-slate-950 font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Searching...' : 'Track Order Status'}</span>
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs sm:text-sm text-center">
          {error}
        </div>
      )}

      {order && (
        <div className="p-5 sm:p-8 rounded-2xl bg-paperDark/5 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 sm:pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-turmeric-500">Order Reference</span>
              <h2 className="font-mono text-xl sm:text-2xl font-bold text-charcoal dark:text-paper">{order.orderNumber}</h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-500 block">Payment Method</span>
              <span className="text-xs sm:text-sm font-bold text-charcoal dark:text-paper">{order.paymentMethod} ({order.paymentStatus})</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="overflow-x-auto py-4">
            <div className="relative flex items-center justify-between min-w-[320px] max-w-2xl mx-auto py-4 px-2">
              {statuses.map((step, idx) => {
                const currentIdx = getStepIndex(order.orderStatus);
                const isCompleted = idx <= currentIdx;
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                        isCompleted
                          ? 'bg-turmeric-500 border-turmeric-500 text-slate-950 shadow-lg shadow-turmeric-500/30'
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
