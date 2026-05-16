document.addEventListener("DOMContentLoaded", () => {
  // --- SELECTIONS ---
  const themeToggle = document.getElementById("themeToggle");
  const privacyBanner = document.getElementById("privacyBanner");
  const acceptBtn = document.getElementById("acceptPrivacy");
  const rejectBtn = document.getElementById("rejectPrivacy");
  const searchInput = document.getElementById("searchInput");
  const rows = document.querySelectorAll("tbody tr");
  const chips = document.querySelectorAll(".chip");

  // --- 1. TRACKING GATEKEEPER ---
  function loadTracking() {
    console.log("Privacy: User Accepted. Loading Analytics...");

    const gaID = "G-ME7Y9G5P5N";

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", gaID);
  }

  // --- 2. PRIVACY CHOICE LOGIC ---
  const choice = localStorage.getItem("privacyChoice");
  if (choice === "accepted") {
    loadTracking();
  } else if (!choice) {
    setTimeout(() => privacyBanner.classList.add("show"), 1000);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("privacyChoice", "accepted");
      privacyBanner.classList.remove("show");
      loadTracking();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      localStorage.setItem("privacyChoice", "rejected");
      privacyBanner.classList.remove("show");
      console.log("Privacy: User Rejected Tracking.");
    });
  }

  // --- 3. THEME LOGIC ---
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "dark"
          : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // --- 4. FILTER/SEARCH LOGIC ---
  function filterJobs() {
    const query = searchInput.value.toLowerCase();
    const category = document
      .querySelector(".chip.active")
      .getAttribute("data-filter")
      .toLowerCase();

    rows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      const focus = row
        .querySelector('[data-label="Focus"]')
        .innerText.toLowerCase();
      const matchesSearch = text.includes(query);
      const matchesCategory = category === "all" || focus.includes(category);
      row.style.display = matchesSearch && matchesCategory ? "" : "none";
    });
  }

  if (searchInput) searchInput.addEventListener("input", filterJobs);
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      filterJobs();
    });
  });
});
