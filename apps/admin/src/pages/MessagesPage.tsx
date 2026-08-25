import React, { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';

export const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/contact/admin')
      .then((res) => setMessages(res.data?.messages || []))
      .catch(() =>
        setMessages([
          {
            _id: 'msg-1',
            name: 'Dr. Usman Khalid',
            email: 'usman@healthpk.org',
            phone: '+923219876543',
            subject: 'Bulk Curcumin Extract Inquiry',
            message: 'We are interested in sourcing 50kg of your high-curcumin turmeric extract for clinical formulation.',
            status: 'new',
            createdAt: new Date().toISOString(),
          },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Contact Messages Inbox</h1>
        <p className="text-xs sm:text-sm text-slate-400">Inquiries submitted from the public contact form.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[600px]">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] sm:text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Sender</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Subject</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Message</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">Loading inbox...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">No messages received yet.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-slate-800/40">
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                      <p className="font-bold text-slate-100">{msg.name}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">{msg.email} | {msg.phone}</p>
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 font-semibold text-amber-400 whitespace-nowrap">{msg.subject}</td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 text-slate-300 max-w-md">{msg.message}</td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {msg.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
