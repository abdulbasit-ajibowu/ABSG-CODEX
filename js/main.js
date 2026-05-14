function initializeCarousels() {
  if (!window.jQuery || !jQuery.fn.owlCarousel) {
    return;
  }

  jQuery(".hero-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoHeight: false,
    autoplay: true,
    autoplayTimeout: 5500,
    autoplayHoverPause: true,
    smartSpeed: 650,
    touchDrag: true,
    mouseDrag: true,
    pullDrag: true
  });

  jQuery(".birthday-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoHeight: true,
    autoplay: false
  });

  jQuery(".birthday-mobile-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoHeight: true,
    autoplay: false,
    touchDrag: true,
    mouseDrag: true
  });

  jQuery(".gallery-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoplay: false
  });

  jQuery(".events-carousel").owlCarousel({
    loop: false,
    dots: false,
    nav: false,
    margin: 14,
    responsive: {
      0: { items: 1 },
      992: { items: 1.22 }
    }
  });

  jQuery(".appointee-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoplay: false
  });

  jQuery(".quote-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoplay: false
  });

  setupCarouselDots(".hero-carousel", '[data-carousel-dots="hero"]');
  setupCarouselDots(".birthday-carousel", '[data-carousel-dots="birthday"]');
  setupCarouselDots(".birthday-mobile-carousel", '[data-carousel-dots="birthday-mobile"]');
  setupCarouselDots(".gallery-carousel", '[data-carousel-dots="gallery"]');
  setupCarouselDots(".events-carousel", '[data-carousel-dots="events"]');
  setupCarouselDots(".appointee-carousel", '[data-carousel-dots="appointee"]');
  setupCarouselDots(".quote-carousel", '[data-carousel-dots="quote"]');
}

function setupCarouselDots(carouselSelector, dotsSelector) {
  const $carousel = jQuery(carouselSelector);
  const $dots = jQuery(dotsSelector);

  if (!$carousel.length || !$dots.length) {
    return;
  }

  const totalSlides = $carousel.find(".owl-item:not(.cloned)").length;

  if (!totalSlides) {
    return;
  }

  $dots.empty();

  for (let index = 0; index < totalSlides; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "carousel-dot";
    button.setAttribute("aria-label", `Go to slide ${index + 1}`);
    button.addEventListener("click", () => {
      $carousel.trigger("to.owl.carousel", [index, 300, true]);
    });
    $dots.append(button);
  }

  const syncDots = (event) => {
    const currentIndex = event.relatedTarget.relative(event.relatedTarget.current());
    $dots.find(".carousel-dot").removeClass("active").eq(currentIndex).addClass("active");
  };

  $carousel.on("initialized.owl.carousel changed.owl.carousel", syncDots);
  $dots.find(".carousel-dot").eq(0).addClass("active");
}

function initializeNavigation() {
  const megaItem = document.querySelector(".nav-item-mega");
  const desktopToggle = document.querySelector(".ministries-toggle");
  const mobileToggle = document.querySelector(".mobile-sub-toggle");
  const siteNav = document.querySelector("#siteNav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav-list .nav-link"));

  if (!megaItem || !desktopToggle || !navLinks.length) {
    return;
  }

  const setActiveLink = (targetLink) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link === targetLink);
    });
  };

  const setMenuState = (isOpen) => {
    megaItem.classList.toggle("is-open", isOpen);
    desktopToggle.setAttribute("aria-expanded", String(isOpen));
    if (mobileToggle) {
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      mobileToggle.innerHTML = isOpen ? '<i class="bi bi-chevron-up"></i>' : '<i class="bi bi-chevron-down"></i>';
    }
  };

  const toggleMenu = (event) => {
    if (event) {
      event.preventDefault();
    }

    setActiveLink(desktopToggle);
    setMenuState(!megaItem.classList.contains("is-open"));
  };

  const matchingLink = navLinks.find((link) => link.getAttribute("href") === window.location.hash);

  if (siteNav) {
    siteNav.classList.remove("show");
  }

  setActiveLink(matchingLink || navLinks[0]);
  setMenuState(false);

  desktopToggle.addEventListener("click", toggleMenu);

  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    if (link === desktopToggle) {
      return;
    }

    link.addEventListener("click", () => {
      setActiveLink(link);
      setMenuState(false);
    });
  });
}

document.addEventListener("partials:loaded", () => {
  initializeNavigation();
  initializeCarousels();
});
