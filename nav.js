document.querySelectorAll(".navbar").forEach((navbar) => {
  const button = navbar.querySelector(".mobile-menu-btn");
  const links = navbar.querySelector(".nav-links");

  if (!button || !links) return;

  const closeMenu = () => {
    navbar.classList.remove("menu-open");
    navbar.querySelectorAll(".dropdown-open").forEach((dropdown) => {
      dropdown.classList.remove("dropdown-open");
    });
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("menu-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
        const dropdown = link.closest(".dropdown");
        if (dropdown) {
          dropdown.classList.toggle("dropdown-open");
        }
        return;
      }

      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
});
