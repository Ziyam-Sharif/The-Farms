import React, { useState } from 'react';
import { Building, Package, ShieldCheck, Truck, ArrowRight, CheckCircle2, FileText } from 'lucide-react';

export const WholesalePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    city: '',
    productInterest: 'Turmeric Powder (Haldi)',
    monthlyQuantity: '50 - 100 kg',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-12 lg:py-16 space-y-12 sm:space-y-16 pb-24 relative overflow-hidden">
      
      {/* Moving Ambient Glow Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-turmeric-500/15 rounded-full blur-3xl pointer-events-none animate-float-continuous" />
      <div className="absolute top-1/2 right-10 w-[28rem] h-[28rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      {/* Center-Aligned Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-panel border border-turmeric-500/35 text-[11px] sm:text-xs font-bold text-turmeric-500 shadow-turmeric-sm animate-pulse-gold-glow">
          <Building className="w-4 h-4 text-turmeric-500 shrink-0" />
          <span>B2B &amp; Wholesale Direct Supply</span>
        </div>
        <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal dark:text-paper leading-tight">
          Bulk heirloom spices for restaurants, grocers &amp; exports
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
          Having supplied over 60% of Karachi's turmeric trade for years (Jodiya Bazar), we offer unadulterated cold-milled turmeric, coriander, and chilli powder in 5kg, 25kg, and 50kg bulk sacks.
        </p>
      </div>

      {/* 4 Feature Cards (Center Aligned) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 justify-center relative z-10">
        {[
          { title: 'Guaranteed Purity', desc: 'No starch, husk or synthetic dyes. Fully lab-certified for 4.5%+ curcumin.', icon: ShieldCheck },
          { title: 'Cold-Stone Milled', desc: 'Ground under 35°C in small runs to preserve natural aroma and volatile oils.', icon: Package },
          { title: 'Nationwide Logistics', desc: 'Fast bulk dispatch to Karachi, Lahore, Islamabad, and 40+ cities.', icon: Truck },
          { title: 'Wholesale Rates', desc: 'Tiered pricing for retail chains, food manufacturers, and commercial kitchens.', icon: FileText },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="glass-panel-card cursor-pointer p-5 sm:p-6 rounded-2xl glass-panel border border-turmeric-500/30 space-y-3 shadow-turmeric-md hover:border-turmeric-500/70 hover:shadow-turmeric-xl hover:-translate-y-2 transition-all duration-400 text-center flex flex-col items-center"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-turmeric-500/15 border border-turmeric-500/30 flex items-center justify-center text-turmeric-500">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal dark:text-paper">{card.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{card.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Bulk Pricing Table */}
      <div className="space-y-4 sm:space-y-6 relative z-10">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-paper text-center">Published Bulk Rates (5kg Sacks)</h2>
        <div className="rounded-2xl glass-panel border border-turmeric-500/30 overflow-hidden shadow-turmeric-lg">
          <div className="overflow-x-auto min-w-full">
            <table className="w-full text-left border-collapse min-w-[580px]">
              <thead>
                <tr className="border-b border-turmeric-500/20 bg-turmeric-500/10 text-[11px] sm:text-xs uppercase tracking-wider font-bold text-turmeric-600 dark:text-turmeric-400">
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Product</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Moisture &amp; Purity</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Packaging</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Bulk Rate (5kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-turmeric-500/15 text-xs font-medium">
                <tr className="hover:bg-turmeric-500/05 transition-colors">
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-serif text-sm font-bold text-charcoal dark:text-paper">Turmeric Powder (Haldi)</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300">&lt; 8% moisture · 4.6% curcumin</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300">5kg Nitrogen Sealed Bag</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-serif font-bold text-turmeric-500 text-sm">Rs 2,750</td>
                </tr>
                <tr className="hover:bg-turmeric-500/05 transition-colors">
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-serif text-sm font-bold text-charcoal dark:text-paper">Coriander Powder (Dhania)</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300">&lt; 7.5% moisture · High essential oil</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300">5kg Nitrogen Sealed Bag</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-serif font-bold text-turmeric-500 text-sm">Rs 2,750</td>
                </tr>
                <tr className="hover:bg-turmeric-500/05 transition-colors">
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-serif text-sm font-bold text-charcoal dark:text-paper">Red Chilli Powder (Lal Mirch)</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300">Stemless Kunri harvest · Pure heat</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300">5kg Nitrogen Sealed Bag</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-serif font-bold text-turmeric-500 text-sm">Rs 3,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="rounded-3xl glass-panel border border-turmeric-500/35 p-6 sm:p-8 lg:p-12 space-y-6 shadow-turmeric-xl relative z-10">
        <div className="max-w-2xl space-y-2 mx-auto text-center">
          <span className="tag-glow text-xs inline-flex">Direct Procurement</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-paper">Request Bulk Quote or Sample Kit</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Fill in your business details below or message our supply team directly on WhatsApp (0315-2314665).
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-paper">Wholesale Request Received</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Our B2B commercial manager will contact you within 4 business hours with rate sheets and delivery timelines.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal dark:text-paper">Business / Organization Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Gourmet Foods Lahore"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal dark:text-paper">Contact Person Name *</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal dark:text-paper">WhatsApp / Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="0315-XXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal dark:text-paper">Email Address *</label>
              <input
                type="email"
                required
                placeholder="procurement@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal dark:text-paper">Primary Product of Interest</label>
              <select
                value={formData.productInterest}
                onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500 cursor-pointer"
              >
                <option>Turmeric Powder (Haldi)</option>
                <option>Coriander Powder (Dhania)</option>
                <option>Red Chilli Powder (Lal Mirch)</option>
                <option>Raw Sidr Honey (Bulk 10kg+)</option>
                <option>Full Mixed Spice Assortment</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-charcoal dark:text-paper">Estimated Monthly Volume</label>
              <select
                value={formData.monthlyQuantity}
                onChange={(e) => setFormData({ ...formData, monthlyQuantity: e.target.value })}
                className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500 cursor-pointer"
              >
                <option>25 - 50 kg</option>
                <option>50 - 100 kg</option>
                <option>100 - 500 kg</option>
                <option>500 kg+ (Commercial Contract)</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-charcoal dark:text-paper">Delivery City &amp; Special Requirements</label>
              <textarea
                rows={3}
                placeholder="Mention destination city (e.g. Karachi, Lahore, Faisalabad) and sample requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-500">We respond to WhatsApp queries at <strong className="text-turmeric-500">0315-2314665</strong>.</p>
              <button
                type="submit"
                className="btn-shimmer px-7 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-turmeric-md cursor-pointer whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Submit Wholesale Inquiry</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
