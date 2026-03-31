(function() {
  'use strict';

  // WHY IIFE: wraps everything in a function to avoid
  // polluting the global namespace of the website

  // Get the script tag to find siteId and server URL
  const script   = document.currentScript;
  const siteId   = script.getAttribute('data-site');
  const serverUrl = script.src.replace('/sdk.js', '');

  if (!siteId) {
    console.warn("[TrackFlow] Missing data-site attribute");
    return;
  }

  // WHY visitorId: creates anonymous fingerprint
  // No cookies = privacy-friendly!
  const getVisitorId = () => {
    const key = `tf_${siteId}`;
    let id = localStorage.getItem(key);
    if (!id) {
      id = Math.random().toString(36).slice(2) +
           Date.now().toString(36);
      localStorage.setItem(key, id);
    }
    return id;
  };

  // WHY sessionId: groups events from same visit together
  const getSessionId = () => {
    const key = `tf_session_${siteId}`;
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = (crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : (Math.random().toString(36).slice(2) + Date.now().toString(36));
      sessionStorage.setItem(key, id);
    }
    return id;
  };

  const sendEvent = (type, props) => {
    const data = {
      siteId,
      type:      type || "pageview",
      url:       window.location.href,
      referrer:  document.referrer || null,
      userAgent: navigator.userAgent,
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      props:     props || null,
      width:     window.innerWidth,
    };

    // WHY fetch with keepalive: sends even if page closes
    fetch(`${serverUrl}/api/collect`, {
      method:    "POST",
      headers:   { "Content-Type": "application/json" },
      body:      JSON.stringify(data),
      keepalive: true,
    }).catch(() => {
      // Silently fail — never crash the host website!
    });
  };

  // Track initial page view
  sendEvent("pageview");

  // WHY: Handle single-page apps (React, Vue, etc.)
  // These apps change URL without full page reload
  const originalPushState    = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    sendEvent("pageview");
  };

  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    sendEvent("pageview");
  };

  window.addEventListener("popstate", () => sendEvent("pageview"));

  // WHY: Expose trackEvent globally so devs can
  // track custom events like button clicks
  window.TrackFlow = {
    track: (eventName, props) => sendEvent(eventName, props),
  };

})();
