import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, Check, Filter } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useProductStore, ProductItem } from '../store/productStore';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('featured');

  const products = useProductStore((s) => s.products);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredItems = products.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  const handleAddToCart = (item: ProductItem) => {
    addItem(
      {
        _id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.shortDesc,
        shortDescription: item.shortDesc,
        category: item.category,
        price: item.price,
        weight: item.weight,
        images: [{ url: item.mainImg, alt: item.title }],
        sku: `SKU-${item.id}`,
        stock: item.stock || 50,
        isFeatured: item.isFeatured ?? true,
        isActive: true,
        ratingAvg: 5.0,
        ratingCount: 24,
        tags: ['pure', item.category.toLowerCase()],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      1
    );
    openCart();
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-10 sm:space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-turmeric-400 bg-turmeric-500/10 border border-turmeric-500/25">
            100% Raw &amp; Cold-Ground
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-paper">
            Farm Pantry &amp; Apothecary
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Slow-milled single-origin spices, wild berry Sidr honey, and high-potency Himalayan resins from Changa Manga.
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-turmeric-500/20 shadow-turmeric-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full sm:w-auto">
            {['All', 'Spices', 'Honey', 'Wellness'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-turmeric-500 text-slate-950 font-bold shadow-lg shadow-turmeric-500/20'
                    : 'text-slate-300 hover:text-turmeric-400 hover:bg-turmeric-500/05'
                }`}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <Filter className="w-4 h-4 text-turmeric-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-charcoal/80 border border-turmeric-500/25 rounded-xl px-3 py-2 text-xs sm:text-sm text-paper focus:outline-none focus:border-turmeric-500 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="product-card group flex flex-col justify-between rounded-3xl overflow-hidden glass-panel border border-turmeric-500/20 shadow-turmeric-md hover:border-turmeric-500/40 hover:shadow-turmeric-xl transition-all duration-400"
            >
              {/* Product Image Box */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-charcoal/40 to-black/60 p-4 flex items-center justify-center">
                <img
                  src={item.mainImg}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-600 drop-shadow-2xl"
                />
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-turmeric-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                  {item.category}
                </span>
                <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-turmeric-500/30 text-turmeric-300 text-[10px] font-semibold">
                  {item.weight}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-paper group-hover:text-turmeric-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-turmeric-500/15 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Price</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-turmeric-400">
                      Rs. {item.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn-shimmer px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-turmeric-500/20 active:scale-95 transition-all shrink-0 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wholesale Callout Banner */}
        <div className="rounded-3xl p-8 sm:p-12 glass-panel border border-turmeric-500/30 bg-gradient-to-r from-forest-950/80 via-charcoal/90 to-amber-950/40 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-turmeric-400 font-bold">B2B &amp; Bulk Orders</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-paper">
              Need Fresh Spices &amp; Honey for Your Restaurant or Store?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We supply top culinary kitchens and organic grocers with customized bulk packaging and lab-certified purity.
            </p>
          </div>
          <a
            href="/wholesale"
            className="btn-shimmer px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shrink-0"
          >
            <span>Explore Wholesale</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
