function initializeCarousels() {
  if (!window.jQuery || !jQuery.fn.owlCarousel) {
    return;
  }

  jQuery(".hero-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000
  });

  jQuery(".birthday-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 4500
  });

  jQuery(".events-carousel").owlCarousel({
    loop: false,
    dots: true,
    nav: false,
    margin: 16,
    responsive: {
      0: { items: 1 },
      992: { items: 2 }
    }
  });

  jQuery(".appointee-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    nav: false
  });
}

function initializeNavigation() {
  const megaItem = document.querySelector(".nav-item-mega");
  const desktopToggle = document.querySelector(".ministries-toggle");
  const mobileToggle = document.querySelector(".mobile-sub-toggle");

  if (!megaItem || !desktopToggle) {
    return;
  }

  const openMenu = () => {
    megaItem.classList.add("is-open");
    if (mobileToggle) {
      mobileToggle.setAttribute("aria-expanded", "true");
      mobileToggle.innerHTML = '<i class="bi bi-chevron-up"></i>';
    }
  };

  const closeMenu = () => {
    megaItem.classList.remove("is-open");
    if (mobileToggle) {
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.innerHTML = '<i class="bi bi-chevron-down"></i>';
    }
  };

  const toggleMenu = () => {
    if (megaItem.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (window.innerWidth >= 1200) {
    closeMenu();
  } else {
    openMenu();
  }

  desktopToggle.addEventListener("click", (event) => {
    if (window.innerWidth < 1200) {
      event.preventDefault();
      toggleMenu();
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleMenu);
  }

  document.addEventListener("click", (event) => {
    if (window.innerWidth >= 1200 && !megaItem.contains(event.target)) {
      closeMenu();
    }
  });

  megaItem.addEventListener("mouseenter", () => {
    if (window.innerWidth >= 1200) {
      openMenu();
    }
  });

  megaItem.addEventListener("mouseleave", () => {
    if (window.innerWidth >= 1200) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

document.addEventListener("partials:loaded", () => {
  initializeNavigation();
  initializeCarousels();
});
