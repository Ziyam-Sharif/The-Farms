import React from 'react';

export const PoliciesPage: React.FC = () => {
  return (
    <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-12 space-y-6 sm:space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-paper">Shipping &amp; Return Policies</h1>
        <p className="text-xs text-slate-400 mt-1">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 bg-paperDark/5 dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
        <section className="space-y-2">
          <h2 className="font-bold text-base sm:text-lg text-charcoal dark:text-paper">1. Nationwide Delivery Rates</h2>
          <p>We deliver across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and all major cities in Pakistan.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Standard Delivery:</strong> PKR 200 flat rate.</li>
            <li><strong>Free Delivery:</strong> All orders over PKR 2,000 qualify for free nationwide shipping.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base sm:text-lg text-charcoal dark:text-paper">2. Quality Guarantee &amp; Returns</h2>
          <p>Because our spices and raw Sidr honey are pure food items, we guarantee 100% freshness. If any jar arrives broken or compromised during transit, contact us within 48 hours for an instant replacement.</p>
        </section>
      </div>
    </div>
  );
};
