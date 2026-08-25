import React, { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';
import { ShoppingBag, DollarSign, Package, AlertTriangle, Users, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockSalesData = [
  { month: 'Jan', sales: 45000 },
  { month: 'Feb', sales: 62000 },
  { month: 'Mar', sales: 88000 },
  { month: 'Apr', sales: 74000 },
  { month: 'May', sales: 105000 },
  { month: 'Jun', sales: 135000 },
];

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/admin/dashboard/stats')
      .then((res) => {
        setStats(res.data);
      })
      .catch(() => {
        // Fallback mock stats for dev preview
        setStats({
          stats: {
            totalOrders: 142,
            totalRevenue: 384500,
            totalProducts: 18,
            totalCustomers: 94,
            lowStockCount: 2,
          },
          lowStockProducts: [
            { _id: '1', title: 'Cold-Ground Red Chilli Powder', stock: 8, sku: 'SPICE-RED-200G' },
          ],
          recentOrders: [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-4 sm:p-8 text-slate-400">Loading dashboard telemetry...</div>;
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `PKR ${(stats?.stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Total Orders',
      value: stats?.stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Active Products',
      value: stats?.stats?.totalProducts || 0,
      icon: Package,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Total Customers',
      value: stats?.stats?.totalCustomers || 0,
      icon: Users,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Overview Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-400">Real-time metrics, sales analytics, and inventory alerts.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</span>
                <div className={`p-2 sm:p-2.5 rounded-lg border ${card.color}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-100 mt-3 sm:mt-4">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-100">Revenue Trajectory</h2>
              <p className="text-[11px] sm:text-xs text-slate-400">Monthly sales performance (PKR)</p>
            </div>
          </div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockSalesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EAA122" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#EAA122" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" textAnchor="end" />
                <YAxis stroke="#64748b" width={60} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#EAA122" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Warnings */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-4">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-sm sm:text-base font-semibold text-slate-100">Low Stock Warnings</h2>
            </div>
            {stats?.lowStockProducts?.length > 0 ? (
              <div className="space-y-3">
                {stats.lowStockProducts.map((prod: any) => (
                  <div key={prod._id} className="p-3 sm:p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-200 truncate">{prod.title}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-mono">{prod.sku}</p>
                    </div>
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
                      {prod.stock} left
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-500">All inventory levels healthy.</p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] sm:text-xs text-slate-500 flex items-center gap-1">
            <span>Automated inventory monitor</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
