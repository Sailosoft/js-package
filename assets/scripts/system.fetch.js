(function () {
  const originalFetch = System.constructor.prototype.fetch;

  System.constructor.prototype.fetch = function (url, options) {
    // 1. Identify "External" or "Pre-compiled" sources
    const isCDN =
      url.includes("cdnjs.cloudflare.com") ||
      url.includes("cdn.jsdelivr.net") ||
      url.includes("unpkg.com") ||
      url.includes("esm.sh");

    if (isCDN) {
      console.log("Path is CDN: ", url);
      // Use native fetch directly.
      // Note: This assumes the CDN provides standard JS/ESM.
      return fetch(url, options);
    }

    // 2. Fallback to Babel for everything else (Local files, JSX, etc.)
    return originalFetch.apply(this, arguments);
  };
})();
