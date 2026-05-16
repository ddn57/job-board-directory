document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const rows = document.querySelectorAll("table tbody tr");

  /* --- 1. Real-time Search --- */
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
      });
    });
  }

  /* --- 2. Dynamic Fly-in Animation --- */
  // This automatically makes rows fly in one by one on every page
  rows.forEach((row, index) => {
    row.style.animationDelay = `${index * 0.05}s`;
  });

  /* --- 3. Cookie Management (Shared across all pages) --- */
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + value + "; expires=" + expires + "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
  }

  const banner = document.getElementById("cookie-banner");
  if (!getCookie("analytics_consent") && banner) {
    banner.style.display = "block";
  }

  // Add click events for your cookie buttons here (reuse your old button IDs)
  const acceptAllBtn = document.getElementById("accept-all");
  if (acceptAllBtn) {
    acceptAllBtn.onclick = function() {
      setCookie("analytics_consent", "accepted", 180);
      banner.style.display = "none";
    };
  }
});