
(function () {
  'use strict';

  
  const SHORTS_SELECTORS = [
    
    'ytd-guide-entry-renderer a[title="Shorts"]',
    'ytd-mini-guide-entry-renderer a[title="Shorts"]',
    '#endpoint[title="Shorts"]',
    
    'ytd-reel-shelf-renderer',
    'ytd-rich-shelf-renderer[is-shorts]',
    'ytd-rich-shelf-renderer[feature="shorts"]',
    'ytd-reel-item-renderer',
    'ytd-shorts-lockup-view-model',
    
    'ytd-video-renderer:has(a[href*="/shorts/"])',
    'ytd-rich-item-renderer:has(a[href*="/shorts/"])',
    'ytd-compact-video-renderer:has(a[href*="/shorts/"])',
    'ytd-grid-video-renderer:has(a[href*="/shorts/"])',
    
    'yt-chip-cloud-chip-renderer:has([title="Shorts"])',
    
    'ytd-item-section-renderer:has(ytd-reel-shelf-renderer)',
    
    'ytd-shorts',
    'ytd-shorts-player-container',
  ];


  function hideElement(el) {
    if (!el || el.dataset.shortsBlocked) return;
    el.dataset.shortsBlocked = '1';
    el.style.setProperty('display', 'none', 'important');

    
    const parent = el.closest(
      'ytd-item-section-renderer, ytd-rich-section-renderer, ytd-shelf-renderer'
    );
    if (parent && !parent.dataset.shortsBlocked) {
      parent.dataset.shortsBlocked = '1';
      parent.style.setProperty('display', 'none', 'important');
    }
  }


  function redirectShortsUrl() {
    const match = location.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const videoId = match[1];
      const search = location.search || '';
      window.location.replace(`https://www.youtube.com/watch?v=${videoId}${search ? '&' + search.slice(1) : ''}`);
    }
  }

  function sweep() {
    SHORTS_SELECTORS.forEach(sel => {
      try {
        document.querySelectorAll(sel).forEach(hideElement);
      } catch (_) {
        
      }
    });
    redirectShortsUrl();
  }

  
  sweep();

  
  const observer = new MutationObserver(() => sweep());
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  
  window.addEventListener('yt-navigate-finish', sweep);
  window.addEventListener('popstate', () => {
    setTimeout(sweep, 300); 
  });
})();
