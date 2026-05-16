document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const rows = document.querySelectorAll("tbody tr");
  const chips = document.querySelectorAll(".chip");
  const themeToggle = document.getElementById("themeToggle");

  // 1. Dark Mode Toggle
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      let newTheme = theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // 2. Search Functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      filterJobs(query, null);
    });
  }

  // 3. Category Chip Filtering
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const category = chip.getAttribute("data-filter");
      filterJobs(searchInput.value.toLowerCase(), category);
    });
  });

  function filterJobs(query, category) {
    rows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      const focus = row
        .querySelector('[data-label="Focus"]')
        .innerText.toLowerCase();

      const matchesSearch = text.includes(query);
      const matchesCategory =
        !category ||
        category === "all" ||
        focus.includes(category.toLowerCase());

      if (matchesSearch && matchesCategory) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
});
