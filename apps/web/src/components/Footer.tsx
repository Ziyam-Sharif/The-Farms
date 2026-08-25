import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { fetchApi } from '../lib/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetchApi('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#0B110D] text-paper pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-turmeric-500/25 relative overflow-hidden">
      {/* Soft warm ambient glow background accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-turmeric-500/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-10 sm:space-y-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo-mark.png"
                alt="The Farm's Official Logo"
                className="w-10 h-10 object-contain rounded-xl drop-shadow-[0_4px_12px_rgba(234,161,34,0.35)] shrink-0"
              />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">The Farm's</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Family-run Pakistani farm-to-table brand (Est. 2015). Specializing in traditional cold-ground spices, raw Sidr honey, and Himalayan Salajit from Changa Manga.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-turmeric-400 mb-4">Store Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link to="/shop" className="hover:text-turmeric-400 transition-colors">Shop Spices &amp; Honey</Link></li>
              <li><Link to="/track" className="hover:text-turmeric-400 transition-colors">Track Your Order</Link></li>
              <li><Link to="/blog" className="hover:text-turmeric-400 transition-colors">Harvest Stories &amp; Recipes</Link></li>
              <li><Link to="/about" className="hover:text-turmeric-400 transition-colors">Our Story &amp; Changa Manga</Link></li>
              <li><Link to="/policies" className="hover:text-turmeric-400 transition-colors">Shipping &amp; Return Policies</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-turmeric-400 mb-4">Contact Info</h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-turmeric-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Changa Manga Farm Estate, District Kasur, Punjab / Shipping Centers in Karachi, Lahore &amp; Islamabad.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-turmeric-400 shrink-0" />
                <a href="https://wa.me/923152314665" target="_blank" rel="noopener noreferrer" className="hover:text-turmeric-400 transition-colors">
                  +92 315 2314665 (0315-2314665)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-turmeric-400 shrink-0" />
                <a href="mailto:thefarmsfoods@gmail.com" className="hover:text-turmeric-400 transition-colors break-all">
                  thefarmsfoods@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-turmeric-400 mb-4">Harvest Newsletter</h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">Subscribe for fresh harvest announcements, seasonal honey drops, and recipe guides.</p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Thank you for joining our farm list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col xs:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/90 border border-turmeric-500/25 rounded-xl px-3.5 py-2.5 text-xs text-paper focus:outline-none focus:border-turmeric-400 placeholder:text-slate-500 transition-colors"
                />
                <button type="submit" className="px-4 py-2.5 rounded-xl bg-turmeric-500 text-midnight font-bold hover:bg-turmeric-400 transition-colors shrink-0 flex items-center justify-center shadow-turmeric-sm cursor-pointer">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-turmeric-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} The Farm's (farmsfoodpk.com). All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-semibold text-slate-400">
            <span>Accepted Payments: Bank Alfalah Direct | Askari Bank | JazzCash | Easypaisa | Cash on Delivery (COD)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
