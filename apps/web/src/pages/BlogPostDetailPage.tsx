import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApi } from '../lib/api';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { IBlogPost } from '@farms/shared-types';

export const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchApi(`/blog/${slug}`)
      .then((res) => setPost(res.data?.post || null))
      .catch(() => {
        setPost({
          _id: 'story-1',
          title: 'The Lost Art of Stone-Milled Curcumin-Rich Haldi',
          slug: 'the-lost-art-of-stone-milled-haldi',
          excerpt: 'Industrial high-speed mills heat spices over 80°C, stripping away volatile oils and dulling natural turmeric curcumin.',
          contentHtml: `
            <p>At <strong>The Farm's</strong> in Changa Manga, we reject high-speed industrial grinders. Industrial steel blades spin at thousands of RPMs, generating friction heat that destroys delicate aromatic compounds.</p>
            <h2>The Cold Stone Milling Advantage</h2>
            <p>By milling at low speeds under 35°C, our turmeric retains over 4.5% natural curcumin levels, delivering intense golden color and restorative medicinal potency.</p>
            <p>Sourced from organic, pesticide-free riverbed soil in Punjab, every jar represents generations of Pakistani agricultural heritage.</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80',
          author: { _id: 'admin-1', name: 'Master Farm Miller' },
          tags: ['Cold Ground', 'Turmeric', 'Farm Process'],
          category: 'Harvest Stories',
          status: 'published',
          publishedAt: '2026-08-10T10:00:00Z',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      });
  }, [slug]);

  if (!post) {
    return <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 py-20 text-center text-slate-500">Loading article...</div>;
  }

  return (
    <article className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-16 space-y-6 sm:space-y-8">
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-turmeric-500 hover:text-turmeric-600">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Harvest Journal</span>
      </Link>

      <div className="space-y-3 sm:space-y-4">
        <span className="px-3 py-1 rounded-full bg-turmeric-500/10 border border-turmeric-500/30 text-turmeric-500 text-xs font-bold uppercase tracking-wider">
          {post.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal dark:text-paper leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> By {post.author?.name || 'Farm Admin'}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Rich HTML Content */}
      <div
        className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
};
