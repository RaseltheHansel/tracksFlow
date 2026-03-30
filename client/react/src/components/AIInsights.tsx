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
    <div className='bg-track-card border border-track-border rounded-2xl p-5'>
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
          className='bg-track-accent hover:opacity-90 disabled:opacity-50
            text-white text-sm font-medium px-4 py-2 rounded-xl
            transition-opacity'
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