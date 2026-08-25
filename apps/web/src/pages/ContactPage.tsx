import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-12 lg:py-16 space-y-8 sm:space-y-12 pb-24 relative overflow-hidden">
      
      {/* Moving Ambient Glow Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-turmeric-500/15 rounded-full blur-3xl pointer-events-none animate-float-continuous" />
      <div className="absolute top-1/2 right-10 w-[28rem] h-[28rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      {/* Header Banner */}
      <div className="max-w-2xl space-y-2 sm:space-y-3 relative z-10">
        <span className="text-[10px] xs:text-xs font-bold uppercase tracking-widest text-turmeric-500">ارتباط • Get in touch</span>
        <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-bold text-charcoal dark:text-paper">Contact The Farm's</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          Have a question about our cold-milled spices, raw Sidr honey, or bulk orders? Reach out directly via WhatsApp or send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start relative z-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
          <a
            href="https://wa.me/923152314665"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer p-4 sm:p-6 rounded-2xl glass-panel border border-turmeric-500/30 flex items-center gap-3.5 sm:gap-5 shadow-turmeric-md hover:border-turmeric-500 hover:shadow-turmeric-xl hover:-translate-y-1 transition-all block"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">WhatsApp Direct</p>
              <p className="font-serif font-bold text-charcoal dark:text-paper text-sm sm:text-base">0315-2314665</p>
              <span className="text-[10px] text-emerald-500 font-bold">Click to chat instantly →</span>
            </div>
          </a>

          <div className="cursor-pointer p-4 sm:p-6 rounded-2xl glass-panel border border-turmeric-500/30 flex items-center gap-3.5 sm:gap-5 shadow-turmeric-md hover:border-turmeric-500 hover:shadow-turmeric-xl hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-turmeric-500/15 border border-turmeric-500/30 flex items-center justify-center text-turmeric-500 shrink-0">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Phone Support</p>
              <p className="font-serif font-bold text-charcoal dark:text-paper text-sm sm:text-base">0315-2314665</p>
              <span className="text-[10px] text-slate-400">Available 9am - 8pm PKT</span>
            </div>
          </div>

          <div className="cursor-pointer p-4 sm:p-6 rounded-2xl glass-panel border border-turmeric-500/30 flex items-center gap-3.5 sm:gap-5 shadow-turmeric-md hover:border-turmeric-500 hover:shadow-turmeric-xl hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-turmeric-500/15 border border-turmeric-500/30 flex items-center justify-center text-turmeric-500 shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Email Inquiry</p>
              <p className="font-serif font-bold text-charcoal dark:text-paper text-sm sm:text-base break-all">thefarmsfoods@gmail.com</p>
              <span className="text-[10px] text-slate-400">Response within 24 hours</span>
            </div>
          </div>

          <div className="cursor-pointer p-4 sm:p-6 rounded-2xl glass-panel border border-turmeric-500/30 flex items-center gap-3.5 sm:gap-5 shadow-turmeric-md hover:border-turmeric-500 hover:shadow-turmeric-xl hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-turmeric-500/15 border border-turmeric-500/30 flex items-center justify-center text-turmeric-500 shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Headquarters & Processing Estate</p>
              <p className="font-serif font-bold text-charcoal dark:text-paper text-xs sm:text-sm">Changa Manga, Chunian, Kasur, Punjab</p>
              <span className="text-[10px] text-slate-400">Jodiya Bazar Distribution Hub, Karachi</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass-panel border border-turmeric-500/30 p-5 sm:p-8 lg:p-10 shadow-turmeric-xl">
            {submitted ? (
              <div className="text-center py-8 sm:py-10 space-y-3 sm:space-y-4">
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-500 mx-auto" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal dark:text-paper">Message Sent Successfully</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Thank you, {formData.name}. We have received your inquiry and our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal dark:text-paper">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal dark:text-paper">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal dark:text-paper">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="0315-XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal dark:text-paper">Inquiry Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Retail Order / Export / Quality Query"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal dark:text-paper">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you with our products or order delivery?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-paper dark:bg-slate-900 border border-turmeric-500/25 rounded-xl px-4 py-2.5 text-xs text-charcoal dark:text-paper focus:outline-none focus:border-turmeric-500"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-shimmer w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-turmeric-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to The Farm's</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
