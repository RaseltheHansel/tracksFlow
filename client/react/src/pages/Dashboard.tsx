"use client";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSites, createSite } from '../api/axios';

interface Site {
  id:        number;
  name:      string;
  domain:    string;
  siteId:    string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [sites,      setSites]      = useState<Site[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newName,    setNewName]    = useState('');
  const [newDomain,  setNewDomain]  = useState('');
  const [loading,    setLoading]    = useState(false);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const { data } = await getSites();
      setSites(data);
    } catch { /* handle error */ }
  };

  const handleCreate = async () => {
    if (!newName || !newDomain) return;
    setLoading(true);
    try {
      await createSite({ name: newName, domain: newDomain });
      setNewName(''); setNewDomain('');
      setShowCreate(false);
      await fetchSites();
    } finally { setLoading(false); }
  };

  return (
    <div className='min-h-screen bg-track-bg p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <p className='text-xs tracking-widest uppercase text-track-accent font-medium mb-1'>
              Dashboard
            </p>
            <h1 className='text-4xl font-bold text-track-text'>📊 TrackFlow</h1>
          </div>
          <button onClick={() => setShowCreate(true)}
            className='bg-track-accent hover:opacity-90 text-white
              font-semibold px-5 py-2.5 rounded-xl text-sm transition-opacity'>
            + Add Website
          </button>
        </div>

        {/* Sites grid */}
        {sites.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-5xl mb-4'>📊</p>
            <h2 className='text-2xl font-bold text-track-text mb-2'>
              No websites yet
            </h2>
            <p className='text-track-muted mb-6'>
              Add your first website to start tracking visitors
            </p>
            <button onClick={() => setShowCreate(true)}
              className='bg-track-accent text-white px-6 py-3 rounded-xl font-semibold'>
              Add Website
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {sites.map(site => (
              <div key={site.id}
                onClick={() => navigate(`/site/${site.siteId}`)}
                className='bg-track-card border border-track-border rounded-2xl p-5
                  cursor-pointer hover:border-track-accent transition-colors'>
                <h3 className='font-semibold text-track-text mb-1'>{site.name}</h3>
                <p className='text-track-muted text-sm mb-4'>{site.domain}</p>
                <code className='text-xs text-track-muted bg-track-surface
                  px-2 py-1 rounded block truncate'>
                  {site.siteId}
                </code>
              </div>
            ))}
          </div>
        )}

        {/* Create modal */}
        {showCreate && (
          <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
            <div className='bg-track-card border border-track-border
              rounded-2xl p-8 w-full max-w-md'>
              <h2 className='text-2xl font-bold text-track-text mb-6'>Add Website</h2>
              <div className='space-y-4'>
                <input type="text" placeholder="Website name (e.g. My Blog)"
                  value={newName} onChange={e => setNewName(e.target.value)}
                  className='w-full bg-track-surface border border-track-border
                    text-track-text placeholder:text-track-muted rounded-xl
                    px-4 py-3 text-sm outline-none focus:border-track-accent'
                />
                <input type="text" placeholder="Domain (e.g. myblog.com)"
                  value={newDomain} onChange={e => setNewDomain(e.target.value)}
                  className='w-full bg-track-surface border border-track-border
                    text-track-text placeholder:text-track-muted rounded-xl
                    px-4 py-3 text-sm outline-none focus:border-track-accent'
                />
              </div>
              <div className='flex gap-3 mt-6'>
                <button onClick={handleCreate} disabled={loading}
                  className='flex-1 bg-track-accent hover:opacity-90 disabled:opacity-50
                    text-white font-semibold py-3 rounded-xl text-sm'>
                  {loading ? 'Creating...' : 'Create'}
                </button>
                <button onClick={() => setShowCreate(false)}
                  className='flex-1 bg-track-surface border border-track-border
                    text-track-muted py-3 rounded-xl text-sm hover:bg-track-card'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
