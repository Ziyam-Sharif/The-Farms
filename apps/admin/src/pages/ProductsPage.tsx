import React, { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';
import { Plus, Edit2, Trash2, Search, Box, Image as ImageIcon, Check } from 'lucide-react';
import { IProduct } from '@farms/shared-types';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: 'Spices',
    price: 450,
    compareAtPrice: 550,
    sku: '',
    stock: 50,
    weight: '200g',
    tags: 'organic, spices',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    model3dUrl: 'https://res.cloudinary.com/demo/image/upload/v1615485290/spice_jar.glb',
    isFeatured: true,
  });

  const loadProducts = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (search) query.set('search', search);
    if (categoryFilter) query.set('category', categoryFilter);

    fetchApi(`/products?${query.toString()}`)
      .then((res) => setProducts(res.data?.items || []))
      .catch(() => setProducts([]))
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
      price: 450,
      compareAtPrice: 550,
      sku: `SKU-${Date.now().toString().slice(-6)}`,
      stock: 50,
      weight: '200g',
      tags: 'organic, fresh',
      imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
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
      compareAtPrice: product.compareAtPrice || 0,
      sku: product.sku,
      stock: product.stock,
      weight: product.weight,
      tags: product.tags?.join(', ') || '',
      imageUrl: product.images[0]?.url || '',
      model3dUrl: product.model3d?.url || '',
      isFeatured: product.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tags: formData.tags.split(',').map((t) => t.trim()),
      images: [{ url: formData.imageUrl, alt: formData.title }],
      model3d: formData.model3dUrl ? { url: formData.model3dUrl, format: 'glb' } : undefined,
    };

    try {
      if (editingProduct) {
        await fetchApi(`/products/${editingProduct._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await fetchApi('/products', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setIsModalOpen(false);
      loadProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetchApi(`/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Product Catalog</h1>
          <p className="text-xs sm:text-sm text-slate-400">Manage farm spices, Sidr honey, and 3D model assets.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-amber-500/10 cursor-pointer shrink-0 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">Add New Product</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-slate-900 border border-slate-800 p-3 sm:p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search products by title or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="Spices">Spices</option>
          <option value="Honey">Honey</option>
          <option value="Wellness">Wellness</option>
        </select>
      </div>

      {/* Product Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[620px]">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] sm:text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Product</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Category</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Price (PKR)</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Stock</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">3D Model</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">Loading catalog...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">No products found.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <img
                          src={product.images[0]?.url || 'https://via.placeholder.com/80'}
                          alt={product.title}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-100 truncate max-w-[180px] sm:max-w-xs">{product.title}</p>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-mono">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 font-semibold text-slate-100 whitespace-nowrap">
                      PKR {product.price}
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4">
                      {product.stock <= 0 ? (
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm whitespace-nowrap">
                          Out of Stock (0)
                        </span>
                      ) : product.stock < 15 ? (
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
                          Low ({product.stock})
                        </span>
                      ) : (
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                          In Stock ({product.stock})
                        </span>
                      )}
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4">
                      {product.model3d?.url ? (
                        <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
                          <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>GLB</span>
                        </span>
                      ) : (
                        <span className="text-[11px] sm:text-xs text-slate-500 whitespace-nowrap">2D Image</span>
                      )}
                    </td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 sm:p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-1.5 sm:p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mb-4 sm:mb-6">
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100 cursor-pointer"
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
                    placeholder="e.g. 200g or 60 Capsules"
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

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">3D Model .GLB Asset URL (Optional)</label>
                <input
                  type="text"
                  value={formData.model3dUrl}
                  onChange={(e) => setFormData({ ...formData, model3dUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                  placeholder="https://res.cloudinary.com/.../model.glb"
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
                <label htmlFor="isFeatured" className="text-xs sm:text-sm text-slate-300 cursor-pointer">Feature on Homepage Hero/Grid</label>
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
