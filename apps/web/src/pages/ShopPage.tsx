import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Check, Filter } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface ShopItem {
  id: string;
  slug: string;
  title: string;
  urduTitle: string;
  urduShort: string;
  category: 'Spices' | 'Honey' | 'Wellness';
  price: number;
  weight: string;
  shortDesc: string;
  mainImg: string;
  altImg?: string;
}

const CATALOG_ITEMS: ShopItem[] = [
  {
    id: 'p1',
    slug: 'turmeric-powder',
    title: 'Turmeric Powder',
    urduTitle: 'خالص ہلدی پاؤڈر',
    urduShort: 'ہلدی',
    category: 'Spices',
    price: 650,
    weight: '200g',
    shortDesc: 'Our signature Haldi — organic roots, sun-dried and slowly ground to protect curcumin and warm aroma.',
    mainImg: '/farms-images/turmeric-main.jpg',
    altImg: '/farms-images/turmeric-alt.jpg',
  },
  {
    id: 'p3',
    slug: 'coriander-powder',
    title: 'Coriander Powder',
    urduTitle: 'خالص دھنیا پاؤڈر',
    urduShort: 'دھنیا',
    category: 'Spices',
    price: 550,
    weight: '200g',
    shortDesc: 'Freshly ground Dhania with a rich aroma and cooling citrusy lift for every curry.',
    mainImg: '/farms-images/coriander-main.jpg',
    altImg: '/farms-images/coriander-alt.jpg',
  },
  {
    id: 'p2',
    slug: 'red-chilli-powder',
    title: 'Red Chilli Powder',
    urduTitle: 'لال مرچ',
    urduShort: 'لال مرچ',
    category: 'Spices',
    price: 600,
    weight: '200g',
    shortDesc: 'Sun-ripened chillies slowly ground — a vibrant red powder with clean, sharp heat.',
    mainImg: '/farms-images/chilli-main.jpg',
    altImg: '/farms-images/chilli-alt.jpg',
  },
  {
    id: 'p5',
    slug: 'chhoti-beri-honey',
    title: 'Chhoti Beri Sidr Honey',
    urduTitle: 'سدر شہد',
    urduShort: 'شہد',
    category: 'Honey',
    price: 2450,
    weight: '500g',
    shortDesc: 'Wild-harvested Sidr honey from Changa Manga — thick, buttery and 100% raw.',
    mainImg: '/farms-images/honey-main.jpg',
    altImg: '/farms-images/honey-main.jpg',
  },
  {
    id: 'p7',
    slug: 'himalayan-salajit',
    title: 'Pure Himalayan Salajit',
    urduTitle: 'سلاجیت',
    urduShort: 'سلاجیت',
    category: 'Wellness',
    price: 3200,
    weight: '20g',
    shortDesc: 'A potent, mineral-rich resin sun-dried and purified naturally to protect 84+ minerals.',
    mainImg: '/farms-images/shilajit-main.jpg',
    altImg: '/farms-images/shilajit-main.jpg',
  },
  {
    id: 'p8',
    slug: 'turmeric-curcumin-capsules',
    title: 'Turmeric Curcumin Capsules',
    urduTitle: 'کیپسول',
    urduShort: 'کیپسول',
    category: 'Wellness',
    price: 1850,
    weight: '60 Capsules',
    shortDesc: 'High-potency organic turmeric curcumin, enhanced with piperine for optimal absorption.',
    mainImg: '/farms-images/capsules-main.jpg',
    altImg: '/farms-images/capsules-main.jpg',
  },
];

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('featured');

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const filteredItems = CATALOG_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  const handleAddToCart = (item: ShopItem) => {
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
        stock: 50,
        isFeatured: true,
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
    <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 lg:py-14 space-y-6 sm:space-y-8 pb-24">
      {/* Center-Aligned Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-[10px] xs:text-xs font-bold uppercase tracking-widest text-turmeric-500">مجموعہ • The Collection</span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal dark:text-paper">All Farm Products</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
          Every batch is grown with our farming partners in Changa Manga, cold-ground in small runs and packed without fillers, dyes or anti-caking agents.
        </p>
      </div>

      {/* Center-Aligned Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-y border-turmeric-500/20 py-3 sm:py-3.5">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 xs:gap-2">
          {['All', 'Spices', 'Honey', 'Wellness'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-turmeric-500 text-midnight shadow-turmeric-sm'
                  : 'bg-paper dark:bg-slate-900 border border-turmeric-500/20 text-slate-700 dark:text-slate-300 hover:border-turmeric-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-2 text-xs text-slate-500">
          <Filter className="w-3.5 h-3.5 text-turmeric-500 shrink-0" />
          <span>Sort</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="cursor-pointer bg-paper dark:bg-slate-900 border border-turmeric-500/20 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {/* Sleek Compact 4-Column Product Grid (Center Aligned) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 justify-center">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="product-card group cursor-pointer rounded-2xl glass-panel p-3.5 sm:p-4 space-y-3 flex flex-col justify-between overflow-hidden relative border border-turmeric-500/25 hover:border-turmeric-500/60 shadow-turmeric-md hover:shadow-turmeric-xl hover:-translate-y-2 transition-all duration-400"
          >
            <div className="space-y-3">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-turmeric-500/20">
                <img
                  src={item.mainImg}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                />
                {item.altImg && (
                  <img
                    src={item.altImg}
                    alt={`${item.title} Alt`}
                    className="absolute inset-0 w-full h-full object-cover scale-105 opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
                  />
                )}
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-turmeric-500 text-midnight text-[11px] font-serif font-bold shadow-turmeric-sm z-10">
                  {item.urduShort}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2 px-3 rounded-lg bg-turmeric-500 text-midnight font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-lg hover:bg-turmeric-400 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                    <span className="whitespace-nowrap">Quick add · Rs {item.price}</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-turmeric-500">{item.category}</span>
                <h3 className="font-serif text-base font-bold text-charcoal dark:text-paper mt-0.5 group-hover:text-turmeric-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1 line-clamp-2 font-normal">{item.shortDesc}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-turmeric-500/15 flex items-center justify-between mt-2">
              <div>
                <span className="font-serif text-base sm:text-lg font-bold text-charcoal dark:text-paper">Rs {item.price}</span>
                <span className="text-[10px] text-slate-500 font-medium block">{item.weight}</span>
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="px-3 py-1.5 rounded-lg border border-turmeric-500/40 text-charcoal dark:text-paper hover:bg-turmeric-500 hover:text-midnight font-bold text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
