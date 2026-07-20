export const SPLASH_STORAGE_KEY = "midex-splash-seen";
export const SPLASH_PENDING_CLASS = "midex-splash-pending";

/** Inline boot script — runs in <head> before first paint. */
export const SPLASH_BOOT_SCRIPT = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(SPLASH_STORAGE_KEY)})==="1")return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.classList.add(${JSON.stringify(SPLASH_PENDING_CLASS)});}catch(e){}})();`;
