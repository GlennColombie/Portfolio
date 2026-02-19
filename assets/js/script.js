(() => {
  const storageKey = "portfolio-theme";
  const root = document.documentElement;

  function getInitialTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(storageKey, theme);
  }

  function injectThemeToggle() {
    const nav = document.querySelector(".nav");
    if (!nav || nav.querySelector("[data-theme-toggle]")) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("data-theme-toggle", "true");
    button.setAttribute("aria-label", "Toggle light and dark theme");

    const currentTheme = root.getAttribute("data-theme") || "dark";
    button.textContent = currentTheme === "dark" ? "☀️ Light" : "🌙 Dark";

    button.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
      button.textContent = next === "dark" ? "☀️ Light" : "🌙 Dark";
    });

    nav.appendChild(button);
  }

  function markActiveNavLink() {
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href")?.split("/").pop();
      if (!linkPath) {
        return;
      }

      if (
        linkPath === currentPath ||
        (currentPath === "" && linkPath === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  function prioritizeMonitorProject() {
    const projectGrids = document.querySelectorAll(".projects");
    if (!projectGrids.length) {
      return;
    }

    projectGrids.forEach((grid) => {
      const cards = Array.from(grid.querySelectorAll(".project-card"));
      if (cards.length < 2) {
        return;
      }

      const monitorCard = cards.find((card) => {
        const title =
          card.querySelector("h3")?.textContent?.toLowerCase() || "";
        const link = card.querySelector("a")?.getAttribute("href") || "";
        return title.includes("pins monitor") || link.includes("pins.html");
      });

      if (!monitorCard || grid.firstElementChild === monitorCard) {
        return;
      }

      grid.prepend(monitorCard);
    });
  }

  function setupRevealAnimations() {
    const targets = document.querySelectorAll(".project-card, .project-detail");
    if (!targets.length) {
      return;
    }

    targets.forEach((element) => {
      element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
      },
    );

    targets.forEach((target) => observer.observe(target));
  }

  function updateFooterYear() {
    const footerText = document.querySelector("footer p");
    if (!footerText) {
      return;
    }

    const currentYear = String(new Date().getFullYear());
    footerText.textContent = footerText.textContent.replace(
      /\b20\d{2}\b/,
      currentYear,
    );
  }

  setTheme(getInitialTheme());
  injectThemeToggle();
  markActiveNavLink();
  prioritizeMonitorProject();
  setupRevealAnimations();
  updateFooterYear();
})();
