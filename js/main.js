function activateFirst(el) {
  el.querySelector('.carousel-item').classList.add('active');
}

function addMouseDrag(el, onNext, onPrev) {
  let startX = 0;
  let dragging = false;
  el.addEventListener('mousedown', e => {
    startX = e.clientX;
    dragging = true;
    el.style.cursor = 'grabbing';
  });
  el.addEventListener('mousemove', e => { if (dragging) e.preventDefault(); });
  el.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    el.style.cursor = '';
    const d = startX - e.clientX;
    if (Math.abs(d) > 40) (d > 0 ? onNext : onPrev)();
  });
  el.addEventListener('mouseleave', () => {
    dragging = false;
    el.style.cursor = '';
  });
}

function buildIndicators(dotsContainer, carouselId, total) {
  dotsContainer.innerHTML = '';
  if (total <= 1) {
    dotsContainer.style.display = 'none';
    return;
  }
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-bs-target', '#' + carouselId);
    btn.setAttribute('data-bs-slide-to', String(i));
    btn.setAttribute('aria-label', 'Slide ' + (i + 1));
    if (i === 0) { btn.classList.add('active'); btn.setAttribute('aria-current', 'true'); }
    dotsContainer.appendChild(btn);
  }
}

function initializeCarousels() {
  const heroEl = document.getElementById('heroCarousel');
  if (heroEl) {
    activateFirst(heroEl);
    const heroTotal = heroEl.querySelectorAll('.carousel-item').length;
    const heroDots = heroEl.querySelector('.hero-dots');
    if (heroDots) buildIndicators(heroDots, 'heroCarousel', heroTotal);
    const hc = new bootstrap.Carousel(heroEl, {
      interval: 5500,
      ride: heroTotal > 1,
      wrap: heroTotal > 1,
      pause: 'hover',
      touch: true
    });
    if (heroTotal > 1) addMouseDrag(heroEl, () => hc.next(), () => hc.prev());
  }

  const galleryEl = document.getElementById('galleryCarousel');
  if (galleryEl) {
    activateFirst(galleryEl);
    const galleryTotal = galleryEl.querySelectorAll('.carousel-item').length;
    const galleryDots = galleryEl.querySelector('.gallery-dots');
    if (galleryDots) buildIndicators(galleryDots, 'galleryCarousel', galleryTotal);
    const gc = new bootstrap.Carousel(galleryEl, { ride: false, wrap: galleryTotal > 1, touch: galleryTotal > 1 });
    if (galleryTotal > 1) addMouseDrag(galleryEl, () => gc.next(), () => gc.prev());
  }

  initEventsCarousel();
  initAppointeeCarousel();
}

function initAppointeeCarousel() {
  const el = document.getElementById('appointeeCarousel');
  if (!el) return;

  activateFirst(el);

  const items = el.querySelectorAll('.carousel-item');
  const total = items.length;

  const dotsContainer = el.closest('section')?.querySelector('.appointee-dots');
  if (dotsContainer) buildIndicators(dotsContainer, 'appointeeCarousel', total);

  const carousel = new bootstrap.Carousel(el, { ride: false, wrap: total > 1, touch: true });
  if (total > 1) addMouseDrag(el, () => carousel.next(), () => carousel.prev());
}

function initEventsCarousel() {
  const el = document.getElementById('eventsCarousel');
  if (!el) return;

  const inner = el.querySelector('.carousel-inner');
  const origItems = Array.from(inner.querySelectorAll('.carousel-item'));
  const total = origItems.length;
  const dotsContainer = document.querySelector('.events-dots');

  // Rebuild dots to match actual slide count
  let dots = [];
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    if (total <= 1) {
      dotsContainer.style.display = 'none';
    } else {
      origItems.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'carousel-dot';
        btn.setAttribute('data-slide-to', String(i));
        btn.setAttribute('aria-label', `Slide ${i + 1}`);
        dotsContainer.appendChild(btn);
        dots.push(btn);
      });
    }
  }

  // Single item — nothing to slide
  if (total <= 1) {
    if (total === 1) {
      origItems[0].classList.add('active');
      const peek = Math.abs(parseFloat(getComputedStyle(el).marginLeft) || 0) || 28;
      inner.style.transform = `translateX(${peek}px)`;
      window.addEventListener('resize', () => {
        const p = Math.abs(parseFloat(getComputedStyle(el).marginLeft) || 0) || 28;
        inner.style.transform = `translateX(${p}px)`;
      });
    }
    return;
  }

  let current = 0;
  let busy = false;

  // Prepend clone of last, append clone of first for infinite wrap
  const cloneFirst = origItems[0].cloneNode(true);
  const cloneLast = origItems[total - 1].cloneNode(true);
  cloneFirst.setAttribute('aria-hidden', 'true');
  cloneLast.setAttribute('aria-hidden', 'true');
  inner.insertBefore(cloneLast, origItems[0]);
  inner.appendChild(cloneFirst);

  function metrics() {
    const itemW = origItems[0].offsetWidth;
    const peek = Math.abs(parseFloat(getComputedStyle(el).marginLeft) || 0) || 28;
    const gap = parseFloat(getComputedStyle(inner).columnGap) || 0;
    return { itemW, peek, gap };
  }

  function snap(position, animate) {
    const { itemW, peek, gap } = metrics();
    const tx = peek - position * (itemW + gap);
    if (!animate) {
      inner.style.transition = 'none';
      inner.style.transform = `translateX(${tx}px)`;
      inner.getBoundingClientRect();
      inner.style.transition = '';
    } else {
      inner.style.transform = `translateX(${tx}px)`;
    }
  }

  function syncDots() {
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goNext() {
    if (busy) return;
    if (current === total - 1) {
      busy = true;
      current = 0;
      syncDots();
      snap(total + 1, true);
      setTimeout(() => { snap(1, false); busy = false; }, 420);
    } else {
      current += 1;
      syncDots();
      snap(current + 1, true);
    }
  }

  function goPrev() {
    if (busy) return;
    if (current === 0) {
      busy = true;
      current = total - 1;
      syncDots();
      snap(0, true);
      setTimeout(() => { snap(total, false); busy = false; }, 420);
    } else {
      current -= 1;
      syncDots();
      snap(current + 1, true);
    }
  }

  function goTo(index) {
    if (busy || index === current) return;
    current = ((index % total) + total) % total;
    syncDots();
    snap(current + 1, true);
  }

  origItems[0].classList.add('active');
  snap(1, false);
  syncDots();

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch swipe
  let startX = 0;
  el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const d = startX - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) (d > 0 ? goNext : goPrev)();
  });

  // Mouse drag
  addMouseDrag(el, goNext, goPrev);

  window.addEventListener('resize', () => snap(current + 1, false));
}

function initializeNavigation() {
  const megaItem = document.querySelector(".nav-item-mega");
  const desktopToggle = document.querySelector(".ministries-toggle");
  const mobileToggle = document.querySelector(".mobile-sub-toggle");
  const siteNav = document.querySelector("#siteNav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav-list .nav-item:not(.nav-item-mega) .nav-link"));

  if (!megaItem || !desktopToggle || !navLinks.length) return;

  if (megaItem.dataset.navBound) return;
  megaItem.dataset.navBound = "1";

  const setActiveLink = (targetLink) => {
    navLinks.forEach((link) => link.classList.toggle("active", link === targetLink));
    desktopToggle.classList.toggle("active", targetLink === desktopToggle);
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
    if (event) event.preventDefault();
    setActiveLink(desktopToggle);
    setMenuState(!megaItem.classList.contains("is-open"));
  };

  function toPath(href) {
    try {
      return new URL(href, window.location.origin).pathname.replace(/\/$/, "");
    } catch (e) {
      return href.replace(/\/$/, "");
    }
  }

  const currentPath = window.location.pathname.replace(/\/$/, "");

  const matchingLink = navLinks.find((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return false;
    return toPath(href) === currentPath;
  });

  const ministryGridLinks = Array.from(document.querySelectorAll(".ministries-grid a"));
  const isMdasPage = !matchingLink && ministryGridLinks.some((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return false;
    return toPath(href) === currentPath;
  });

  if (siteNav) siteNav.classList.remove("show");

  if (isMdasPage) {
    setActiveLink(desktopToggle);
    const matchingGridLinks = ministryGridLinks.filter((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return false;
      return toPath(href) === currentPath;
    });
    if (matchingGridLinks.length === 1) {
      matchingGridLinks[0].classList.add("active");
    }
  } else {
    setActiveLink(matchingLink || null);
  }
  setMenuState(false);

  desktopToggle.addEventListener("click", toggleMenu);
  if (mobileToggle) mobileToggle.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
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
