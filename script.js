document.addEventListener("DOMContentLoaded", function () {
  /* --- Table filter --- */
  const filter = document.getElementById("categoryFilter");
  const rows = document.querySelectorAll("table tbody tr");

  if (filter) {
    filter.addEventListener("change", function () {
      const selected = this.value;
      rows.forEach((row) => {
        const category = row.getAttribute("data-category");
        row.style.display =
          selected === "All" || category === selected ? "" : "none";
      });
    });
  }

  /* --- Cookie management functions --- */
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
      name + "=" + value + "; expires=" + expires + "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }

  /* --- Load Google Analytics --- */
  function loadGA() {
    const GA_ID = "G-ME7Y9G5P5N";
    if (!document.querySelector(`script[src*="${GA_ID}"]`)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      document.head.appendChild(s);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", GA_ID, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      console.log("Google Analytics loaded.");
    }
  }

  /* --- Load Google Ads --- */
  function loadGoogleAds() {
    const ADS_ID = "AW-YYYYYYYYYY"; // replace with your Ads ID
    if (window.gtag && ADS_ID) {
      gtag("config", ADS_ID);
      console.log("Google Ads loaded.");
    }
  }

  /* --- Cookie Banner Logic --- */
  const banner = document.getElementById("cookie-banner");
  const acceptAllBtn = document.getElementById("accept-all");
  const acceptAnalyticsBtn = document.getElementById("accept-analytics");
  const rejectAllBtn = document.getElementById("reject-all");

  const analyticsConsent = getCookie("analytics_consent");
  const adsConsent = getCookie("ads_consent");

  // Show banner if no cookies exist
  if (!analyticsConsent && !adsConsent && banner) {
    banner.style.display = "block";
  }

  // Load scripts if already accepted
  if (analyticsConsent === "accepted") loadGA();
  if (adsConsent === "accepted") loadGoogleAds();

  /* --- Accept All --- */
  if (acceptAllBtn) {
    acceptAllBtn.onclick = function () {
      setCookie("analytics_consent", "accepted", 180);
      setCookie("ads_consent", "accepted", 180);
      banner.style.display = "none";
      loadGA();
      loadGoogleAds();
    };
  }

  /* --- Accept Analytics Only --- */
  if (acceptAnalyticsBtn) {
    acceptAnalyticsBtn.onclick = function () {
      setCookie("analytics_consent", "accepted", 180);
      setCookie("ads_consent", "rejected", 180);
      banner.style.display = "none";
      loadGA();

      // Remove any Ads script if accidentally loaded
      const adsScript = document.querySelector(
        'script[src*="googletagmanager.com/gtag/js?id=AW"]',
      );
      if (adsScript) adsScript.remove();
    };
  }

  /* --- Reject All --- */
  if (rejectAllBtn) {
    rejectAllBtn.onclick = function () {
      setCookie("analytics_consent", "rejected", 180);
      setCookie("ads_consent", "rejected", 180);
      banner.style.display = "none";

      // Remove GA script
      const gaScript = document.querySelector(
        'script[src*="googletagmanager.com/gtag/js"]',
      );
      if (gaScript) gaScript.remove();

      // Remove Ads script
      const adsScript = document.querySelector(
        'script[src*="googletagmanager.com/gtag/js?id=AW"]',
      );
      if (adsScript) adsScript.remove();

      // Override gtag to prevent accidental tracking
      window.gtag = function () {
        console.warn("Analytics disabled due to cookie rejection.");
      };

      console.log("All cookies rejected. Analytics and Ads scripts removed.");
    };
  }
});
