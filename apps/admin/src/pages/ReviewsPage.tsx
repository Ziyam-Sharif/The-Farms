import React, { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';
import { Star, Check } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = () => {
    setLoading(true);
    setReviews([
      {
        _id: 'rev-1',
        productName: 'Cold-Ground Organic Turmeric (Haldi)',
        userName: 'Zainab Ahmed',
        rating: 5,
        title: 'Authentic Changa Manga Turmeric!',
        body: 'The color and aroma are vastly superior to store bought packets. You can taste the genuine curcumin richness.',
        isApproved: true,
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'rev-2',
        productName: 'Pure Sidr Organic Honey',
        userName: 'Tariq Mahmood',
        rating: 5,
        title: 'Unbelievably rich texture',
        body: 'Pure raw honey as promised. Great packaging and super fast delivery to Islamabad.',
        isApproved: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await fetchApi(`/admin/reviews/${id}/approve`, { method: 'PATCH' });
      loadReviews();
    } catch {
      setReviews(reviews.map((r) => (r._id === id ? { ...r, isApproved: true } : r)));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Review Moderation Queue</h1>
        <p className="text-xs sm:text-sm text-slate-400">Approve or reject customer product testimonials before public display.</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-200 text-xs sm:text-sm">{review.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${review.isApproved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {review.isApproved ? 'Approved' : 'Pending Approval'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">{review.body}</p>
              <p className="text-[10px] sm:text-xs text-slate-500">By {review.userName} for <span className="text-slate-400">{review.productName}</span></p>
            </div>

            {!review.isApproved && (
              <button
                onClick={() => handleApprove(review._id)}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer whitespace-nowrap"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Approve Review</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
