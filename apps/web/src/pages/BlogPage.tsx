import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../lib/api';
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react';
import { IBlogPost } from '@farms/shared-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultHarvestStories: IBlogPost[] = [
  {
    _id: 'story-1',
    title: 'The Lost Art of Stone-Milled Curcumin-Rich Haldi',
    slug: 'the-lost-art-of-stone-milled-haldi',
    excerpt:
      'Industrial high-speed mills generate heat over 80°C, destroying volatile curcumin. Learn how traditional cold stone milling preserves true healing potency — and why 60% of Karachi\'s best restaurants specify us.',
    contentHtml: '<p>Details inside...</p>',
    coverImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80',
    author: { _id: 'admin-1', name: 'Master Farm Miller' },
    tags: ['Cold Ground', 'Turmeric', 'Farm Process'],
    category: 'Harvest Stories',
    status: 'published',
    publishedAt: '2026-08-10T10:00:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'story-2',
    title: 'Harvesting Raw Sidr Honey in Karak & Changa Manga',
    slug: 'harvesting-raw-sidr-honey-changa-manga',
    excerpt:
      'During the brief autumn berry blossom, wild bees gather nectar from Sidr trees. Unheated extraction retains rare antibacterial enzymes that pasteurised honey can never replicate.',
    contentHtml: '<p>Details inside...</p>',
    coverImage: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1200&q=80',
    author: { _id: 'admin-1', name: 'Farm Apiarist' },
    tags: ['Raw Honey', 'Sidr', 'Harvest'],
    category: 'Honey Guides',
    status: 'published',
    publishedAt: '2026-08-05T10:00:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'story-3',
    title: 'Why Pure Salajit Needs 40 Days of Herbal Sun Purification',
    slug: 'why-pure-salajit-requires-40-days-sun-purification',
    excerpt:
      'Raw Himalayan shilajit rock contains sediments and fulvic acid precursors. The traditional Surya-Tapi method — 40 days of solar evaporation in Triphala decoctions — yields pure gold-grade resin.',
    contentHtml: '<p>Details inside...</p>',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    author: { _id: 'admin-1', name: 'Himalayan Herbalist' },
    tags: ['Salajit', 'Himalayas', 'Wellness'],
    category: 'Wellness Journal',
    status: 'published',
    publishedAt: '2026-07-28T10:00:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'story-4',
    title: 'Cold-Ground Red Chilli: True Crimson Without Artificial Dyes',
    slug: 'cold-ground-red-chilli-without-dyes',
    excerpt:
      'Commercial red chilli powder relies on artificial sudan dyes to compensate for colour lost during high-heat milling. Sun-dried Pakistani mirch ground cold retains true natural pigment.',
    contentHtml: '<p>Details inside...</p>',
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
    author: { _id: 'admin-1', name: 'Farm Culinary Specialist' },
    tags: ['Red Chilli', 'Spices', 'Purity'],
    category: 'Recipes & Spices',
    status: 'published',
    publishedAt: '2026-07-15T10:00:00Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<IBlogPost[]>(defaultHarvestStories);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchApi('/blog')
      .then((res) => { if (res.data?.posts?.length > 0) setPosts(res.data.posts); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.85, ease: 'expo.out',
        scrollTrigger: { trigger: containerRef.current!, start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, [posts]);

  const [featured, ...rest] = posts;

  return (
    <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-16 space-y-10 sm:space-y-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <span className="tag-glow text-xs inline-flex"><BookOpen className="w-3.5 h-3.5" /> Farm Journal &amp; Harvest Stories</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-charcoal dark:text-paper tracking-tight mt-2 sm:mt-3">
          Stories From <span className="text-gradient-gold italic">Changa Manga</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Deep dives into cold stone milling, wild Sidr honey harvesting, and the ancient art of Pakistani spice culture.
        </p>
      </div>

      <div ref={containerRef} className="space-y-6">
        {/* Featured story — large hero card */}
        {featured && (
          <div className="blog-card group grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] glass-panel border border-turmeric-500/25 shadow-turmeric-xl">
            {/* Image */}
            <div className="relative h-56 sm:h-72 lg:h-auto overflow-hidden">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 lg:to-black/60 z-10" />
              <span className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 px-3 py-1.5 rounded-full bg-turmeric-500 text-midnight text-[10px] font-black uppercase tracking-widest shadow-turmeric-sm">
                {featured.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center space-y-4 sm:space-y-5 relative z-10">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />6 min read</span>
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                <span>{new Date(featured.publishedAt || featured.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              <Link to={`/blog/${featured.slug}`}>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal dark:text-paper group-hover:text-turmeric-500 transition-colors leading-tight">
                  {featured.title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {featured.tags?.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-turmeric-500/08 border border-turmeric-500/20 text-turmeric-600 dark:text-turmeric-400 text-[10px] font-bold uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <User className="w-3.5 h-3.5" /> By {featured.author?.name}
                </span>
                <Link to={`/blog/${featured.slug}`} className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-turmeric-500 hover:text-turmeric-600">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Remaining cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8">
          {rest.map((post) => (
            <div key={post._id} className="blog-card group flex flex-col rounded-2xl glass-panel border border-turmeric-500/25 overflow-hidden shadow-turmeric-md hover:shadow-turmeric-xl transition-all duration-400">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                <span className="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-full bg-turmeric-500 text-midnight text-[9px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-3 relative z-10">
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>5 min read</span>
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal dark:text-paper group-hover:text-turmeric-500 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags?.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-turmeric-500/08 border border-turmeric-500/20 text-turmeric-600 dark:text-turmeric-400 text-[9px] font-bold uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-turmeric-500/15 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <User className="w-3 h-3" />{post.author?.name}
                  </span>
                  <Link to={`/blog/${post.slug}`} className="group/link inline-flex items-center gap-1 text-[11px] font-bold text-turmeric-500 hover:text-turmeric-600">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
