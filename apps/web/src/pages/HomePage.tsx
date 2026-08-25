import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowRight,
  Shield,
  Zap,
  Leaf,
  Droplets,
  Heart,
  Users,
  Star,
  FlaskConical,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroScene } from '../three/HeroScene';
import { useCartStore } from '../store/cartStore';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE = [
  'خالص',
  'Lab-Verified Purity',
  'Cold-Ground',
  'Grown in Changa Manga',
  'Est. 2015',
  'No Mixings or Fillers',
  'Lahore — Karachi — Nationwide',
];

const BESTSELLERS = [
  {
    id: 'p1',
    slug: 'turmeric-powder',
    title: 'Turmeric Powder',
    urduTitle: 'خالص ہلدی پاؤڈر',
    urduShort: 'ہلدی',
    category: 'Spices',
    price: 650,
    weight: '200g',
    desc: 'Our signature Haldi — organic roots, sun-dried and slowly ground to protect curcumin and warm aroma.',
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
    desc: 'Freshly ground Dhania with a rich aroma and cooling citrusy lift for every curry.',
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
    desc: 'Sun-ripened chillies slowly ground — a vibrant red powder with clean, sharp heat.',
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
    desc: 'Wild-harvested Sidr honey from Changa Manga — thick, buttery and 100% raw.',
    mainImg: '/farms-images/honey-main.jpg',
    altImg: '/farms-images/honey-main.jpg',
  },
];

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Riverbed Harvest',
    desc: 'Heirloom crops grown on alluvial Punjab soil without synthetic pesticides or chemical fertilizers.',
  },
  {
    step: '02',
    title: 'Sun Drying',
    desc: 'Sun-dried on raised bamboo racks to reduce moisture below 8% while locking in natural color.',
  },
  {
    step: '03',
    title: 'Granite Stone Milling',
    desc: 'Slow-turned granite mills running below 35°C prevent volatile oil evaporation and preserve curcumin.',
  },
  {
    step: '04',
    title: 'Vacuum Sealed',
    desc: 'Nitrogen-flushed glass jars sealed at farm cold-storage to preserve fresh harvest aroma for 24 months.',
  },
];

const TEAM = [
  {
    name: 'Huzaifa Baig',
    role: 'Chief Executive Officer',
    quote: "For years our turmeric went to Jodiya Bazar and major brands. We started The Farm's so export-grade spice reaches your kitchen uncut.",
    img: '/farms-images/team-huzaifa.jpg',
    objectPos: '50% 28%',
  },
  {
    name: 'Muhammad Rana Owais',
    role: 'Operations Director',
    quote: 'Every cold-milling batch is strictly monitored under 35°C to lock in essential volatile oils and natural aroma.',
    img: '/farms-images/team-owais-face.jpg',
    objectPos: '46% 34%',
  },
  {
    name: 'Saad Sharif',
    role: 'General Manager',
    quote: 'Direct farm delivery across 40+ Pakistani cities with zero starch, husk or artificial synthetic dyes.',
    img: '/farms-images/team-saad-sq.jpg',
    objectPos: '50% 40%',
  },
  {
    name: 'Syed Shabih ul Hassan',
    role: 'Head of Marketing',
    quote: 'Honest food for honest tables. 100% pure Changa Manga harvest straight to your home pantry.',
    img: '/farms-images/team-shabih-sq.jpg',
    objectPos: '50% 35%',
  },
  {
    name: 'Syed Riaz Ahmed',
    role: 'Head of Sales',
    quote: "Over 60% of Karachi's turmeric passes through our hands. Now serving Pakistani households directly.",
    img: '/farms-images/team-riaz.png',
    objectPos: '50% 22%',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sana Iqbal',
    city: 'Karachi',
    title: 'Culinary Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The turmeric actually smells like turmeric. My mother noticed the difference in the first curry — she now refuses the supermarket brand.',
  },
  {
    name: 'Faisal Ahmed',
    city: 'Lahore',
    title: 'Wellness Advocate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: "I've been buying the Sidr honey for a year. Thick, buttery, and clearly raw. It crystallises the way real honey should.",
  },
  {
    name: 'Bilal Rehman',
    city: 'Islamabad',
    title: 'Executive Chef',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'We use their red chilli in our restaurant kitchen. Consistent colour and clean heat batch after batch.',
  },
];

export const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const potencyRef = useRef<HTMLDivElement>(null);
  const featureRowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.hero-el'), {
          opacity: 0,
          y: 25,
          stagger: 0.08,
          duration: 0.8,
          ease: 'expo.out',
        });
      }

      if (potencyRef.current) {
        gsap.fromTo(
          potencyRef.current.querySelectorAll('.bar-fill'),
          { width: '0%' },
          {
            width: (i, target) => target.style.getPropertyValue('--bar-width'),
            duration: 1.4,
            ease: 'power3.out',
            stagger: 0.18,
            scrollTrigger: { trigger: potencyRef.current, start: 'top 75%' },
          }
        );
      }

      if (featureRowRef.current) {
        gsap.fromTo(
          Array.from(featureRowRef.current.children),
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.85,
            ease: 'expo.out',
            scrollTrigger: { trigger: featureRowRef.current, start: 'top 80%' },
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(
          Array.from(statsRef.current.children),
          { opacity: 0, scale: 0.88, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: 'back.out(1.5)',
            scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
          }
        );
      }

      if (journeyRef.current) {
        gsap.fromTo(
          Array.from(journeyRef.current.children),
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: journeyRef.current, start: 'top 80%' },
          }
        );
      }

      if (testimonialsRef.current) {
        gsap.fromTo(
          Array.from(testimonialsRef.current.children),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' },
          }
        );
      }

      if (teamRef.current) {
        gsap.fromTo(
          Array.from(teamRef.current.children),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: { trigger: teamRef.current, start: 'top 82%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleQuickAdd = (product: typeof BESTSELLERS[0]) => {
    addItem(
      {
        _id: product.id,
        title: product.title,
        slug: product.slug,
        description: product.desc,
        shortDescription: product.desc,
        category: product.category,
        price: product.price,
        weight: product.weight,
        images: [{ url: product.mainImg, alt: product.title }],
        sku: `SKU-${product.id}`,
        stock: 50,
        isFeatured: true,
        isActive: true,
        ratingAvg: 5.0,
        ratingCount: 24,
        tags: ['cold-ground', 'organic'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      1
    );
    openCart();
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 2xl:space-y-24 pb-20 sm:pb-24 relative overflow-hidden">

      {/* CONTINUOUS MOVING AMBIENT LIGHT BLOBS & PARTICLES */}
      <div className="absolute top-0 left-10 w-[24rem] sm:w-[30rem] h-[24rem] sm:h-[30rem] bg-turmeric-500/20 rounded-full blur-3xl pointer-events-none animate-float-continuous" />
      <div className="absolute top-[32%] right-10 w-[26rem] sm:w-[32rem] h-[26rem] sm:h-[32rem] bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-float-reverse" />
      <div className="absolute top-[65%] left-10 w-[28rem] sm:w-[35rem] h-[28rem] sm:h-[35rem] bg-chilli-500/15 rounded-full blur-3xl pointer-events-none animate-float-continuous" />

      {/* ════════════════════════════════════════════════════════════
          1. HERO SECTION (Responsive 320px to 4K Displays)
      ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-3 sm:pt-6 pb-8 sm:pb-10 overflow-hidden border-b border-turmeric-500/25">
        
        {/* 3D WebGL Canvas on Hero Right (Interactive 3D Turmeric Model with Clean Soft Background Aura) */}
        <div className="absolute inset-0 z-0 pointer-events-auto hidden lg:block">
          <HeroScene />
        </div>

        {/* Hero Main Alignment Container */}
        <div ref={heroRef} className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10 w-full pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center py-2">
            
            {/* LEFT COLUMN: Responsive Clean Text Box */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left pointer-events-auto">
              
              <div className="hero-el inline-flex items-center gap-1.5 xs:gap-2 px-3.5 xs:px-4 py-1.5 rounded-full glass-panel border border-turmeric-500/40 shadow-turmeric-sm animate-pulse-gold-glow">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-turmeric-500 shrink-0" />
                <span className="text-[10px] xs:text-xs uppercase tracking-widest text-slate-700 dark:text-slate-200 font-bold whitespace-nowrap">
                  100% Pure • Cold-Ground • Est. 2015
                </span>
              </div>

              <h1 className="hero-el font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold tracking-tight text-charcoal dark:text-paper leading-tight sm:leading-tight">
                A dowry of <em className="text-gradient-gold not-italic">golden</em> spice
              </h1>

              <p className="hero-el text-slate-700 dark:text-slate-200 text-sm sm:text-base lg:text-lg 2xl:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Heirloom turmeric, coriander and chilli from our own fields in Changa Manga — cold-ground by hand and sealed for the discerning table.
              </p>

              {/* Action Buttons with Whitespace-Nowrap & Responsive Padding */}
              <div className="hero-el flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to="/shop"
                  className="btn-shimmer group px-5 xs:px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl text-xs xs:text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-2.5 shadow-turmeric-lg font-bold whitespace-nowrap cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="whitespace-nowrap">Explore Farm Pantry</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </Link>

                <Link
                  to="/our-story"
                  className="px-5 xs:px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl glass-panel border border-turmeric-500/40 text-charcoal dark:text-paper hover:bg-turmeric-500/20 font-bold text-xs xs:text-sm sm:text-base transition-all shadow-turmeric-sm hover:shadow-turmeric-md text-center whitespace-nowrap cursor-pointer"
                >
                  Our Heritage Story
                </Link>
              </div>

              {/* Floating Stat Pills */}
              <div className="hero-el grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-3 2xl:gap-4 pt-3 sm:pt-4 max-w-lg mx-auto lg:mx-0">
                <div className="p-2 xs:p-2.5 sm:p-3 rounded-2xl glass-panel border border-turmeric-500/30 text-center sm:text-left shadow-turmeric-sm hover:scale-105 transition-transform">
                  <span className="font-serif text-lg xs:text-xl sm:text-2xl 2xl:text-3xl font-bold text-turmeric-500 block">60%</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] 2xl:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block leading-tight">Karachi Trade</span>
                </div>
                <div className="p-2 xs:p-2.5 sm:p-3 rounded-2xl glass-panel border border-turmeric-500/30 text-center sm:text-left shadow-turmeric-sm hover:scale-105 transition-transform">
                  <span className="font-serif text-lg xs:text-xl sm:text-2xl 2xl:text-3xl font-bold text-turmeric-500 block">100%</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] 2xl:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block leading-tight">Pure Harvest</span>
                </div>
                <div className="p-2 xs:p-2.5 sm:p-3 rounded-2xl glass-panel border border-turmeric-500/30 text-center sm:text-left shadow-turmeric-sm hover:scale-105 transition-transform">
                  <span className="font-serif text-lg xs:text-xl sm:text-2xl 2xl:text-3xl font-bold text-turmeric-500 block">2015</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] 2xl:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block leading-tight">Farm Legacy</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Mobile Fallback Image */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-4 lg:hidden pointer-events-auto">
              <img
                src="/turmeric.png"
                alt="Organic Turmeric Haldi"
                className="relative z-10 w-full max-w-[240px] xs:max-w-xs sm:max-w-sm mx-auto drop-shadow-[0_28px_50px_rgba(234,161,34,0.55)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] animate-float-continuous hover:scale-110 transition-all duration-500 cursor-pointer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="overflow-hidden border-y border-turmeric-500/20 py-2.5 sm:py-3 bg-turmeric-500/10 relative z-20 shadow-turmeric-sm">
        <div className="flex">
          <div className="marquee-track">
            {MARQUEE.map((item, i) => (
              <span key={i} className="flex items-center gap-2 sm:gap-3 text-[10px] xs:text-xs 2xl:text-sm font-bold uppercase tracking-widest text-turmeric-600 dark:text-turmeric-400 whitespace-nowrap">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-turmeric-500 shrink-0 shadow-turmeric-sm animate-pulse-gold-glow" />{item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          2. SLEEK MODERN PRODUCT CATALOG GRID (CENTER ALIGNED)
      ════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center justify-center gap-2 text-turmeric-500 font-bold text-xs uppercase tracking-wider mb-1">
            <span className="font-serif text-sm">خالص</span> • Bestselling Range
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold text-charcoal dark:text-paper">
            Everyday Farm Essentials
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Pure heirloom spices and wild-harvested Sidr honey from our estate in Changa Manga.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 justify-center">
          {BESTSELLERS.map((p) => (
            <div
              key={p.id}
              className="product-card group p-3.5 sm:p-4 space-y-3 flex flex-col justify-between overflow-hidden relative border border-turmeric-500/30"
            >
              <div className="space-y-3">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-turmeric-500/20">
                  <img
                    src={p.mainImg}
                    alt={p.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                  />
                  <img
                    src={p.altImg}
                    alt={`${p.title} Alt`}
                    className="absolute inset-0 w-full h-full object-cover scale-105 opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-turmeric-500 text-midnight text-[11px] font-serif font-bold shadow-turmeric-sm z-10">
                    {p.urduShort}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <button
                      onClick={() => handleQuickAdd(p)}
                      className="w-full py-2 px-3 rounded-lg bg-turmeric-500 text-midnight font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-lg hover:bg-turmeric-400 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">Quick add · Rs {p.price}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-turmeric-500">{p.category}</span>
                  <h3 className="font-serif text-base font-bold text-charcoal dark:text-paper mt-0.5 group-hover:text-turmeric-500 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1 line-clamp-2 font-normal">{p.desc}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-turmeric-500/15 flex items-center justify-between mt-2">
                <div>
                  <span className="font-serif text-base sm:text-lg font-bold text-charcoal dark:text-paper">Rs {p.price}</span>
                  <span className="text-[10px] text-slate-500 font-medium block">{p.weight}</span>
                </div>

                <button
                  onClick={() => handleQuickAdd(p)}
                  className="px-3 py-1.5 rounded-lg border border-turmeric-500/40 text-charcoal dark:text-paper hover:bg-turmeric-500 hover:text-midnight font-bold text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link to="/shop" className="text-xs sm:text-sm font-bold text-turmeric-500 hover:underline inline-flex items-center gap-1.5 whitespace-nowrap">
            <span>View full pantry catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. CURCUMIN POTENCY SECTION (#potency-section)
      ════════════════════════════════════════════════════════════ */}
      <section id="potency-section" className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-2 sm:py-4 relative z-20">
        <div ref={potencyRef} className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-turmeric-xl border border-turmeric-500/35 glass-panel">
          
          <div className="relative min-h-[260px] xs:min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] overflow-hidden bg-gradient-to-br from-turmeric-950/90 via-forest-950 to-charcoal p-6 sm:p-8 flex items-center justify-center">
            <img
              src="/farms-images/farm-field.jpg"
              alt="Harvest Haldi Field"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="relative z-10 text-center">
              <img
                src="/turmeric.png"
                alt="Turmeric Roots"
                className="w-full max-w-[200px] xs:max-w-xs sm:max-w-sm mx-auto drop-shadow-[0_28px_56px_rgba(234,161,34,0.5)] animate-float-continuous"
              />
              <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-panel border border-turmeric-500/50 text-[11px] sm:text-xs font-bold text-turmeric-400 shadow-turmeric-md animate-pulse-gold-glow whitespace-nowrap">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-turmeric-400 shrink-0" />
                <span>Lab Verified 4.6% Curcuminoids</span>
              </div>
            </div>
          </div>

          <div className="p-6 xs:p-7 sm:p-10 lg:p-12 space-y-4 sm:space-y-5 bg-forest-900 text-paper flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-turmeric-500/20">
            <span className="tag-glow text-[11px] sm:text-xs inline-flex"><Zap className="w-3.5 h-3.5" /> Bio-Active Purity Test</span>
            
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold leading-tight text-white">
              Why Cold-Ground <em className="text-gradient-gold not-italic">Haldi</em>
              <br />Retains 3× More Curcumin
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Industrial high-speed mills spin at 3,000+ RPM generating temperatures over 80°C — burning away volatile aromatic oils and destroying curcumin potency. Our stone mills run under 35°C. Always.
            </p>

            <div className="space-y-3 sm:space-y-3.5">
              {[
                { label: "The Farm's Stone Milled", value: '4.6%', width: '92%', cls: 'bg-gradient-to-r from-turmeric-500 to-amber-400 shadow-turmeric-sm' },
                { label: 'Branded Organic Turmeric', value: '2.1%', width: '42%', cls: 'bg-gradient-to-r from-slate-500 to-slate-400' },
                { label: 'Commercial Grocery Turmeric', value: '0.8%', width: '16%', cls: 'bg-gradient-to-r from-slate-700 to-slate-600' },
              ].map((bar) => (
                <div key={bar.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-semibold">{bar.label}</span>
                    <span className="font-bold text-turmeric-400">{bar.value}</span>
                  </div>
                  <div className="w-full bg-forest-950 h-3 rounded-full overflow-hidden p-0.5 border border-forest-700">
                    <div
                      className={`bar-fill h-full rounded-full ${bar.cls}`}
                      style={{ '--bar-width': bar.width } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {['Lab Certified', 'No Fillers', 'No Synthetic Dyes', 'Direct Farm Direct'].map((b) => (
                <span key={b} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-forest-800 border border-forest-700 text-[9px] xs:text-[10px] font-bold uppercase tracking-wide text-turmeric-400 whitespace-nowrap">
                  <Shield className="w-3 h-3 shrink-0" />{b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. FEATURE CARDS ROW (CENTER ALIGNED)
      ════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="tag-glow text-xs inline-flex"><Leaf className="w-3.5 h-3.5" /> Farm Craftsmanship</span>
          <h2 className="font-serif text-2xl xs:text-3xl font-bold text-charcoal dark:text-paper">Preserved at the Peak of Harvest</h2>
        </div>
        <div ref={featureRowRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8 justify-center">
          {[
            {
              img: '/farms-images/turmeric-main.jpg',
              label: 'Stone-Milled Spices',
              value: '4.5%+',
              unit: 'Curcumin Preserved',
              bg: 'from-turmeric-950/85 via-turmeric-900/40 to-transparent',
            },
            {
              img: '/farms-images/honey-main.jpg',
              label: 'Raw Sidr Honey',
              value: '0°',
              unit: 'Heat — Never Pasteurised',
              bg: 'from-amber-950/85 via-amber-900/40 to-transparent',
            },
            {
              img: '/farms-images/shilajit-main.jpg',
              label: 'Himalayan Salajit',
              value: '40',
              unit: 'Days Solar Purification',
              bg: 'from-forest-950/85 via-forest-900/40 to-transparent',
            },
          ].map((f, i) => (
            <div
              key={i}
              className="feature-card group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/5] border border-turmeric-500/30"
            >
              <img
                src={f.img}
                alt={f.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${f.bg}`} />
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                <span className="text-[9px] xs:text-[10px] font-bold uppercase tracking-widest text-turmeric-300 mb-1">{f.label}</span>
                <p className="font-serif text-3xl xs:text-4xl lg:text-5xl font-bold text-white leading-none">{f.value}</p>
                <p className="text-xs text-white/90 mt-1 font-medium">{f.unit}</p>
                <div className="mt-3">
                  <Link to="/shop" className="inline-flex items-center gap-1 text-turmeric-300 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform whitespace-nowrap">
                    <span>Explore Pantry</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          5. STAT CARDS ROW (CENTER ALIGNED)
      ════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-2 sm:py-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="tag-glow text-xs inline-flex"><Leaf className="w-3.5 h-3.5" /> By the Numbers</span>
          <h2 className="font-serif text-2xl xs:text-3xl font-bold text-charcoal dark:text-paper">Why Discerning Chefs Choose Us</h2>
        </div>
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8 justify-center">
          {[
            { value: '60%', label: "Karachi's Artisanal Turmeric", sub: 'Stone-milled at Changa Manga estate.', icon: <Leaf className="w-5 h-5" />, color: 'text-turmeric-500' },
            { value: '100%', label: 'Unheated Raw Sidr Honey', sub: 'Wild berry blossom honey, never pasteurised.', icon: <Droplets className="w-5 h-5" />, color: 'text-chilli-500' },
            { value: '4.5%+', label: 'Curcumin Bio-Potency', sub: '3× higher than commercial grocery turmeric.', icon: <Zap className="w-5 h-5" />, color: 'text-emerald-500' },
          ].map((s, i) => (
            <div key={i} className="stat-card p-5 sm:p-6 rounded-2xl glass-panel border border-turmeric-500/30 text-center space-y-3">
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${s.color} bg-current/10`}>{s.icon}</div>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${s.color}`}>{s.value}</div>
              <p className="text-xs font-bold text-charcoal dark:text-paper uppercase tracking-wide">{s.label}</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          6. 4-STEP COLD MILLING JOURNEY (CENTER ALIGNED)
      ════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-2 sm:py-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="tag-glow text-xs inline-flex"><FlaskConical className="w-3.5 h-3.5" /> Quality Protocol</span>
          <h2 className="font-serif text-2xl xs:text-3xl font-bold text-charcoal dark:text-paper">4-Step Cold Milling Journey</h2>
        </div>

        <div ref={journeyRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 justify-center">
          {JOURNEY_STEPS.map((step, i) => (
            <div
              key={i}
              className="journey-card group p-4 sm:p-5 rounded-2xl glass-panel border border-turmeric-500/30 space-y-2.5 sm:space-y-3 text-center"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-turmeric-500/40 group-hover:text-turmeric-500 transition-colors block">
                {step.step}
              </span>
              <h3 className="font-serif text-base font-bold text-charcoal dark:text-paper">{step.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          7. TESTIMONIALS (CENTER ALIGNED)
      ════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-2 sm:py-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="tag-glow text-xs inline-flex"><Heart className="w-3.5 h-3.5 text-rose-500" /> Customer Stories</span>
          <h2 className="font-serif text-2xl xs:text-3xl font-bold text-charcoal dark:text-paper">
            What Our Customers Say
          </h2>
        </div>

        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8 justify-center">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card p-5 sm:p-6 rounded-2xl glass-panel border border-turmeric-500/30 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-1 justify-center sm:justify-start">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed italic font-medium">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-turmeric-500/20 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-turmeric-500/40 object-cover"
                />
                <div>
                  <p className="font-bold text-xs text-charcoal dark:text-paper">{t.name}</p>
                  <p className="text-[10px] text-slate-500">{t.title} · {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          8. MEET OUR FARM TEAM (CENTER ALIGNED)
      ════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-2 sm:py-4 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="tag-glow text-xs inline-flex"><Users className="w-3.5 h-3.5" /> The Artisans</span>
          <h2 className="font-serif text-2xl xs:text-3xl font-bold text-charcoal dark:text-paper">Meet Our Farm Team</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            A family-run team of growers, millers, and supply chain specialists from Changa Manga.
          </p>
        </div>

        <div ref={teamRef} className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 2xl:gap-6 justify-center">
          {TEAM.map((member) => (
            <div key={member.name} className="team-card group overflow-hidden p-3.5 sm:p-4 rounded-2xl glass-panel border border-turmeric-500/30 space-y-3 text-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  style={{ objectPosition: member.objectPos }}
                  loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-sm font-bold text-charcoal dark:text-paper group-hover:text-turmeric-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-[10px] font-bold text-turmeric-500 uppercase tracking-wider">{member.role}</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic border-t border-turmeric-500/20 pt-1.5 line-clamp-3 font-normal">
                  "{member.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link to="/our-story" className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-turmeric-500 hover:text-turmeric-600 whitespace-nowrap">
            <span>Read Full Heritage Story</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          9. BOTTOM CTA BANNER (HIGH CONTRAST & CLEAR VISIBILITY)
      ════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-slate-950 border border-turmeric-500/40 p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-turmeric-500/10">
          
          {/* Ambient Glow Aura in Banner Background */}
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-turmeric-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 sm:space-y-5 max-w-2xl mx-auto">
            <span className="tag-glow text-xs inline-flex">
              <ShoppingBag className="w-3.5 h-3.5" /> Seasonal Fresh Batch
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-white leading-tight">
              Order Before the <em className="text-gradient-gold not-italic">Harvest Season</em> Ends
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm 2xl:text-base leading-relaxed font-normal max-w-lg mx-auto">
              Cold-ground heirloom spices and 100% raw Sidr honey are harvested in limited seasonal batches. Direct farm dispatch across Pakistan.
            </p>

            <div className="pt-2 flex justify-center">
              <Link
                to="/shop"
                className="btn-shimmer px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl text-slate-950 font-bold text-xs xs:text-sm sm:text-base inline-flex items-center justify-center gap-2.5 shadow-[0_12px_35px_rgba(234,161,34,0.5)] hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="whitespace-nowrap">Shop the Harvest Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
