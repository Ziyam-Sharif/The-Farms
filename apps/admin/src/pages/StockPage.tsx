import React, { useState } from 'react';
import { Layers, AlertTriangle, CheckCircle2, PackageCheck, Search, PlusCircle } from 'lucide-react';

interface StockItem {
  id: string;
  sku: string;
  title: string;
  category: string;
  stock: number;
  reorderLevel: number;
  unit: string;
  lastRestocked: string;
}

const INITIAL_STOCK: StockItem[] = [
  {
    id: 'p1',
    sku: 'SPICE-TUR-200G',
    title: 'Cold-Ground Organic Turmeric (Haldi)',
    category: 'Spices',
    stock: 150,
    reorderLevel: 20,
    unit: '200g Glass Jars',
    lastRestocked: '2026-08-15',
  },
  {
    id: 'p2',
    sku: 'SPICE-RED-200G',
    title: 'Cold-Ground Red Chilli Powder (Lal Mirch)',
    category: 'Spices',
    stock: 8,
    reorderLevel: 15,
    unit: '200g Glass Jars',
    lastRestocked: '2026-08-01',
  },
  {
    id: 'p3',
    sku: 'SPICE-COR-200G',
    title: 'Cold-Ground Coriander Powder (Dhania)',
    category: 'Spices',
    stock: 0,
    reorderLevel: 15,
    unit: '200g Glass Jars',
    lastRestocked: '2026-07-20',
  },
  {
    id: 'p5',
    sku: 'HONEY-SIDR-500G',
    title: 'Pure Raw Chhoti Beri Sidr Organic Honey',
    category: 'Honey',
    stock: 45,
    reorderLevel: 10,
    unit: '500g Glass Jars',
    lastRestocked: '2026-08-10',
  },
  {
    id: 'p7',
    sku: 'WELL-SALAJIT-30G',
    title: 'Himalayan Purified Gold Shilajit',
    category: 'Wellness',
    stock: 25,
    reorderLevel: 5,
    unit: '30g Resin Pots',
    lastRestocked: '2026-08-05',
  },
];

export const StockPage: React.FC = () => {
  const [inventory, setInventory] = useState<StockItem[]>(INITIAL_STOCK);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [adjustQty, setAdjustQty] = useState<number>(50);
  const [adjustSuccess, setAdjustSuccess] = useState('');

  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const newStockVal = Math.max(0, selectedItem.stock + adjustQty);
    setInventory(
      inventory.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              stock: newStockVal,
              lastRestocked: new Date().toISOString().split('T')[0],
            }
          : item
      )
    );

    setAdjustSuccess(
      `Restocked "${selectedItem.title}" by ${adjustQty} units! New Stock: ${newStockVal}`
    );
    setSelectedItem(null);
    setTimeout(() => setAdjustSuccess(''), 4000);
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const outOfStockCount = inventory.filter((i) => i.stock === 0).length;
  const lowStockCount = inventory.filter((i) => i.stock > 0 && i.stock <= i.reorderLevel).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" /> Warehouse &amp; Farm Storage
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight">Stock Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor real-time product quantities, automate out-of-stock badges, and process restock batches.
          </p>
        </div>
      </div>

      {adjustSuccess && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{adjustSuccess}</span>
        </div>
      )}

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex items-center gap-3.5 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <PackageCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-slate-100">{inventory.length} SKUs</p>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Inventory Catalog</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex items-center gap-3.5 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-amber-400">{lowStockCount} Products</p>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold">Low Stock (&lt; 15 units)</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex items-center gap-3.5 sm:gap-4 sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-rose-400">{outOfStockCount} Products</p>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold">Sold Out (0 units)</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter stock by SKU or product title..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Inventory Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[680px]">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 sm:px-6 py-3.5">SKU / Product</th>
                <th className="px-4 sm:px-6 py-3.5">Category</th>
                <th className="px-4 sm:px-6 py-3.5">Quantity</th>
                <th className="px-4 sm:px-6 py-3.5">Calculated Status</th>
                <th className="px-4 sm:px-6 py-3.5">Reorder Level</th>
                <th className="px-4 sm:px-6 py-3.5">Last Restocked</th>
                <th className="px-4 sm:px-6 py-3.5 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInventory.map((item) => {
                const isOut = item.stock <= 0;
                const isLow = !isOut && item.stock <= item.reorderLevel;

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 sm:px-6 py-3.5">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                          {item.sku}
                        </span>
                        <p className="font-semibold text-slate-100">{item.title}</p>
                        <span className="text-[10px] sm:text-xs text-slate-500">{item.unit}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-slate-300 font-medium whitespace-nowrap">{item.category}</td>
                    <td className="px-4 sm:px-6 py-3.5 font-mono font-bold text-slate-100 text-sm sm:text-base whitespace-nowrap">
                      {item.stock} <span className="text-xs font-normal text-slate-500">units</span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                      {isOut ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-sm">
                          <AlertTriangle className="w-3.5 h-3.5" /> Sold Out
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          <AlertTriangle className="w-3.5 h-3.5" /> Low ({item.stock} left)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({item.stock})
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-slate-400 font-mono whitespace-nowrap">{item.reorderLevel} units</td>
                    <td className="px-4 sm:px-6 py-3.5 text-slate-400 text-xs whitespace-nowrap">{item.lastRestocked}</td>
                    <td className="px-4 sm:px-6 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setAdjustQty(50);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Restock</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-4 sm:p-6 shadow-2xl space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-100">Restock Product</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Adding inventory to <strong className="text-amber-400">{selectedItem.title}</strong> (Current Stock: {selectedItem.stock})
            </p>
            <form onSubmit={handleAdjustStock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Add Units Quantity</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs sm:text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  Confirm Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
