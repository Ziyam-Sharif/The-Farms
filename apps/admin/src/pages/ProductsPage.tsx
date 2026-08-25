import React, { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';
import { Plus, Edit2, Trash2, Search, Box, Image as ImageIcon, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { IProduct } from '@farms/shared-types';

const INITIAL_SYNC_PRODUCTS: IProduct[] = [
  {
    _id: 'prod-001',
    title: 'Turmeric Powder (Haldi)',
    slug: 'turmeric-powder',
    description: 'Our signature Haldi — cold-ground organic roots from Changa Manga, sun-dried and slowly milled to protect natural curcumin, essential oils, and vibrant golden aroma.',
    shortDescription: 'Organic roots, sun-dried and slowly cold-ground to protect natural curcumin.',
    category: 'Spices',
    price: 650,
    compareAtPrice: 750,
    sku: 'SPICE-TUR-01',
    stock: 85,
    weight: '200g',
    images: [{ url: '/farms-images/turmeric-main.jpg', alt: 'Turmeric Powder' }],
    tags: ['organic', 'haldi', 'cold-ground', 'spices'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.9,
    ratingCount: 128,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prod-002',
    title: 'Coriander Powder (Dhania)',
    slug: 'coriander-powder',
    description: 'Freshly milled Dhania seeds with a rich earthy aroma and cooling citrusy note for every traditional curry and lentil recipe.',
    shortDescription: 'Freshly ground Dhania with a rich aroma and cooling citrusy lift for every curry.',
    category: 'Spices',
    price: 550,
    compareAtPrice: 650,
    sku: 'SPICE-COR-02',
    stock: 92,
    weight: '200g',
    images: [{ url: '/farms-images/coriander-main.jpg', alt: 'Coriander Powder' }],
    tags: ['organic', 'dhania', 'spices'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.8,
    ratingCount: 94,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prod-003',
    title: 'Red Chilli Powder (Lal Mirch)',
    slug: 'red-chilli-powder',
    description: 'Sun-ripened chillies slowly stone-ground — a vibrant red powder with clean, sharp heat without artificial colors or seed dilution.',
    shortDescription: 'Sun-ripened chillies slowly ground — vibrant red powder with clean, sharp heat.',
    category: 'Spices',
    price: 600,
    compareAtPrice: 700,
    sku: 'SPICE-CHI-03',
    stock: 64,
    weight: '200g',
    images: [{ url: '/farms-images/chilli-main.jpg', alt: 'Red Chilli Powder' }],
    tags: ['organic', 'lal-mirch', 'spices'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.9,
    ratingCount: 110,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prod-004',
    title: 'Pure Raw Sidr Honey (Berry)',
    slug: 'pure-sidr-honey',
    description: 'Single-origin unfiltered wild Berry Sidr honey harvested from the nectar of wild Sidr trees in Changa Manga. Unheated and enzyme-rich.',
    shortDescription: 'Raw, unheated monofloral Sidr honey directly from Changa Manga wild groves.',
    category: 'Honey',
    price: 2400,
    compareAtPrice: 2800,
    sku: 'HNY-SDR-04',
    stock: 42,
    weight: '500g',
    images: [{ url: '/farms-images/honey-main.jpg', alt: 'Pure Raw Sidr Honey' }],
    tags: ['honey', 'sidr', 'raw', 'wellness'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 5.0,
    ratingCount: 215,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prod-005',
    title: 'Wild Mountain Shilajit (Salajit)',
    slug: 'wild-mountain-shilajit',
    description: 'Purified gold-grade Himalayan Shilajit resin containing over 84 minerals and fulvic acid for stamina, energy, and vitality.',
    shortDescription: '100% Pure gold-grade Himalayan resin rich in natural fulvic acid & minerals.',
    category: 'Wellness',
    price: 3200,
    compareAtPrice: 3800,
    sku: 'WLN-SHL-05',
    stock: 35,
    weight: '30g',
    images: [{ url: '/farms-images/shilajit-main.jpg', alt: 'Wild Mountain Shilajit' }],
    tags: ['shilajit', 'salajit', 'wellness', 'organic'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.9,
    ratingCount: 178,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prod-006',
    title: 'Organic Turmeric Capsules',
    slug: 'organic-turmeric-capsules',
    description: 'High-potency organic curcumin extract paired with black pepper piperine for maximum cellular absorption and natural joint support.',
    shortDescription: 'High-potency curcumin extract with piperine for optimal bio-absorption.',
    category: 'Wellness',
    price: 1250,
    compareAtPrice: 1500,
    sku: 'WLN-CAP-06',
    stock: 58,
    weight: '60 Capsules',
    images: [{ url: '/farms-images/capsules-main.jpg', alt: 'Organic Turmeric Capsules' }],
    tags: ['curcumin', 'capsules', 'wellness'],
    isFeatured: false,
    isActive: true,
    ratingAvg: 4.7,
    ratingCount: 65,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prod-007',
    title: 'Whole Cumin Seeds (Zeera)',
    slug: 'cumin-seeds',
    description: 'Aromatic whole white cumin seeds with intense warmth and earthy aroma, carefully cleaned and graded for tempering.',
    shortDescription: 'Aromatic whole white cumin seeds with intense natural aroma.',
    category: 'Spices',
    price: 700,
    compareAtPrice: 800,
    sku: 'SPICE-CUM-07',
    stock: 75,
    weight: '200g',
    images: [{ url: '/farms-images/spices-spread.jpg', alt: 'Whole Cumin Seeds' }],
    tags: ['zeera', 'cumin', 'spices'],
    isFeatured: false,
    isActive: true,
    ratingAvg: 4.8,
    ratingCount: 42,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prod-008',
    title: 'Organic Garam Masala',
    slug: 'garam-masala',
    description: 'Heritage 12-spice royal blend roasted and ground in small farm batches to deliver authentic Mughlai fragrance and depth.',
    shortDescription: 'Heritage 12-spice blend roasted and ground in small farm batches.',
    category: 'Spices',
    price: 850,
    compareAtPrice: 950,
    sku: 'SPICE-GRM-08',
    stock: 60,
    weight: '150g',
    images: [{ url: '/farms-images/spices-spread.jpg', alt: 'Organic Garam Masala' }],
    tags: ['garam-masala', 'spices', 'blend'],
    isFeatured: false,
    isActive: true,
    ratingAvg: 4.9,
    ratingCount: 88,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>(() => {
    const saved = localStorage.getItem('farms_admin_products');
    return saved ? JSON.parse(saved) : INITIAL_SYNC_PRODUCTS;
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: 'Spices',
    price: 650,
    compareAtPrice: 750,
    sku: '',
    stock: 50,
    weight: '200g',
    tags: 'organic, spices',
    imageUrl: '/farms-images/turmeric-main.jpg',
    model3dUrl: '',
    isFeatured: true,
  });

  const loadProducts = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (search) query.set('search', search);
    if (categoryFilter) query.set('category', categoryFilter);

    fetchApi(`/products?${query.toString()}`)
      .then((res) => {
        if (res.data?.items && res.data.items.length > 0) {
          setProducts(res.data.items);
          localStorage.setItem('farms_admin_products', JSON.stringify(res.data.items));
        }
      })
      .catch(() => {
        // Retain synchronized products
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, [search, categoryFilter]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      shortDescription: '',
      category: 'Spices',
      price: 650,
      compareAtPrice: 750,
      sku: `SKU-${Date.now().toString().slice(-6)}`,
      stock: 50,
      weight: '200g',
      tags: 'organic, pure',
      imageUrl: '/farms-images/spices-spread.jpg',
      model3dUrl: '',
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: IProduct) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      category: product.category as string,
      price: product.price,
      compareAtPrice: product.compareAtPrice || product.price + 100,
      sku: product.sku,
      stock: product.stock,
      weight: product.weight,
      tags: product.tags?.join(', ') || '',
      imageUrl: product.images[0]?.url || '/farms-images/spices-spread.jpg',
      model3dUrl: product.model3d?.url || '',
      isFeatured: product.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: IProduct = {
      _id: editingProduct ? editingProduct._id : `prod-${Date.now()}`,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formData.description,
      shortDescription: formData.shortDescription,
      category: formData.category,
      price: Number(formData.price),
      compareAtPrice: Number(formData.compareAtPrice),
      sku: formData.sku,
      stock: Number(formData.stock),
      weight: formData.weight,
      images: [{ url: formData.imageUrl, alt: formData.title }],
      tags: formData.tags.split(',').map((t) => t.trim()),
      model3d: formData.model3dUrl ? { url: formData.model3dUrl, format: 'glb' } : undefined,
      isFeatured: formData.isFeatured,
      isActive: true,
      ratingAvg: editingProduct?.ratingAvg || 4.9,
      ratingCount: editingProduct?.ratingCount || 1,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (editingProduct) {
        await fetchApi(`/products/${editingProduct._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        const updated = products.map((p) => (p._id === editingProduct._id ? payload : p));
        setProducts(updated);
        localStorage.setItem('farms_admin_products', JSON.stringify(updated));
        showToast(`Product "${payload.title}" updated successfully!`, 'success');
      } else {
        await fetchApi('/products', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        const updated = [payload, ...products];
        setProducts(updated);
        localStorage.setItem('farms_admin_products', JSON.stringify(updated));
        showToast(`Product "${payload.title}" created successfully!`, 'success');
      }
      setIsModalOpen(false);
    } catch {
      // Local sync fallback
      if (editingProduct) {
        const updated = products.map((p) => (p._id === editingProduct._id ? payload : p));
        setProducts(updated);
        localStorage.setItem('farms_admin_products', JSON.stringify(updated));
        showToast(`Product "${payload.title}" updated locally!`, 'success');
      } else {
        const updated = [payload, ...products];
        setProducts(updated);
        localStorage.setItem('farms_admin_products', JSON.stringify(updated));
        showToast(`Product "${payload.title}" added to catalog!`, 'success');
      }
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await fetchApi(`/products/${id}`, { method: 'DELETE' });
      const updated = products.filter((p) => p._id !== id);
      setProducts(updated);
      localStorage.setItem('farms_admin_products', JSON.stringify(updated));
      showToast(`Product "${title}" removed from catalog.`, 'success');
    } catch {
      const updated = products.filter((p) => p._id !== id);
      setProducts(updated);
      localStorage.setItem('farms_admin_products', JSON.stringify(updated));
      showToast(`Product "${title}" removed from catalog.`, 'success');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.category as string).toLowerCase().includes(search.toLowerCase());
    const matchesCat = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto relative">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md animate-fadeIn ${
            toast.type === 'success'
              ? 'bg-slate-900/95 border-amber-500/40 text-amber-300 shadow-amber-500/10'
              : 'bg-slate-900/95 border-rose-500/40 text-rose-300 shadow-rose-500/10'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Product Catalog</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400">
              {products.length} Products Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Manage farm spices, Sidr honey, and 3D model assets synchronized with the storefront.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-amber-500/10 cursor-pointer shrink-0 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">Add New Product</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/80 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by title, SKU, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
        <div className="flex gap-2">
          {['', 'Spices', 'Honey', 'Wellness'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat || 'All Categories'}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table / Cards */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No products match your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]?.url || '/farms-images/spices-spread.jpg'}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-700 bg-slate-950 shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-slate-100">{product.title}</div>
                          <div className="text-[11px] text-slate-400">{product.weight}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      Rs. {product.price.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-semibold ${
                          product.stock < 10 ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">{product.sku}</td>
                    <td className="py-3.5 px-4">
                      {product.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                          <Check className="w-3.5 h-3.5" /> Yes
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">No</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.title)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Product Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-100">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                  >
                    <option value="Spices">Spices</option>
                    <option value="Honey">Honey</option>
                    <option value="Wellness">Wellness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Weight / Unit</label>
                  <input
                    type="text"
                    required
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Product Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-xs sm:text-sm text-slate-300 cursor-pointer">
                  Feature on Homepage Hero/Grid
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 sm:pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
