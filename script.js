document.addEventListener("DOMContentLoaded", function () {
  const filter = document.getElementById("categoryFilter");
  const rows = document.querySelectorAll("table tbody tr");

  filter.addEventListener("change", function () {
    const selected = this.value;

    rows.forEach((row) => {
      const category = row.getAttribute("data-category");

      if (selected === "All" || category === selected) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});
