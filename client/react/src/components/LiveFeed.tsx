import { useState, useEffect } from 'react';
import { useSocket, type LiveEvent } from '../hooks/useSocket';
import { getLiveEvents } from '../api/axios';
import { formatDistanceToNow } from 'date-fns';

const deviceIcon = (device: string) => {
  if (device === 'mobile') return '📱';
  if (device === 'tablet') return '📟';
  return '💻';
};

const eventTypeColor = (type: string) => {
  if (type === 'pageview') return 'text-track-accent';
  return 'text-track-yellow';
};

export default function LiveFeed({ siteId }: { siteId: string }) {
  const [events,    setEvents]    = useState<LiveEvent[]>([]);
  const [connected, setConnected] = useState(false);

  useSocket(siteId, (event) => {
    // WHY: Keep only last 20 events — prevent memory leak
    setEvents(prev => [event, ...prev].slice(0, 20));
  }, setConnected);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getLiveEvents(siteId);
        setEvents(data);
      } catch {
        // ignore initial load errors
      }
    };
    if (siteId) load();
  }, [siteId]);

  return (
    <div className='bg-track-card/80 backdrop-blur border border-track-border rounded-2xl p-5
      shadow-[0_8px_30px_rgba(0,0,0,0.25)]'>

      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='font-semibold text-track-text'>Live Feed</h3>
          <p className='text-track-muted text-xs mt-0.5'>
            Real-time visitor events
          </p>
        </div>

        {/* Live / Disconnected badge */}
        <div className='flex items-center gap-2'>
          <div className={`w-2 h-2 rounded-full
            ${connected
              ? 'bg-track-green animate-pulse'
              : 'bg-track-muted'
            }`}
          />
          <span className={`text-xs font-medium
            ${connected ? 'text-track-green' : 'text-track-muted'}`}>
            {connected ? 'Live' : 'Connecting...'}
          </span>
        </div>
      </div>

      {/* Empty state */}
      {events.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-3xl mb-3'>👁️</p>
          <p className='text-track-muted text-sm'>
            Waiting for visitors...
          </p>
          <p className='text-track-muted text-xs mt-1'>
            Events will appear here in real-time
          </p>
        </div>
      ) : (
        <div className='space-y-1 max-h-72 overflow-y-auto'>
          {events.map((event, i) => (
            <div
              key={i}
              className='flex items-center gap-3 p-2.5 rounded-xl
                hover:bg-track-surface transition-colors'
            >
              {/* Device icon */}
              <span className='text-xl shrink-0'>
                {deviceIcon(event.device)}
              </span>

              {/* Event info */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-0.5'>
                  <span className={`text-xs font-medium uppercase
                    tracking-wide ${eventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <span className='text-track-muted text-xs'>
                    {event.browser} · {event.os}
                  </span>
                </div>
                <p className='text-track-soft text-sm truncate'>
                  {event.url}
                </p>
              </div>

              {/* Timestamp */}
              <span className='text-track-muted text-xs shrink-0'>
                {formatDistanceToNow(
                  new Date(event.timestamp),
                  { addSuffix: true }
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Event count footer */}
      {events.length > 0 && (
        <div className='mt-3 pt-3 border-t border-track-border
          flex items-center justify-between'>
          <p className='text-track-muted text-xs'>
            Showing last {events.length} events
          </p>
          <button
            onClick={() => setEvents([])}
            className='text-track-muted text-xs hover:text-track-soft
              transition-colors'
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
