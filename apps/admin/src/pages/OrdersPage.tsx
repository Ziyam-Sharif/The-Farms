import React, { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';
import { ShoppingBag, Eye, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { IOrder } from '@farms/shared-types';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const loadOrders = () => {
    setLoading(true);
    const query = statusFilter ? `?status=${statusFilter}` : '';
    fetchApi(`/orders/admin/all${query}`)
      .then((res) => setOrders(res.data?.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetchApi(`/orders/admin/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus, note: `Status updated via Admin Panel` }),
      });
      loadOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: newStatus as any });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update order status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'confirmed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'shipped':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'cancelled':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Order Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">Track customer orders, shipping addresses, and status progression.</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="placed">Placed</option>
          <option value="confirmed">Confirmed</option>
          <option value="packed">Packed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[620px]">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] sm:text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Order #</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Customer</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Payment</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Total</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Status</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">No orders recorded yet.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4">
                      <p className="font-semibold text-slate-100">{order.shippingAddress?.name}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">{order.shippingAddress?.city}, {order.shippingAddress?.province}</p>
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-300">
                        {order.paymentMethod} ({order.paymentStatus})
                      </span>
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 font-bold text-slate-100 whitespace-nowrap">
                      PKR {order.total}
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                      <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border ${getStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 sm:gap-3">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-lg text-[11px] sm:text-xs text-slate-200 px-2 py-1 cursor-pointer"
                        >
                          <option value="placed">Placed</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-100">Order {selectedOrder.orderNumber}</h2>
                <p className="text-[11px] sm:text-xs text-slate-400">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-200 text-sm font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800">
                <h3 className="font-semibold text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">Shipping Destination</h3>
                <p className="font-bold text-slate-200">{selectedOrder.shippingAddress?.name}</p>
                <p className="text-slate-400">{selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city}</p>
                <p className="text-slate-400">{selectedOrder.shippingAddress?.province} | {selectedOrder.shippingAddress?.phone}</p>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800">
                <h3 className="font-semibold text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mb-2 sm:mb-3">Line Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt={item.title} className="w-8 h-8 rounded bg-slate-800 object-cover" />
                        <span>{item.title} x{item.qty}</span>
                      </div>
                      <span className="font-bold text-slate-200">PKR {item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 flex justify-between font-bold text-xs sm:text-sm text-amber-400">
                  <span>Grand Total</span>
                  <span>PKR {selectedOrder.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
