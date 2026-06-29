# CLAUDE.md — ABSG-CODEX

## Project Identity

**Abia State Government Intranet Portal** — a static frontend-only website for Abia State Government employees. No build system, no backend, no framework.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (single `index.html` + 2 partials) |
| Styling | Plain CSS (`css/navigation.css`, `css/footer.css`, `css/style.css`) |
| Scripting | Vanilla JS (`js/include-partials.js`, `js/main.js`) |
| UI Library | Bootstrap 5.3.3 |
| Carousel | Bootstrap Carousel (built into Bootstrap 5.3.3) |
| Icons | Bootstrap Icons 1.11.3 |
| Font | Instrument Sans (Google Fonts — 400, 500, 600, 700) |
| Dev Server | Node.js static server (`dev-server.js`) on `http://127.0.0.1:4173` |

---

## Running the Dev Server

```bash
node dev-server.js
```

Serves from project root at `http://127.0.0.1:4173`. No install needed — pure Node.js `http` module.

CSS and JS files use cache-bust query strings (e.g. `?v=20260514c`). Update this version string whenever styles or scripts change.

---

## File Structure

```
ABSG-CODEX/
├── index.html                  # Main and only page
├── dev-server.js               # Local static server (port 4173)
├── agents.md                   # AI design-slicing workflow rules
├── CLAUDE.md                   # This file
├── css/
│   ├── navigation.css          # Nav bar + mega menu + mobile menu
│   ├── footer.css              # Footer 4-column grid
│   └── style.css               # All other styles (~2,200 lines)
├── js/
│   ├── include-partials.js     # Fetches & injects partials via [data-include]
│   └── main.js                 # Bootstrap Carousel init + navigation logic
├── partials/
│   ├── navigation.html         # Site header/nav (injected at top of body)
│   └── footer.html             # Site footer (injected at bottom)
├── assets/
│   └── images/                 # All icons, photos, app logos (~65 files)
└── design/                     # Visual reference screenshots (source of truth)
    ├── Home.png                 # Desktop homepage design
    ├── mobileHome.png           # Mobile homepage design
    ├── Abia Nav.png             # Desktop navigation design
    └── Abia Nav Mobile.png      # Mobile navigation design
```

---

## Page Architecture

Partials are loaded dynamically by `include-partials.js`. It finds all `[data-include]` elements, fetches the HTML file, and inserts the content. All carousel and navigation JS initializes only after the `partials:loaded` event fires.

### Page Sections (top → bottom)

1. **Navigation** (`partials/navigation.html` + `css/navigation.css`)
   - Sticky header, brand logo, ministry mega-menu, search, notifications, profile
   - Mobile: hamburger menu, ministry accordion, bottom utility buttons

2. **Hero** (`css/style.css` — `.hero-section`)
   - Bootstrap Carousel (2 slides, id `heroCarousel`), birthday sidebar panel, stats dashboard, announcement ticker

3. **Content Grid** (`.content-grid`) — 11 card sections:
   - News & Updates, Applications (16 tiles), Birthday Card (mobile), Governor's Corner, Gallery, Events, New Appointees, Downloads, Support, Government in Numbers, Quick Links

4. **Footer** (`partials/footer.html` + `css/footer.css`)
   - 4 columns: Quick Access, Resources & Guides, Contact Info, Social Media

---

## Brand / Design Tokens

| Token | Value |
|---|---|
| Primary green | `#0b8743` |
| Primary red | `#b91d31` |
| Background green (light) | `#f0f6ea` |
| Dark ink | `#212529` |
| Muted text | `#65716b` |
| Border radius (cards) | `12px` |
| Font family | `Instrument Sans, sans-serif` |

---

## Design Workflow (from agents.md)

The `/design` folder is the **single source of truth**. All UI changes must be verified against it.

**Mandatory workflow for any design fix:**
1. Identify the relevant design file in `/design/`
2. Start the dev server (`node dev-server.js`)
3. Screenshot the current rendered page in a browser
4. Compare screenshot vs. design — list mismatches by: spacing, typography, colors, layout, images/icons, responsiveness
5. Fix only the listed mismatches
6. Re-screenshot and confirm what now matches
7. Report: what matches, what still doesn't, exact files changed

**A task is never complete without rendered visual verification.** Code inspection alone is not sufficient.

---

## Key Conventions

- **No build step.** Edit files directly; refresh the browser.
- **CSS files are independent.** `navigation.css` only touches nav, `footer.css` only touches the footer. All other styles live in `style.css`.
- **Cache-bust version strings** (`?v=YYYYMMDD`) must be updated on every CSS/JS change to force browser refresh.
- **Partials are plain HTML fragments** — no templating syntax. They are fetched and innerHTML'd verbatim.
- **No comments in code** unless the WHY is non-obvious (hidden constraint, workaround, subtle invariant).
- **Do not modify unrelated sections** when fixing a specific mismatch.
- **Do not introduce new libraries** without explicit instruction.
- **Always use Bootstrap Carousel** for any slide/carousel component. Do not add Owl Carousel or any other carousel library. Bootstrap Carousel is already available via `bootstrap.Carousel` in JS and `data-bs-*` attributes in HTML.
- **Carousel structure:** wrap slides in `<div class="carousel-inner">`, each slide in `<div class="carousel-item">` (first gets `active`), outer container gets `id`, `class="carousel slide"`, and `data-bs-*` config attributes. Custom dot indicators use `.carousel-dot` buttons wired via `setupCarouselDots()` in `main.js`.
