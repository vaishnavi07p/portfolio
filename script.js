const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.querySelector("#contact-form");

function closeMobileMenu() {
  navMenu.classList.remove("open");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    closeMobileMenu();
  }
});

function handleHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", handleHeader);
handleHeader();

function updateActiveNavigation() {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
} else if (prefersDark) {
  document.documentElement.dataset.theme = "dark";
}

function updateThemeIcon() {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeIcon();
});

updateThemeIcon();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow =
        selectedFilter === "all" || categories.includes(selectedFilter);

      card.classList.toggle("hidden-project", !shouldShow);
    });
  });
});

const typingText = document.querySelector("#typing-text");
const typingOptions = [
  "AI & Machine Learning Enthusiast",
  "Electronics & Telecommunication Engineer",
  "Python and Web Developer",
  "Embedded Systems & Robotics Learner",
];

let typingOptionIndex = 0;
let typingCharacterIndex = 0;
let isDeleting = false;

function typeText() {
  const currentText = typingOptions[typingOptionIndex];

  if (isDeleting) {
    typingCharacterIndex -= 1;
  } else {
    typingCharacterIndex += 1;
  }

  typingText.textContent = currentText.slice(0, typingCharacterIndex);

  let delay = isDeleting ? 45 : 75;

  if (!isDeleting && typingCharacterIndex === currentText.length) {
    delay = 1500;
    isDeleting = true;
  } else if (isDeleting && typingCharacterIndex === 0) {
    isDeleting = false;
    typingOptionIndex = (typingOptionIndex + 1) % typingOptions.length;
    delay = 350;
  }

  window.setTimeout(typeText, delay);
}

typeText();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const subject = formData.get("subject").trim();
  const message = formData.get("message").trim();

  const emailBody = [
    `Hello Vaishnavi,`,
    ``,
    message,
    ``,
    `Sender: ${name}`,
    `Email: ${email}`,
  ].join("\n");

  const mailtoLink =
    `mailto:sarkundevaishnavi18@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  window.location.href = mailtoLink;
});

document.querySelector("#current-year").textContent =
  new Date().getFullYear();
