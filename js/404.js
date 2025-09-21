// Dark mode functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const themeText = themeToggle.querySelector(".theme-text");
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

// Add some fun interactions
document.querySelector(".error-icon").addEventListener("click", function () {
  this.style.animation = "none";
  setTimeout(() => {
    this.style.animation = "bounce 2s infinite";
  }, 10);
});
