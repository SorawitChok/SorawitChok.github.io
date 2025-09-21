// Dark mode functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const themeText = themeToggle.querySelector(".theme-text");
const themeHeader = document.querySelector("header");
const html = document.documentElement;

// Check for saved theme preference or default to system preference
function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Set theme
function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
    themeText.textContent = "Light";
  } else {
    themeIcon.className = "fas fa-moon";
    themeText.textContent = "Dark";
  }
}

// Initialize theme
setTheme(getPreferredTheme());

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  const currentHeaderTheme = themeHeader.style.background;
  if (newTheme === "dark") {
    themeHeader.style.background = "rgba(26, 32, 44, 0.95)";
  } else {
    themeHeader.style.background = "rgba(255, 255, 255, 0.95)";
  }
  setTheme(newTheme);
});

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const headerOffset = 80; // adjust this to match your sticky header height
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Add scroll effect to navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector("header");
  const currentTheme = html.getAttribute("data-theme");

  if (window.scrollY > 100) {
    if (currentTheme === "dark") {
      navbar.style.background = "rgba(26, 32, 44, 0.98)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
    }
  } else {
    if (currentTheme === "dark") {
      navbar.style.background = "rgba(26, 32, 44, 0.95)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});
