document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const rows = document.querySelectorAll("tbody tr");
  const chips = document.querySelectorAll(".chip");
  const themeToggle = document.getElementById("themeToggle");
  const privacyBanner = document.getElementById("privacyBanner");
  const acceptBtn = document.getElementById("acceptPrivacy");
  const rejectBtn = document.getElementById("rejectPrivacy");

  // 1. Theme Logic
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

  // 2. Privacy Choice Logic
  if (privacyBanner && !localStorage.getItem("privacyChoice")) {
    setTimeout(() => privacyBanner.classList.add("show"), 1000);
  }
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("privacyChoice", "accepted");
      privacyBanner.classList.remove("show");
    });
  }
  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      localStorage.setItem("privacyChoice", "rejected");
      privacyBanner.classList.remove("show");
    });
  }

  // 3. Filter Logic
  function filterJobs() {
    const query = searchInput.value.toLowerCase();
    const activeChip = document.querySelector(".chip.active");
    const category = activeChip.getAttribute("data-filter").toLowerCase();

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
