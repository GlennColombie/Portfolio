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

  function createProjectCard(project, inPagesDirectory) {
    const article = document.createElement("article");
    article.className = "project-card";

    if (project.image) {
      const image = document.createElement("img");
      image.src = inPagesDirectory
        ? `../assets/images/${project.image}`
        : `./assets/images/${project.image}`;
      image.alt = `${project.title} preview`;
      article.appendChild(image);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "project-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.textContent = project.placeholder || "✨";
      article.appendChild(placeholder);
    }

    const body = document.createElement("div");
    body.className = "project-body";

    const heading = document.createElement("h3");
    heading.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const link = document.createElement("a");
    link.href = inPagesDirectory
      ? `./${project.slug}.html`
      : `./pages/${project.slug}.html`;
    link.textContent = project.cta;

    body.append(heading, description, link);
    article.appendChild(body);
    return article;
  }

  async function renderProjectsFromData() {
    const containers = document.querySelectorAll(
      ".projects[data-project-source]",
    );
    if (!containers.length) {
      return;
    }

    const inPagesDirectory = window.location.pathname.includes("/pages/");
    const source = inPagesDirectory
      ? "../assets/data/projects.json"
      : "./assets/data/projects.json";

    try {
      const response = await fetch(source);
      if (!response.ok) {
        return;
      }

      const projects = await response.json();
      if (!Array.isArray(projects) || !projects.length) {
        return;
      }

      containers.forEach((container) => {
        const filter = container.getAttribute("data-filter") || "all";
        const data =
          filter === "featured"
            ? projects.filter((project) => project.featured)
            : projects;

        if (!data.length) {
          return;
        }

        container.innerHTML = "";
        data.forEach((project) => {
          container.appendChild(createProjectCard(project, inPagesDirectory));
        });
      });
    } catch {
      // Keep static HTML fallback if JSON fetch fails.
    }
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

  function wireContactFormFallback() {
    const form = document.querySelector("form[data-mail-fallback]");
    if (!form) {
      return;
    }

    form.addEventListener("submit", (event) => {
      const action = form.getAttribute("action") || "";
      if (!action.includes("your-form-id")) {
        return;
      }

      event.preventDefault();
      const mail = form.getAttribute("data-mail-fallback") || "";
      const name = form.querySelector("#name")?.value?.trim() || "";
      const email = form.querySelector("#email")?.value?.trim() || "";
      const message = form.querySelector("#message")?.value?.trim() || "";

      const subject = encodeURIComponent(
        `Portfolio contact from ${name || "visitor"}`,
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      );
      window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    });
  }

  async function init() {
    setTheme(getInitialTheme());
    injectThemeToggle();
    markActiveNavLink();
    await renderProjectsFromData();
    prioritizeMonitorProject();
    setupRevealAnimations();
    wireContactFormFallback();
    updateFooterYear();
  }

  init();
})();
