import React, { useState } from 'react';
import { Share2, Globe, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

interface SocialChannel {
  platform: 'meta_facebook' | 'meta_instagram' | 'linkedin';
  name: string;
  handle: string;
  connected: boolean;
  followers: string;
  accessToken: string;
  autoSync: boolean;
  lastSynced: string;
}

const INITIAL_CHANNELS: SocialChannel[] = [
  {
    platform: 'meta_facebook',
    name: "The Farm's Organic Foods",
    handle: 'https://www.facebook.com/share/17SJpL88Ea/',
    connected: true,
    followers: '24,500 Followers',
    accessToken: 'EAAG...meta_fb_page_access_token_secured',
    autoSync: true,
    lastSynced: '10 mins ago',
  },
  {
    platform: 'meta_instagram',
    name: '@thefarmsfoods',
    handle: 'https://www.instagram.com/thefarmsfoods',
    connected: true,
    followers: '38,200 Followers',
    accessToken: 'IGQV...meta_ig_business_api_token_secured',
    autoSync: true,
    lastSynced: '1 hour ago',
  },
  {
    platform: 'linkedin',
    name: "The Farm's Organic Foods Pakistan",
    handle: 'https://www.linkedin.com/company/thefarmsfoods-pk',
    connected: true,
    followers: '4,100 Connections',
    accessToken: 'AQV...linkedin_organisation_api_v2_token',
    autoSync: false,
    lastSynced: 'Yesterday',
  },
];

export const SocialMediaPage: React.FC = () => {
  const [channels, setChannels] = useState<SocialChannel[]>(INITIAL_CHANNELS);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTargetChannels, setPostTargetChannels] = useState<string[]>([
    'meta_facebook',
    'meta_instagram',
  ]);
  const [publishing, setPublishing] = useState(false);
  const [publishedNotice, setPublishedNotice] = useState('');

  const toggleChannelSync = (platform: string) => {
    setChannels(
      channels.map((ch) =>
        ch.platform === platform ? { ...ch, autoSync: !ch.autoSync } : ch
      )
    );
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublishedNotice(
        `Cross-posted successfully to Meta (${postTargetChannels.join(', ')})!`
      );
      setPostContent('');
      setTimeout(() => setPublishedNotice(''), 4000);
    }, 1200);
  };

  const toggleTargetChannel = (p: string) => {
    if (postTargetChannels.includes(p)) {
      setPostTargetChannels(postTargetChannels.filter((c) => c !== p));
    } else {
      setPostTargetChannels([...postTargetChannels, p]);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Share2 className="w-4 h-4" /> Marketing &amp; Omnichannel Integrations
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight">Social Media Management</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure Meta (Facebook &amp; Instagram Business) and LinkedIn Graph API credentials, automated feed syncing, and multi-channel post dispatch.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {channels.map((ch) => (
          <div
            key={ch.platform}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shrink-0 ${
                      ch.platform === 'meta_facebook'
                        ? 'bg-blue-600'
                        : ch.platform === 'meta_instagram'
                        ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                        : 'bg-blue-700'
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-100 text-xs sm:text-sm truncate">{ch.name}</h3>
                    <a
                      href={ch.handle}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-amber-400 hover:underline truncate block"
                    >
                      {ch.handle}
                    </a>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-emerald-500/50 shadow-md shrink-0" />
              </div>

              <div className="pt-3 sm:pt-4 space-y-1.5 sm:space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Follower Reach:</span>
                  <span className="font-bold text-slate-200">{ch.followers}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Last Automated Sync:</span>
                  <span className="font-mono text-slate-300">{ch.lastSynced}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Auto-post to Feed</span>
              <button
                type="button"
                onClick={() => toggleChannelSync(ch.platform)}
                className={`w-11 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                  ch.autoSync ? 'bg-amber-500' : 'bg-slate-800'
                }`}
                aria-label={`Toggle auto-sync for ${ch.name}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    ch.autoSync ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Instant Cross-Post Publisher Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4">
          <div>
            <h2 className="font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2">
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> Multi-Channel Social Publisher
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Draft harvest announcements, new stock drops, or recipe blogs and publish instantly to Meta &amp; LinkedIn.
            </p>
          </div>
        </div>

        {publishedNotice && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{publishedNotice}</span>
          </div>
        )}

        <form onSubmit={handlePublishPost} className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <span className="text-slate-400 font-semibold">Publish Target:</span>
            {[
              { id: 'meta_facebook', label: 'Meta Facebook Page' },
              { id: 'meta_instagram', label: 'Meta Instagram Feed' },
              { id: 'linkedin', label: 'LinkedIn Company Page' },
            ].map((target) => (
              <label
                key={target.id}
                className={`cursor-pointer px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-semibold flex items-center gap-2 transition-all ${
                  postTargetChannels.includes(target.id)
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={postTargetChannels.includes(target.id)}
                  onChange={() => toggleTargetChannel(target.id)}
                  className="hidden"
                />
                <span
                  className={`w-2 h-2 rounded-full ${
                    postTargetChannels.includes(target.id) ? 'bg-amber-400' : 'bg-slate-600'
                  }`}
                />
                {target.label}
              </label>
            ))}
          </div>

          <textarea
            rows={4}
            required
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write announcement or promotional text for social media channels..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={publishing}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{publishing ? 'Publishing...' : 'Dispatch Post Now'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
