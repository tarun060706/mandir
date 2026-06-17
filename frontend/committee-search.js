document.querySelectorAll(".committee-section").forEach((section) => {
  const searchInput = section.querySelector(".search-box input");
  const yearFilter = section.querySelector(".year-filter");
  const memberCards = Array.from(section.querySelectorAll(".member-card"));
  const membersGrid = section.querySelector(".members-grid");

  if (!searchInput || !memberCards.length || !membersGrid) return;

  const emptyMessage = document.createElement("p");
  emptyMessage.className = "committee-empty-message";
  emptyMessage.textContent = "No members found. Try another name, role, or keyword.";
  emptyMessage.style.display = "none";
  membersGrid.after(emptyMessage);

  searchInput.setAttribute("autocomplete", "off");
  searchInput.setAttribute("aria-label", "Search committee members");
  if (yearFilter) {
    yearFilter.setAttribute("aria-label", "Filter committee members by year");
  }

  const filterMembers = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedYear = yearFilter ? yearFilter.value : "";
    let visibleCount = 0;

    memberCards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();
      const cardYear = card.dataset.year || "";
      const isSearchMatch = cardText.includes(searchTerm);
      const isYearMatch = !selectedYear || cardYear === selectedYear;
      const isMatch = isSearchMatch && isYearMatch;

      card.hidden = !isMatch;
      if (isMatch) visibleCount += 1;
    });

    emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
  };

  searchInput.addEventListener("input", filterMembers);
  if (yearFilter) {
    yearFilter.addEventListener("change", filterMembers);
  }
});
