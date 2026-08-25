import React, { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';
import { Plus } from 'lucide-react';
import { IBlogPost } from '@farms/shared-types';

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    contentHtml: '<p>Write article content here...</p>',
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    tags: 'Harvest News, Spices',
    category: 'Harvest News',
    status: 'published',
  });

  const loadPosts = () => {
    setLoading(true);
    fetchApi('/blog')
      .then((res) => setPosts(res.data?.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/blog/admin', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          tags: formData.tags.split(',').map((t) => t.trim()),
        }),
      });
      setIsModalOpen(false);
      loadPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to create article');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Blog &amp; Harvest Stories</h1>
          <p className="text-xs sm:text-sm text-slate-400">Publish articles, farming guides, and recipes.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-amber-500/10 cursor-pointer shrink-0 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">New Article</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[560px]">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] sm:text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Title</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Category</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Author</th>
                <th className="py-3 sm:py-3.5 px-3 sm:px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">Loading articles...</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">No blog posts found.</td></tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} className="hover:bg-slate-800/40">
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 font-semibold text-slate-100">{post.title}</td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 text-slate-400 whitespace-nowrap">{post.category}</td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 text-slate-400 whitespace-nowrap">{post.author?.name || 'Admin'}</td>
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {post.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-100">Draft New Journal Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cold Stone Milling Curcumin Advantages"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100 cursor-pointer"
                  >
                    <option value="Harvest News">Harvest News</option>
                    <option value="Spices & Recipes">Spices &amp; Recipes</option>
                    <option value="Honey Guides">Honey Guides</option>
                    <option value="Wellness Journal">Wellness Journal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Article HTML Content</label>
                <textarea
                  rows={5}
                  required
                  value={formData.contentHtml}
                  onChange={(e) => setFormData({ ...formData, contentHtml: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100 font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs sm:text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
