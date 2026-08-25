import React, { useState } from 'react';
import { UserCog, Shield, CheckCircle2, XCircle, Search, Mail, UserPlus } from 'lucide-react';

interface AccountUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  status: 'active' | 'suspended';
  lastLogin: string;
  createdDate: string;
}

const INITIAL_ACCOUNTS: AccountUser[] = [
  {
    id: 'usr-1',
    name: "Huzaifa Baig (Master Admin)",
    email: 'admin@farmsfoodpk.com',
    role: 'admin',
    status: 'active',
    lastLogin: 'Just now',
    createdDate: '2025-01-10',
  },
  {
    id: 'usr-2',
    name: 'Muhammad Rana Owais (Ops Admin)',
    email: 'owais@farmsfoodpk.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2 hours ago',
    createdDate: '2025-02-15',
  },
  {
    id: 'usr-3',
    name: 'Farm Content Editor',
    email: 'editor@farmsfoodpk.com',
    role: 'editor',
    status: 'active',
    lastLogin: 'Yesterday at 4:30 PM',
    createdDate: '2025-04-20',
  },
  {
    id: 'usr-4',
    name: 'Syed Shabih ul Hassan (Marketing)',
    email: 'marketing@farmsfoodpk.com',
    role: 'editor',
    status: 'active',
    lastLogin: '3 days ago',
    createdDate: '2025-06-01',
  },
];

export const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountUser[]>(INITIAL_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    role: 'editor' as 'admin' | 'editor',
  });

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccount.name || !newAccount.email) return;

    const created: AccountUser = {
      id: `usr-${Date.now()}`,
      name: newAccount.name,
      email: newAccount.email,
      role: newAccount.role,
      status: 'active',
      lastLogin: 'Never',
      createdDate: new Date().toISOString().split('T')[0],
    };

    setAccounts([created, ...accounts]);
    setNewAccount({ name: '', email: '', role: 'editor' });
    setShowModal(false);
  };

  const toggleStatus = (id: string) => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === id
          ? { ...acc, status: acc.status === 'active' ? 'suspended' : 'active' }
          : acc
      )
    );
  };

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <UserCog className="w-4 h-4" /> Admin Security &amp; Access Control
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight">Account Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage administrative user roles, permissions, and staff credentials for The Farm's portal.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 shrink-0 cursor-pointer whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">Add Admin User</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search user accounts by name or email..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Accounts Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[620px]">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 sm:px-6 py-3.5">User</th>
                <th className="px-4 sm:px-6 py-3.5">Role</th>
                <th className="px-4 sm:px-6 py-3.5">Status</th>
                <th className="px-4 sm:px-6 py-3.5">Last Activity</th>
                <th className="px-4 sm:px-6 py-3.5">Created Date</th>
                <th className="px-4 sm:px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAccounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 sm:px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 text-xs shrink-0">
                        {acc.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-100 truncate">{acc.name}</p>
                        <p className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3 text-slate-500 shrink-0" /> {acc.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                        acc.role === 'admin'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      }`}
                    >
                      <Shield className="w-3 h-3 shrink-0" />
                      {acc.role === 'admin' ? 'Master Admin' : 'Content Editor'}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                        acc.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {acc.status === 'active' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3.5 text-xs text-slate-400 whitespace-nowrap">{acc.lastLogin}</td>
                  <td className="px-4 sm:px-6 py-3.5 text-xs font-mono text-slate-400 whitespace-nowrap">{acc.createdDate}</td>
                  <td className="px-4 sm:px-6 py-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(acc.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-500 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {acc.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-4 sm:p-6 shadow-2xl space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-100">Create Admin Account</h2>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="user@farmsfoodpk.com"
                  value={newAccount.email}
                  onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Role Permissions</label>
                <select
                  value={newAccount.role}
                  onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100 cursor-pointer"
                >
                  <option value="editor">Content Editor (Products, Blog, Reviews)</option>
                  <option value="admin">Master Administrator (Full Access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs sm:text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
