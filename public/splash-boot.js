/*! Midex splash boot — runs before paint via next/script beforeInteractive. */
(function () {
  try {
    var seen = sessionStorage.getItem("midex-splash-seen") === "1";
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      document.documentElement.classList.remove("midex-splash-pending");
    }
  } catch (e) {
    document.documentElement.classList.remove("midex-splash-pending");
  }
})();
