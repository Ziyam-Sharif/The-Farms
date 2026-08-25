import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export const SubscribersPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);

  useEffect(() => {
    setSubscribers([
      { _id: 'sub-1', email: 'customer1@gmail.com', subscribedAt: new Date().toISOString() },
      { _id: 'sub-2', email: 'spicelover@yahoo.com', subscribedAt: new Date().toISOString() },
      { _id: 'sub-3', email: 'health.nut@outlook.com', subscribedAt: new Date().toISOString() },
    ]);
  }, []);

  const handleExportCSV = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    window.open(`${API_BASE_URL}/newsletter/admin/export`, '_blank');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Newsletter Subscribers</h1>
          <p className="text-xs sm:text-sm text-slate-400">Export subscriber email lists for marketing campaigns.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shrink-0 whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="whitespace-nowrap">Export CSV</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[480px]">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] sm:text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Email Address</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Subscribed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {subscribers.map((sub) => (
                <tr key={sub._id} className="hover:bg-slate-800/40">
                  <td className="py-3 sm:py-3.5 px-3 sm:px-4 font-mono font-semibold text-slate-100">{sub.email}</td>
                  <td className="py-3 sm:py-3.5 px-3 sm:px-4 text-slate-400 text-xs">{new Date(sub.subscribedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
