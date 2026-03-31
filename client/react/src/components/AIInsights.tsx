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
    <div className='bg-track-card/80 backdrop-blur border border-track-border rounded-2xl p-5
      shadow-[0_8px_30px_rgba(0,0,0,0.25)]'>
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
          className='bg-track-accent/90 hover:bg-track-accent disabled:opacity-50
            text-track-bg text-sm font-semibold px-4 py-2 rounded-xl
            transition-colors shadow-[0_10px_30px_rgba(56,189,248,0.25)]'
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
