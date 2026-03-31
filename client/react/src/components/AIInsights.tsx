import { useState } from 'react';
import { getInsights } from '../api/axios';

export default function AIInsights({ siteId }: { siteId: string }) {
  const [insights,  setInsights]  = useState('');
  const [loading,   setLoading]   = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data } = await getInsights(siteId);
      setInsights(data.insights);
      setGenerated(true);
    } catch {
      setInsights('Failed to generate insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gradient-to-br from-track-card/90 to-track-surface/70
      backdrop-blur border border-track-border/80 rounded-2xl p-5
      shadow-[0_12px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/5'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='font-semibold text-track-text'>AI Insights</h3>
          <p className='text-track-muted text-xs mt-0.5'>
            Powered by Gemini AI
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className='bg-gradient-to-r from-track-accent to-track-accent2
            hover:brightness-110 disabled:opacity-50
            text-track-bg text-sm font-semibold px-4 py-2 rounded-xl
            transition-[filter,transform] shadow-[0_10px_30px_rgba(34,211,238,0.25)]'
        >
          {loading ? 'Analyzing...' : generated ? '🔄 Refresh' : '🤖 Generate Insights'}
        </button>
      </div>

      {insights ? (
        <div className='text-track-soft text-sm leading-relaxed
          whitespace-pre-wrap'>
          {insights}
        </div>
      ) : (
        <div className='text-center py-8'>
          <p className='text-4xl mb-3'>🤖</p>
          <p className='text-track-muted text-sm'>
            Click Generate to get AI analysis of your traffic patterns
          </p>
        </div>
      )}
    </div>
  );
}
