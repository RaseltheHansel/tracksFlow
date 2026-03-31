import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStats, getSite, getSnippet } from '../api/axios';
import type { Site, StatsData } from '../types';
import StatsCards    from '../components/StatsCards';
import LiveFeed      from '../components/LiveFeed';
import AIInsights    from '../components/AIInsights';
import ViewsChart    from '../components/ViewsChart';
import TopPages      from '../components/TopPages';
import DeviceChart   from '../components/DeviceChart';
import { useAuth }   from '../hooks/useAuth';

type Period = '7d' | '30d' | '90d';

export default function SiteDetail() {
  const { siteId }  = useParams<{ siteId: string }>();
  const navigate    = useNavigate();
  const { user, logout } = useAuth();
  const [site,      setSite]    = useState<Site | null>(null);
  const [stats,     setStats]   = useState<StatsData | null>(null);
  const [period,    setPeriod]  = useState<Period>('7d');
  const [loading,   setLoading] = useState(true);
  const [snippet,   setSnippet] = useState('');
  const [showSnippet, setShowSnippet] = useState(false);
  const [copied,    setCopied]  = useState(false);

  useEffect(() => {
    if (siteId) {
      fetchSite();
      fetchStats();
    }
  }, [siteId]);

  useEffect(() => {
    if (siteId) fetchStats();
  }, [period]);

  const fetchSite = async () => {
    try {
      const { data } = await getSite(siteId!);
      setSite(data);
    } catch {
      navigate('/');
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data } = await getStats(siteId!, period);
      setStats(data);
    } catch {
      // handle silently
    } finally {
      setLoading(false);
    }
  };

  const handleGetSnippet = async () => {
    try {
      const { data } = await getSnippet(site!.id);
      // Normalize snippet for a clean, valid multi-line display
      const raw = String(data.snippet || '');
      const srcMatch = raw.match(/src="([^"]+)"/);
      const siteMatch = raw.match(/data-site="([^"]+)"/);
      const src = srcMatch?.[1];
      const siteIdValue = siteMatch?.[1];

      const formatted = (src && siteIdValue)
        ? `<script\n  src="${src}"\n  data-site="${siteIdValue}"\n  defer\n></script>`
        : raw.replace(/\s+/g, ' ').trim();

      setSnippet(formatted);
      setShowSnippet(true);
    } catch {
      alert('Failed to get snippet');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='min-h-screen bg-track-bg pb-16'>

      {/* Navbar */}
      <nav className='bg-track-card/70 backdrop-blur border-b border-track-border/80 px-8 py-4'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => navigate('/')}
              className='text-track-muted hover:text-track-soft
                transition-colors text-sm'
            >
              ← Dashboard
            </button>
            <span className='text-track-border'>|</span>
            <span className='font-semibold text-track-text'>
              {site?.name}
            </span>
            <span className='text-track-muted text-sm'>
              {site?.domain}
            </span>
          </div>
          <div className='flex items-center gap-3'>
            {user?.name && (
              <span className='text-xs text-track-muted'>
                {user.name}
              </span>
            )}
            <button
              onClick={() => navigate('/settings')}
              className='bg-track-surface/70 backdrop-blur border border-track-border/80
                text-track-soft text-sm font-medium px-4 py-2
                rounded-xl hover:border-track-accent hover:text-track-text transition-colors'
            >
              Settings
            </button>
            <button
              onClick={logout}
              className='bg-track-surface/70 backdrop-blur border border-track-border/80
                text-track-soft text-sm font-medium px-4 py-2
                rounded-xl hover:border-track-accent hover:text-track-text transition-colors'
            >
              Logout
            </button>
            <button
              onClick={handleGetSnippet}
              className='bg-gradient-to-r from-track-accent to-track-accent2
                hover:brightness-110 text-track-bg text-sm font-semibold px-4 py-2
                rounded-xl transition-[filter,transform]
                shadow-[0_10px_30px_rgba(34,211,238,0.25)]'
            >
              {'</>'}  Get Snippet
            </button>
          </div>
        </div>
      </nav>

      <div className='max-w-7xl mx-auto p-8'>

        {/* Header + Period selector */}
        <div className='flex items-center justify-between mb-6'>
          <div>
            <p className='text-xs tracking-[0.25em] uppercase
              text-track-muted font-medium mb-2'>
              Analytics
            </p>
            <h1 className='text-2xl font-bold text-track-text'>
              {site?.name}
            </h1>
          </div>
          <div className='flex gap-2'>
            {(['7d', '30d', '90d'] as Period[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-xl text-sm font-medium
                  transition-[filter,transform] ${period === p
                    ? 'bg-gradient-to-r from-track-accent to-track-accent2 text-track-bg shadow-[0_8px_20px_rgba(34,211,238,0.25)]'
                    : 'bg-track-surface/70 border border-track-border/80 text-track-muted hover:text-track-soft'
                  }`}
              >
                {p === '7d' ? '7 days' : p === '30d' ? '30 days' : '90 days'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className='text-center py-20'>
            <p className='text-track-muted'>Loading analytics...</p>
          </div>
        ) : stats ? (
          <div className='space-y-6'>

            {/* Stats Cards */}
            <StatsCards
              pageviews={stats.pageviews}
              uniqueVisitors={stats.uniqueVisitors}
              bounceRate={stats.bounceRate}
              avgDuration={stats.avgDuration}
              prevPageviews={0}
              prevVisitors={0}
            />

            {/* Charts row */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              <div className='lg:col-span-2'>
                <ViewsChart data={stats.viewsOverTime} />
              </div>
              <div>
                <LiveFeed siteId={siteId!} />
              </div>
            </div>

            {/* Top pages + Device breakdown */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <TopPages pages={stats.topPages} />
              <DeviceChart
                devices={stats.deviceBreakdown}
                browsers={stats.browserBreakdown}
              />
            </div>

            {/* AI Insights */}
            <AIInsights siteId={siteId!} />

          </div>
        ) : (
          <div className='text-center py-20'>
            <p className='text-track-muted'>No data yet</p>
          </div>
        )}
      </div>

      {/* Snippet modal */}
      {showSnippet && (
        <div className='fixed inset-0 bg-black/70 flex items-center
          justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-track-card/95 to-track-surface/80
            border border-track-border/80 rounded-2xl p-8 w-full max-w-xl ring-1 ring-white/5'>
            <h2 className='text-xl font-bold text-track-text mb-2'>
              Install TrackFlow
            </h2>
            <p className='text-track-muted text-sm mb-6'>
              Add this snippet before the closing{' '}
              <code className='text-track-accent'>&lt;/head&gt;</code>{' '}
              tag of your website
            </p>
            <div className='bg-track-surface border border-track-border
              rounded-xl p-4 mb-4 relative'>
              <pre className='text-track-soft text-sm whitespace-pre
                break-words font-mono leading-relaxed'>
                {snippet}
              </pre>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={handleCopy}
                className='flex-1 bg-gradient-to-r from-track-accent to-track-accent2
                  hover:brightness-110 text-track-bg font-semibold py-3 rounded-xl text-sm'
              >
                {copied ? '✅ Copied!' : 'Copy Snippet'}
              </button>
              <button
                onClick={() => setShowSnippet(false)}
                className='flex-1 bg-track-surface border
                  border-track-border/80 text-track-muted py-3
                  rounded-xl text-sm hover:bg-track-card'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
