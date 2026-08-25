import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApi } from '../lib/api';
import { ProductViewer } from '../three/ProductViewer';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, Star, ShieldCheck, Truck, Plus, Minus, Check } from 'lucide-react';
import { IProduct } from '@farms/shared-types';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc');
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchApi(`/products/${slug}`)
      .then((res) => setProduct(res.data?.product || null))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 py-20 text-center text-slate-500">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-charcoal dark:text-paper">Product Not Found</h2>
        <p className="text-sm text-slate-500">The product you requested does not exist or has been retired.</p>
        <Link to="/shop" className="inline-block px-6 py-3 rounded-xl bg-turmeric-500 text-slate-950 font-bold text-sm">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 space-y-8 sm:space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* 3D Model Viewer / Image Fallback */}
        <div className="w-full">
          <ProductViewer
            modelUrl={product.model3d?.url}
            fallbackImageUrl={product.images[0]?.url || 'https://via.placeholder.com/600'}
            title={product.title}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-turmeric-500">{product.category} • SKU: {product.sku}</span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal dark:text-paper mt-1">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-charcoal dark:text-paper">{product.ratingAvg || 5.0}</span>
              <span className="text-xs text-slate-500">({product.ratingCount || 18} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-turmeric-500">PKR {product.price}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-base text-slate-400 line-through">PKR {product.compareAtPrice}</span>
            )}
            <span className="text-xs text-slate-500 font-medium">/ {product.weight}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Stock Badge */}
          <div>
            {product.stock > 0 ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock ({product.stock} units available)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold border border-rose-500/20">
                <span>Sold Out</span>
              </div>
            )}
          </div>

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between sm:justify-start border border-slate-300 dark:border-slate-800 rounded-xl p-1 w-full sm:w-auto">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-2 text-slate-500 hover:text-charcoal dark:hover:text-paper cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-bold text-charcoal dark:text-paper">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-2 text-slate-500 hover:text-charcoal dark:hover:text-paper cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => addItem(product, qty)}
              disabled={product.stock <= 0}
              className="btn-shimmer w-full sm:flex-1 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-turmeric-500/20 disabled:opacity-50 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-turmeric-500 shrink-0" />
              <span>100% Lab-Tested Curcumin &amp; Enzyme Purity</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-turmeric-500 shrink-0" />
              <span>Free Delivery on Orders Over PKR 2,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Description & Reviews */}
      <div className="pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('desc')}
            className={`py-3 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'desc'
                ? 'border-turmeric-500 text-turmeric-500'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'reviews'
                ? 'border-turmeric-500 text-turmeric-500'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            Customer Testimonials
          </button>
        </div>

        <div className="py-5 sm:py-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {activeTab === 'desc' ? (
            <p>{product.description}</p>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-paperDark/5 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-charcoal dark:text-paper text-xs sm:text-sm">Unmatched aroma and taste</span>
                </div>
                <p className="text-[10px] text-slate-500">By Customer • Verified Buyer</p>
                <p className="text-xs mt-2 text-slate-600 dark:text-slate-300">
                  You can immediately tell the difference between this cold-ground spice and commercial grocery store brands.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
