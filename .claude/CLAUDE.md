# CLAUDE.md — Personal Portfolio Website

## Project Overview

Build a stunning personal portfolio website with a **dark wilderness / terrain aesthetic** — forest greens, night sky blacks, mountain silhouettes, river tones. The owner is a professional software/data engineer with experience at **Thomson Reuters**, **LSEG (London Stock Exchange Group)**, and **BOLT US Insurance** — and also a JEE Advanced qualifier, 10th & 12th topper, AI/ML/NLP/IoT engineer, stock trader, graphics designer, and adventure enthusiast (forests, rivers, mountains, calves).

The site must feel like exploring terrain — layered, atmospheric, alive — while also projecting serious professional credibility.

---

## Tech Stack

- **Pure HTML + CSS + Vanilla JavaScript** (no frameworks, no build tools)
- Single `index.html` entry point
- Separate `css/style.css` for all styles
- Separate `js/main.js` for all interactivity
- `images/` folder where the owner drops their own photos
- `pages/` folder for section sub-pages if needed

---

## File Structure

```
portfolio/
├── CLAUDE.md
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── hero/          ← slideshow photos go here (hero-1.jpg, hero-2.jpg ...)
│   ├── gallery/       ← adventure/nature photos
│   ├── projects/      ← project screenshots
│   ├── companies/     ← company logos (thomson-reuters.png, lseg.png, bolt.png)
│   └── design/        ← graphics design work samples
└── pages/
    ├── projects.html
    ├── experience.html
    ├── gallery.html
    ├── trading.html
    └── contact.html
```

---

## Navigation Tabs (in order)

```
Base Camp  |  Journey  |  Expeditions  |  Gallery  |  Market  |  Studio  |  Contact
```

- **Base Camp** — Hero + About
- **Journey** — Professional work experience (Thomson Reuters, LSEG, BOLT)
- **Expeditions** — Personal tech projects
- **Gallery** — Adventure photography
- **Market** — Stock trading
- **Studio** — Graphics design work
- **Contact** — Form where visitors enter their name and ask questions

---

## Hero Section — Auto-Sliding Fullscreen Carousel

The homepage hero must be a **fullscreen photo slideshow** — the most important visual element.

### Behavior
- Photos slide in **one by one**, auto-advancing every **4 seconds**
- Transition: smooth **crossfade** (opacity 1.2s ease-in-out)
- On hover over hero area, **pause** the slideshow
- Dot indicators at bottom show active slide
- Left/right **arrow buttons** for manual navigation
- Works with **any number of images** in `images/hero/`

### Image Array (editable by owner)
```js
// js/main.js — owner adds image filenames here
const heroImages = [
  'images/hero/hero-1.jpg',
  'images/hero/hero-2.jpg',
  'images/hero/hero-3.jpg',
  'images/hero/hero-4.jpg',
  'images/hero/hero-5.jpg',
];
```

### Hero Overlay Layers (bottom to top)
1. The photo itself (full bleed, cover)
2. Dark overlay: `rgba(0,0,0,0.45)`
3. SVG mountain/forest silhouette at the bottom edge
4. Hero text: name, animated typewriter tagline, company badges, scroll hint

### Hero Text Content
```
[Large display] Your Name
[Typewriter]    "Thomson Reuters Alumni · LSEG Engineer · BOLT Insurance · Explorer."
[Sub line]      Bihar, India — AI/ML · Python · Java · Stock Trader · JEE Advanced
[Company row]   [Thomson Reuters badge] [LSEG badge] [BOLT badge]
```

The company name pills in the hero are a key visual — styled as small frosted badges with subtle glow. They immediately signal professional credibility to anyone landing on the page.

### CSS for Carousel
```css
.hero { position: relative; height: 100vh; overflow: hidden; }
.hero-slide {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  opacity: 0; transition: opacity 1.2s ease-in-out;
}
.hero-slide.active { opacity: 1; }
```

---

## Visual Design System

### Color Palette
```css
:root {
  --bg-deep:        #080f09;
  --bg-dark:        #0d1a0f;
  --bg-card:        #111e13;
  --bg-surface:     #182a1a;
  --accent-green:   #7dbf78;
  --accent-bright:  #a8d5a2;
  --accent-amber:   #d4a04a;   /* LSEG / finance highlights */
  --accent-blue:    #4a8fbd;   /* Thomson Reuters / tech */
  --accent-red:     #c0392b;   /* BOLT Insurance highlights */
  --text-primary:   #e8f0e9;
  --text-secondary: #8faa90;
  --text-dim:       #4a5e4b;
  --border:         rgba(125, 191, 120, 0.12);
  --border-hover:   rgba(125, 191, 120, 0.3);
}
```

Company accent mapping:
- **Thomson Reuters** → `--accent-blue` (#4a8fbd)
- **LSEG** → `--accent-amber` (#d4a04a)
- **BOLT US Insurance** → `--accent-red` (#c0392b)

### Typography
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
```

- **Hero name / section titles**: `Cormorant Garamond`, 300–400 weight, italic for drama
- **Body / nav / cards**: `Outfit`, 300–400 weight
- **Labels / tech pills / dates / stats**: `DM Mono`, 300 weight

### Background Texture
Layer on `<body>`:
1. Base: `--bg-deep`
2. SVG grain noise texture (subtle, inline base64 or SVG filter)
3. `radial-gradient(ellipse at 50% 40%, rgba(30,60,25,0.4) 0%, transparent 70%)`

---

## Navigation

Fixed top bar, frosted glass on scroll:
```css
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 20px 48px;
  display: flex; justify-content: space-between; align-items: center;
  transition: background 0.3s, border-color 0.3s;
}
.nav.scrolled {
  background: rgba(8, 15, 9, 0.88);
  backdrop-filter: blur(14px);
  border-bottom: 0.5px solid var(--border);
}
```

- Logo: owner initials in `Cormorant Garamond` italic + inline SVG mountain icon
- Nav links (7): Base Camp · Journey · Expeditions · Gallery · Market · Studio · Contact
- Hamburger menu on mobile (`<768px`)
- Active section highlight: `--accent-green` underline via `::after` pseudo-element

---

## Section 1 — Base Camp (About)

Two-column layout:
- **Left**: Portrait photo from `images/about.jpg`, thin green border frame, coordinate label below in `DM Mono` (e.g. `25.5941° N, 85.1376° E — Patna, Bihar`)
- **Right**: Bio + stats row + skills cloud

### Stats (count-up animation on scroll)
```
JEE Advanced Qualified  |  10th & 12th Topper  |  3 Global Companies  |  5+ Tech Domains
```

### Skills Pills (DM Mono, grouped by category)
```
Languages:      Python  Java
AI / ML:        Machine Learning  Deep Learning  NLP  Image Processing
Infrastructure: IoT  REST APIs  Cloud
Finance:        Stock Analysis  TA-Lib  Zerodha
Creative:       Graphics Design  UI/UX
Life:           Trekking  Forest  River  Mountains
```

---

## Section 2 — Journey (Work Experience)

This is the **most professional section** of the site. Design it to impress recruiters and collaborators.

### Layout: Vertical Timeline

A vertical center line with alternating left/right cards. On mobile, collapses to single-column top-to-bottom.

### Company Logo Strip (above timeline)

Before the timeline, show a horizontal strip of company logos at 50% opacity, full opacity on hover. Label: `"Trusted by global leaders"` in small `DM Mono`.

```html
<div class="company-strip">
  <img src="images/companies/thomson-reuters.png" alt="Thomson Reuters">
  <img src="images/companies/lseg.png" alt="LSEG">
  <img src="images/companies/bolt.png" alt="BOLT US Insurance">
</div>
```

### Timeline Entries (most recent first)

---

**LSEG — London Stock Exchange Group**
```
Accent color: --accent-amber (gold)
Logo:         images/companies/lseg.png
Role:         [Add your role title]
Period:       [Add dates — e.g. 2023 – Present]
Location:     [Add location]
```
Placeholder bullet points (owner replaces with real content):
```
• Developed and maintained financial data pipelines for global capital markets
• Worked with real-time market data feeds and trading infrastructure at scale
• Collaborated with cross-functional teams across London and global offices
• [Add your key achievement or impact here]
```

---

**Thomson Reuters**
```
Accent color: --accent-blue
Logo:         images/companies/thomson-reuters.png
Role:         [Add your role title]
Period:       [Add dates]
Location:     [Add location]
```
Placeholder bullet points:
```
• Built data processing systems for financial and news content at global scale
• Developed NLP pipelines for automated content tagging and classification
• Contributed to high-availability backend services and APIs
• [Add your key achievement or impact here]
```

---

**BOLT US Insurance**
```
Accent color: --accent-red
Logo:         images/companies/bolt.png
Role:         [Add your role title]
Period:       [Add dates]
Location:     Remote / US
```
Placeholder bullet points:
```
• Developed features for the BOLT insurance technology platform
• Built backend APIs and integration systems for US insurance workflows
• [Add your key achievement or impact here]
```

---

### Timeline Card HTML Template
```html
<!-- Copy this block for each job. Fill in role, company, dates, bullets, tech. -->
<div class="timeline-item" data-accent="blue">
  <div class="timeline-dot"></div>
  <div class="timeline-card reveal">
    <div class="timeline-header">
      <img src="images/companies/thomson-reuters.png" alt="Thomson Reuters" class="company-logo">
      <div class="timeline-title-group">
        <h3 class="role-title">Your Role Title</h3>
        <span class="company-name">Thomson Reuters</span>
      </div>
      <span class="timeline-period">2021 – 2023</span>
    </div>
    <ul class="timeline-bullets">
      <li>Responsibility or achievement one.</li>
      <li>Responsibility or achievement two.</li>
      <li>Responsibility or achievement three.</li>
    </ul>
    <div class="tech-pills">
      <span>Python</span><span>NLP</span><span>AWS</span>
    </div>
  </div>
</div>
```

Timeline card accent styling (applied via `data-accent`):
```css
.timeline-item[data-accent="blue"]  .timeline-card { border-left: 2px solid var(--accent-blue); }
.timeline-item[data-accent="amber"] .timeline-card { border-left: 2px solid var(--accent-amber); }
.timeline-item[data-accent="red"]   .timeline-card { border-left: 2px solid var(--accent-red); }
```

---

## Section 3 — Expeditions (Personal Projects)

Card grid (2 columns desktop, 1 mobile):
- Category badge (NLP / IoT / AI / Image Processing) in `DM Mono`
- Project name in `Cormorant Garamond`
- Short description in `Outfit`
- Tech stack pills
- "View expedition →" link
- **3D tilt effect on hover** (JS mousemove + CSS perspective)
- Card border glows `--accent-green` on hover

**How to add a project:**
```html
<!-- Copy this block for each project -->
<div class="project-card reveal" data-category="AI">
  <img src="images/projects/my-project.jpg" alt="Project name" loading="lazy">
  <span class="project-tag">AI / ML</span>
  <h3>Project Name</h3>
  <p>What this project does and why it matters.</p>
  <div class="tech-pills">
    <span>Python</span><span>TensorFlow</span>
  </div>
  <a href="#" class="card-link">View expedition →</a>
</div>
```

---

## Section 4 — Gallery (Adventure Photography)

- **Masonry grid** — 3 columns using CSS `column-count`
- Hover: image scale 1.05, overlay caption fades in
- Click → **Lightbox** (fullscreen, ESC closes, arrow keys navigate, "3 / 12" counter)

**How to add photos:**
```html
<!-- Copy this block for each photo -->
<div class="gallery-item">
  <img src="images/gallery/mountain-trek.jpg" alt="Mountain trek" loading="lazy">
  <div class="gallery-caption">Mountain trek · Bihar</div>
</div>
```

---

## Section 5 — Market (Stock Trading)

Amber/gold accent theme throughout:
- Trading philosophy quote in italic `Cormorant Garamond`: *"The market is terrain. Read it like a map."*
- Stats display: strategy, tools, sectors
- Optional TradingView widget embed

```html
<div class="trading-stat">
  <span class="stat-label">Strategy</span>
  <span class="stat-value">Swing + Momentum</span>
</div>
```

---

## Section 6 — Studio (Graphics Design)

- Full-bleed image grid from `images/design/`
- Hover reveals title + category overlay
- Click opens lightbox

**How to add design work:**
```html
<div class="design-item">
  <img src="images/design/brand-identity.png" alt="Brand identity" loading="lazy">
  <div class="design-info">
    <span class="design-title">Brand identity</span>
    <span class="design-type">Logo · Typography</span>
  </div>
</div>
```

---

## Section 7 — Contact (WITH FORM — REQUIRED)

This section MUST include a fully working contact form. Visitors enter their name, email, and a question or message.

### Layout
Two-column: left = display text + social links, right = form.

### Contact Form (complete implementation)
```html
<form class="contact-form" id="contactForm" novalidate>

  <div class="form-group">
    <label for="visitorName">Your name</label>
    <input type="text" id="visitorName" name="name"
      placeholder="What should I call you?" required autocomplete="name">
  </div>

  <div class="form-group">
    <label for="visitorEmail">Your email</label>
    <input type="email" id="visitorEmail" name="email"
      placeholder="So I can write back" required autocomplete="email">
  </div>

  <div class="form-group">
    <label for="visitorMessage">Your question or message</label>
    <textarea id="visitorMessage" name="message" rows="5"
      placeholder="Ask me anything — about my work at LSEG or Thomson Reuters, a collab idea, trading, mountains..." required></textarea>
  </div>

  <button type="submit" class="submit-btn">
    Send message →
  </button>

  <div class="form-success" id="formSuccess">
    Message received. I'll be in touch soon.
  </div>

  <div class="form-error" id="formError">
    Something went wrong. Please try emailing me directly.
  </div>

</form>
```

### Form Input Styling
```css
.contact-form input,
.contact-form textarea {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 0.5px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  padding: 12px 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  transition: border-color 0.2s;
}
.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--accent-green);
  background: rgba(125, 191, 120, 0.04);
}
.contact-form label {
  display: block;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--text-dim);
  margin-bottom: 6px;
  letter-spacing: 0.05em;
}
.submit-btn {
  background: transparent;
  border: 0.5px solid var(--accent-green);
  color: var(--accent-green);
  padding: 12px 28px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.submit-btn:hover {
  background: var(--accent-green);
  color: var(--bg-deep);
}
.form-success {
  display: none;
  color: var(--accent-green);
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  margin-top: 16px;
}
```

### Form JavaScript Handler
```js
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('visitorName').value.trim();
    const email = document.getElementById('visitorEmail').value.trim();
    const message = document.getElementById('visitorMessage').value.trim();

    if (!name || !email || !message) return;

    // TODO: Replace with your Formspree or EmailJS endpoint:
    // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, message })
    // });

    // For now: show success message immediately (no backend)
    form.reset();
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  });
}
```

### Below the Form
- Email address styled as a button — clicks copies to clipboard + shows toast: `"Email copied!"`
- Social icon row (SVG, not emoji): GitHub · LinkedIn · Instagram · Twitter/X
- Small decorative SVG mountain line illustration

---

## Animations & Motion

All animations must feel **slow, atmospheric, and natural** — like wilderness, not a startup.

### Scroll Reveal (all sections)
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```
```css
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

### Typewriter (Hero)
```js
const phrases = [
  'Thomson Reuters Alumni.',
  'LSEG Engineer.',
  'BOLT Insurance Builder.',
  'AI / ML Engineer.',
  'JEE Advanced Qualifier.',
  'Explorer of forests & rivers.',
  'Stock trader & pattern reader.',
  'Graphics designer.',
];
// Type phrase → pause 1.8s → delete → type next → repeat
```

### Custom Cursor
- Small `--accent-green` dot that follows mouse with lerp lag
- Expands to a ring outline on hover over links, cards, and buttons

### Timeline Animation
Cards slide in from left or right (alternating) as they enter viewport via `IntersectionObserver`.

### Parallax
Hero images shift at ~30% scroll speed using JS `transform: translateY()`.

---

## Responsiveness

| Breakpoint | Behavior |
|---|---|
| Desktop >1024px | All layouts as described above |
| Tablet 768–1024px | Timeline → single column, grids → 1 col, hamburger nav |
| Mobile <768px | Hero name `clamp(32px, 8vw, 96px)`, all single column, dots visible |

---

## Performance

- `loading="lazy"` on all `<img>` except first hero slide
- No CSS or JS frameworks
- `will-change: transform, opacity` only on animated elements
- Company logos: use SVG or WebP for crisp display

---

## Accessibility

- All images: descriptive `alt` text
- Form: `<label>` properly associated, `required` attributes, ARIA where needed
- Keyboard navigation: Tab through nav, form, cards
- Lightbox: traps focus, ESC closes, role="dialog" + aria-modal
- Color contrast: WCAG AA throughout

---

## How the Owner Adds / Updates Content

### Hero photos
1. Drop photo into `images/hero/`, name it `hero-N.jpg`
2. Add path to `heroImages` array in `js/main.js`

### Work experience
1. Copy the `.timeline-item` HTML block in the Journey section of `index.html`
2. Fill in: role, company name, dates, bullet points, tech pills
3. Add company logo PNG to `images/companies/`
4. Set `data-accent="blue"` / `"amber"` / `"red"` to match the company

### Projects
1. Add screenshot to `images/projects/`
2. Copy `.project-card` block, fill in name, description, tech

### Gallery photos
1. Drop photo into `images/gallery/`
2. Copy `.gallery-item` block, update `src` and caption

### Design work
1. Drop image into `images/design/`
2. Copy `.design-item` block, update `src`, title, type

### Contact form backend (future)
- Open `js/main.js`, find the `initContactForm()` function
- Uncomment the `fetch()` call, replace `YOUR_FORM_ID` with your Formspree or EmailJS ID
- Sign up free at formspree.io to get an ID

---

## main.js Function Map

```js
initHeroSlideshow();   // crossfade, auto-advance 4s, arrows, dots, pause on hover
initNavScroll();       // frosted glass on scroll, active section highlight
initCursor();          // lerp dot + expand ring on hover
initTypewriter();      // cycle phrases with type + delete
initScrollReveal();    // IntersectionObserver fade-up for all .reveal elements
initTimeline();        // alternating slide-in left/right on scroll
initLightbox();        // fullscreen overlay, ESC close, arrow keys, counter
initCardTilt();        // 3D perspective tilt on project cards
initCountUp();         // animate stat numbers when visible
initContactForm();     // submit handler, success message, form reset
initEmailCopy();       // clipboard copy with toast notification
initMobileNav();       // hamburger toggle for <768px
```

---

## Sample `index.html` Shell

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YOUR_NAME — Engineer · Explorer · Builder</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="nav" id="nav">
    <a class="nav-logo" href="#hero">YOUR_INITIALS</a>
    <ul class="nav-links">
      <li><a href="#about">Base Camp</a></li>
      <li><a href="#experience">Journey</a></li>
      <li><a href="#projects">Expeditions</a></li>
      <li><a href="#gallery">Gallery</a></li>
      <li><a href="#trading">Market</a></li>
      <li><a href="#design">Studio</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Open menu">&#9776;</button>
  </nav>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="hero-slides" id="heroSlides">
      <!-- JS injects slides from heroImages array -->
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-silhouette"><!-- inline SVG mountain ridge --></div>
    <div class="hero-content">
      <h1 class="hero-name">YOUR_NAME</h1>
      <p class="hero-tagline">
        <span id="typewriter"></span><span class="cursor-blink">|</span>
      </p>
      <p class="hero-sub">Bihar, India — AI/ML · Python · Java · JEE Advanced</p>
      <div class="company-badges">
        <span class="badge badge-blue">Thomson Reuters</span>
        <span class="badge badge-amber">LSEG</span>
        <span class="badge badge-red">BOLT Insurance</span>
      </div>
    </div>
    <div class="hero-dots" id="heroDots"></div>
    <button class="hero-arrow prev" id="heroPrev" aria-label="Previous">&#8592;</button>
    <button class="hero-arrow next" id="heroNext" aria-label="Next">&#8594;</button>
    <div class="scroll-hint"><span>scroll</span><div class="scroll-line"></div></div>
  </section>

  <!-- ABOUT -->
  <section class="section" id="about">
    <p class="section-label">01 — Base camp</p>
    <!-- content -->
  </section>

  <!-- JOURNEY / EXPERIENCE -->
  <section class="section" id="experience">
    <p class="section-label">02 — Journey</p>
    <div class="company-strip">
      <img src="images/companies/thomson-reuters.png" alt="Thomson Reuters">
      <img src="images/companies/lseg.png" alt="LSEG">
      <img src="images/companies/bolt.png" alt="BOLT US Insurance">
    </div>
    <div class="timeline">
      <!-- ADD TIMELINE ITEMS HERE — copy the .timeline-item block -->
    </div>
  </section>

  <!-- PROJECTS -->
  <section class="section" id="projects">
    <p class="section-label">03 — Expeditions</p>
    <div class="project-grid">
      <!-- ADD PROJECT CARDS HERE — copy the .project-card block -->
    </div>
  </section>

  <!-- GALLERY -->
  <section class="section" id="gallery">
    <p class="section-label">04 — Gallery</p>
    <div class="gallery-masonry">
      <!-- ADD GALLERY IMAGES HERE — copy the .gallery-item block -->
    </div>
  </section>

  <!-- TRADING -->
  <section class="section" id="trading">
    <p class="section-label">05 — Market</p>
    <!-- content -->
  </section>

  <!-- DESIGN STUDIO -->
  <section class="section" id="design">
    <p class="section-label">06 — Studio</p>
    <div class="design-grid">
      <!-- ADD DESIGN IMAGES HERE — copy the .design-item block -->
    </div>
  </section>

  <!-- CONTACT — with form -->
  <section class="section" id="contact">
    <p class="section-label">07 — Contact</p>
    <div class="contact-layout">
      <div class="contact-left reveal">
        <h2 class="contact-headline">Let's explore<br>something new.</h2>
        <p class="contact-bio">
          Open to engineering collaborations, research, freelance design, or just
          a conversation about LSEG data pipelines, mountain treks, or stock charts.
        </p>
        <button class="email-copy" id="emailCopy" data-email="YOUR_EMAIL">
          YOUR_EMAIL — click to copy
        </button>
        <div class="social-links">
          <a href="YOUR_GITHUB" target="_blank" aria-label="GitHub"><!-- SVG --></a>
          <a href="YOUR_LINKEDIN" target="_blank" aria-label="LinkedIn"><!-- SVG --></a>
          <a href="YOUR_INSTAGRAM" target="_blank" aria-label="Instagram"><!-- SVG --></a>
          <a href="YOUR_TWITTER" target="_blank" aria-label="Twitter"><!-- SVG --></a>
        </div>
      </div>
      <div class="contact-right reveal">
        <form class="contact-form" id="contactForm" novalidate>
          <div class="form-group">
            <label for="visitorName">Your name</label>
            <input type="text" id="visitorName" name="name"
              placeholder="What should I call you?" required autocomplete="name">
          </div>
          <div class="form-group">
            <label for="visitorEmail">Your email</label>
            <input type="email" id="visitorEmail" name="email"
              placeholder="So I can write back" required autocomplete="email">
          </div>
          <div class="form-group">
            <label for="visitorMessage">Your question or message</label>
            <textarea id="visitorMessage" name="message" rows="5"
              placeholder="Ask me anything — about LSEG, Thomson Reuters, a collab, trading, trekking..."></textarea>
          </div>
          <button type="submit" class="submit-btn">Send message →</button>
          <div class="form-success" id="formSuccess">
            Message received. I'll be in touch soon.
          </div>
          <div class="form-error" id="formError">
            Something went wrong. Please email me directly.
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- Lightbox -->
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-hidden="true">
    <button class="lightbox-close" id="lightboxClose" aria-label="Close">&times;</button>
    <button class="lightbox-prev" id="lightboxPrev" aria-label="Previous">&#8592;</button>
    <img class="lightbox-img" id="lightboxImg" src="" alt="">
    <div class="lightbox-caption" id="lightboxCaption"></div>
    <div class="lightbox-counter" id="lightboxCounter"></div>
    <button class="lightbox-next" id="lightboxNext" aria-label="Next">&#8594;</button>
  </div>

  <!-- Toast -->
  <div class="toast" id="toast" role="status" aria-live="polite"></div>

  <!-- Custom cursor -->
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="cursor-ring" id="cursorRing"></div>

  <script src="js/main.js"></script>
</body>
</html>
```

---

## Consistency Rules (enforce throughout)

- Every section opens with `<p class="section-label">0N — Section name</p>` in `DM Mono`
- Section `<h2>` titles in `Cormorant Garamond`, 36–48px, low weight
- Body text: `Outfit` 300, 15–16px, line-height 1.75
- All interactive elements: `transition: all 0.25s ease`
- Hover color: always `--accent-green`
- No hard white `#ffffff` anywhere — always the dark palette
- Company accents (blue/amber/red) used only in Journey section and hero badges, nowhere else
- Section label numbering: 01 through 07

---

## Placeholders for Owner to Replace

Search for these strings in the code and replace with real values:
```
YOUR_NAME        → Your actual full name
YOUR_INITIALS    → e.g. "AK"
YOUR_EMAIL       → your email address
YOUR_GITHUB      → https://github.com/yourusername
YOUR_LINKEDIN    → https://linkedin.com/in/yourprofile
YOUR_INSTAGRAM   → https://instagram.com/yourhandle
YOUR_TWITTER     → https://twitter.com/yourhandle
```

---

## Final Notes for Claude Code

- No CSS or JS frameworks whatsoever
- Write clean, well-commented code throughout
- Every content-editable section must have an HTML comment explaining how to add items
- Test slideshow with 1, 3, and 5+ images
- `images/` subfolders ship with `.gitkeep` placeholder files
- Include a `README.md` in plain English (non-developer friendly) explaining folder structure and how to add content
- Contact form ships with local-only submit (success message, no backend). Leave clearly-commented `TODO` for Formspree/EmailJS wiring
- Use `YOUR_NAME`, `YOUR_EMAIL` etc. as easy find-and-replace placeholders