// header

const navBar = document.querySelector(".navbar");
const navbarToggler = document.querySelector(".navbar-toggler");
const navContainer = document.querySelector(".navbar-nav");
const navItems = document.querySelectorAll(".nav-item");
const navLinks = document.querySelectorAll(".nav-link");
const navBarCollapse = document.querySelector(".navbar-collapse");
const headerContacts = document.querySelector(".header__contacts");
const headerWrapper = document.querySelector(".header__top-wrapper");
const headerButton = document.querySelector(".header__button");
const maxWidthBurger = 1400;
const portfolioButtons = document.querySelector(".portfolio__buttons");
const portfolioButton = document.querySelectorAll(".portfolio__button");
const portfolioFamily = document.querySelector(".portfolio__family-container");
const portfolioPortrait = document.querySelector(".portfolio__portrait-container");

navbarToggler.addEventListener("click", () => {
  const isExpanded = navbarToggler.getAttribute("aria-expanded");
  const isMobile = window.innerWidth < maxWidthBurger;
  const burgerMenu = isExpanded === "true" && isMobile;
  const burgerMenuActive = burgerMenu ? "flex" : "none";

  headerContacts.style.display = burgerMenuActive;
  navBar.classList.toggle("navbar-active", burgerMenu);
  headerWrapper.classList.toggle("header__top-wrapper_active", burgerMenu);
  headerButton.classList.toggle("header__button-toggle", burgerMenu);
});

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  navBar.classList.toggle(
    "scrolled",
    scrollPosition > 0 && window.innerWidth > maxWidthBurger
  );
  headerWrapper.classList.toggle(
    "scrolled",
    scrollPosition > 0 && window.innerWidth < maxWidthBurger
  );
});

const navbarCollapse = new bootstrap.Collapse(navBar, {
  toggle: false,
});

navBar.addEventListener("show.bs.collapse", function () {
  document.body.style.overflow = "hidden";
});

navBar.addEventListener("hidden.bs.collapse", function () {
  document.body.style.overflow = "auto";
});

navItems.forEach(function(item) {
  item.addEventListener("click", function(e) {
    if (window.innerWidth < maxWidthBurger) {
      navbarToggler.click();
      e.preventDefault();
      const targetHref = e.target.getAttribute("href");
      if (targetHref && targetHref.startsWith("#")) {
        const targetId = targetHref.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const elementOffset = targetElement.offsetTop;

          window.scrollTo({
            top: elementOffset,
            behavior: "smooth"
          });
        } else {
          window.location.href = targetHref;
        }
      } else {
        window.location.href = targetHref;
      }
    }
  });
});

navContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-link")) {
    navLinks.forEach((link) => link.classList.remove("link-active"));
    e.target.classList.add("link-active");
    setTimeout(() => {
      e.target.classList.remove('link-active');
    }, 2000);
  }
});

// navLinks.forEach((link) => {
//   const href = link.getAttribute("href");
//   const section = document.querySelector(href);
//   window.addEventListener("scroll", () => {
//     const blockBottom = section.offsetTop + section.offsetHeight;
//     const currentScrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
//     if (currentScrollPos >= blockBottom - 100 || currentScrollPos < section.offsetTop - 100) {
//       link.classList.remove("link-active");
//     } else {
//       link.classList.add("link-active");
//     }
//   });
// });

if (portfolioButtons) {
  portfolioButtons.addEventListener("click", (e) => {
    if (e.target.classList.contains("portfolio__button_portrait")) {
      portfolioButton.forEach((button) => button.classList.remove("active"));
      e.target.classList.add("active");
      portfolioFamily.style.display = 'none';
      portfolioPortrait.style.display = 'flex';
    }
    if (e.target.classList.contains("portfolio__button_family")) {
      portfolioButton.forEach((button) => button.classList.remove("active"));
      e.target.classList.add("active");
      portfolioPortrait.style.display = 'none';
      portfolioFamily.style.display = 'flex';
    }
  })
}


