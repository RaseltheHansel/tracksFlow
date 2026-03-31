import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface LiveEvent {
  type:      string;
  url:       string;
  browser:   string;
  os:        string;
  device:    string;
  timestamp: string;
}

export const useSocket = (
  siteId: string | null,
  onNewEvent: (event: LiveEvent) => void,
  onStatus?: (connected: boolean) => void
) => {
  const socketRef  = useRef<Socket | null>(null);
  // WHY: Store latest onNewEvent in ref to avoid
  // socket reconnecting on every re-render
  const callbackRef = useRef(onNewEvent);

  // WHY: Always keep callbackRef up to date
  // without triggering the useEffect
  useEffect(() => {
    callbackRef.current = onNewEvent;
  }, [onNewEvent]);

  useEffect(() => {
    if (!siteId) return;

    // WHY: Connect to Socket.io server
    socketRef.current = io(
      import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
      {
        // WHY: Reconnect automatically if connection drops
        reconnection:      true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      }
    );

    socketRef.current.on('connect', () => {
      console.log('📊 TrackFlow connected:', socketRef.current?.id);
      // WHY: Subscribe to this specific site's events
      // Server only sends events for this siteId
      socketRef.current?.emit('subscribe_site', siteId);
      onStatus?.(true);
    });

    // WHY: Use callbackRef.current so we always call
    // the latest version of onNewEvent without
    // reconnecting the socket every time it changes
    socketRef.current.on('new_event', (event: LiveEvent) => {
      callbackRef.current(event);
    });

    socketRef.current.on('disconnect', () => {
      console.log('📊 TrackFlow disconnected');
      onStatus?.(false);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('📊 Socket connection error:', err.message);
    });

    // WHY: Cleanup — disconnect when component unmounts
    // or when siteId changes
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };

  }, [siteId]); // ← only reconnect when siteId changes

  // WHY: Expose connected status so components
  // can show Live/Disconnected badge
  const isConnected = () => socketRef.current?.connected ?? false;

  return { isConnected };
};
