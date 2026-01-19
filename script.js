document.addEventListener("DOMContentLoaded", function () {
  /* Existing filter logic */
  const filter = document.getElementById("categoryFilter");
  const rows = document.querySelectorAll("table tbody tr");

  filter.addEventListener("change", function () {
    const selected = this.value;
    rows.forEach((row) => {
      const category = row.getAttribute("data-category");
      row.style.display =
        selected === "All" || category === selected ? "" : "none";
    });
  });

  /* Cookie + Consent Logic */

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

  function loadGA() {
    const GA_ID = "G-XXXXXXXXXX"; // replace later

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
  }

  function loadGoogleAds() {
    const ADS_ID = "AW-YYYYYYYYYY"; // future
    if (window.gtag) {
      gtag("config", ADS_ID);
    }
  }

  const analyticsConsent = getCookie("analytics_consent");
  const adsConsent = getCookie("ads_consent");

  const banner = document.getElementById("cookie-banner");
  const acceptAllBtn = document.getElementById("accept-all");
  const acceptAnalyticsBtn = document.getElementById("accept-analytics");
  const rejectAllBtn = document.getElementById("reject-all");

  if (!analyticsConsent && !adsConsent) {
    banner.style.display = "block";
  }

  if (analyticsConsent === "accepted") loadGA();
  if (adsConsent === "accepted") loadGoogleAds();

  acceptAllBtn.onclick = function () {
    setCookie("analytics_consent", "accepted", 180);
    setCookie("ads_consent", "accepted", 180);
    banner.style.display = "none";
    loadGA();
    loadGoogleAds();
  };

  acceptAnalyticsBtn.onclick = function () {
    setCookie("analytics_consent", "accepted", 180);
    setCookie("ads_consent", "rejected", 180);
    banner.style.display = "none";
    loadGA();
  };

  rejectAllBtn.onclick = function () {
    setCookie("analytics_consent", "rejected", 180);
    setCookie("ads_consent", "rejected", 180);
    banner.style.display = "none";
  };
});
