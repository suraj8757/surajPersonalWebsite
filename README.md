# Portfolio Website

Welcome! This is your personal portfolio website showcasing your work at **Thomson Reuters**, **LSEG**, and **BOLT US Insurance**, along with your AI/ML projects, trading experience, and adventure photography.

---

## What's New - Refined Design System

This portfolio now features a **sophisticated, editorial design** with:

### Color Palette
- **Warm, muted tones** — replaced heavy green with elegant gold, terracotta, and teal accents
- **Company colors preserved**: LSEG (amber gold), Thomson Reuters (soft blue), BOLT (terracotta)
- **Sophisticated dark theme** with warm off-whites for text

### Typography Styles
The site now uses varied text formats for visual interest:

| Style | CSS Class | Usage |
|-------|-----------|-------|
| **Gradient Text** | `.text-gradient-gold` | Hero name, important headings |
| **Outlined Text** | `.text-outlined` | Decorative display text |
| **Monospace** | `.text-mono` | Labels, categories, dates |
| **Serif Display** | `.text-display` | Headings, quotes |
| **Italic Accent** | `.text-italic-accent` | Quotes, emphasized text |

---

## Folder Structure

```
Portfolio-site/
├── index.html          ← Main webpage with all content
├── css/
│   └── style.css      ← Complete design system
├── js/
│   └── main.js        ← Interactions & animations
├── images/            ← Your personal photos (optional - currently using Unsplash)
└── README.md          ← This file!
```

---

## Images - Using Unsplash

The website is currently using **high-quality placeholder images from Unsplash**. These are professional, stunning photos that make the site look amazing immediately.

### Hero Slideshow Images
Located in `js/main.js`:
```javascript
const heroImages = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop', // Mountains
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&h=1080&fit=crop', // Waterfall
    // ... more images
];
```

### To Use Your Own Images:

1. **Option A: Replace URLs** (Quickest)
   - Find Unsplash photos you like
   - Copy their URL and replace in `main.js`

2. **Option B: Use Local Images**
   - Create folder: `images/landscapes/`
   - Add your photos
   - Update `main.js`:
   ```javascript
   const heroImages = [
       'images/landscapes/my-photo1.jpg',
       'images/landscapes/my-photo2.jpg',
   ];
   ```

### Recommended Unsplash Collections:
- **Mountains/Adventure**: Search "mountain landscape", "hiking", "camping"
- **Professional**: Search "office", "workspace", "technology"
- **Profile Photo**: Search "professional portrait"

**Tip**: Add `?w=1920&h=1080&fit=crop` to any Unsplash URL for perfect fullscreen sizing.

---

## How to Customize Content

### Update Personal Information

Search for these placeholders in `index.html` and replace:

| Placeholder | Replace With |
|-------------|--------------|
| `YOUR_EMAIL@example.com` | Your actual email |
| `2023 — Present` | Your actual work dates |
| `Built scalable data pipelines...` | Your actual job descriptions |

### Add Work Experience

1. Open `index.html` and find `SECTION 02 — JOURNEY`
2. Copy any existing `timeline-card` block
3. Paste before the closing `</div>` of `.timeline`
4. Change the company class:
   - `lseg` = amber/gold
   - `thomson-reuters` = blue
   - `bolt` = terracotta/red

### Add Projects

1. Find `SECTION 03 — EXPEDITIONS` in `index.html`
2. Copy an existing `project-card` block
3. Update the Unsplash image URL or use your own
4. Change title, description, and links

### Add Gallery Photos

1. Find `SECTION 04 — GALLERY` in `index.html`
2. Copy an existing `gallery-item` block
3. Update the `data-index` (sequential: 0, 1, 2, 3...)
4. Replace the Unsplash URL with your own image

---

## Design System Reference

### Color Variables

Use these in your custom CSS if needed:

```css
:root {
    /* Backgrounds */
    --color-bg-primary: #0c0c0e;      /* Main background */
    --color-bg-secondary: #141416;     /* Section alternate */
    --color-bg-card: #232328;          /* Cards/panels */

    /* Text */
    --color-text-primary: #f5f5f0;     /* Main text */
    --color-text-secondary: #c9c9c0;   /* Body text */
    --color-text-muted: #8a8a80;       /* Captions */

    /* Accents */
    --color-accent-gold: #d4a853;      /* Primary accent */
    --color-accent-terracotta: #c67b5c; /* BOLT/secondary */
    --color-accent-teal: #5a9a8f;      /* Tertiary */
}
```

### Typography Scale

```css
--text-xs: 0.7rem;    /* Labels, mono text */
--text-sm: 0.8rem;    /* Captions */
--text-base: 0.95rem; /* Body text */
--text-lg: 1.1rem;    /* Large body */
--text-xl: 1.35rem;   /* Small headings */
--text-2xl: 1.75rem;  /* Section headings */
--text-3xl: 2.25rem;  /* Large display */
--text-4xl: 3rem;     /* Section titles */
--text-5xl: 4rem;     /* Hero text */
```

---

## Contact Form Setup (Formspree)

Your contact form currently shows a success message but doesn't send emails. To enable:

1. **Create account**: Go to [formspree.io](https://formspree.io)
2. **Create form**: Name it "Portfolio Contact"
3. **Copy your endpoint**: Looks like `https://formspree.io/f/YOUR_FORM_ID`
4. **Update main.js**: Find `initContactForm()` and replace the placeholder URL
5. **Test**: Submit a message and check your Formspree dashboard

---

## Preview Your Site

1. **Direct open**: Double-click `index.html`
2. **Local server** (recommended):
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .

   # PHP
   php -S localhost:8000
   ```
3. **Visit**: `http://localhost:8000`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Images not loading | Check internet connection (Unsplash needs it) or replace with local images |
| Fonts look wrong | Ensure internet connection for Google Fonts to load |
| Animations too fast/slow | Edit `--transition-*` variables in `css/style.css` |
| Form not sending | Make sure you set up Formspree and uncommented the code in `main.js` |

---

## Next Steps

1. **Replace placeholder images** with your own adventure photos
2. **Update personal details** (email, dates, descriptions)
3. **Add your actual project screenshots**
4. **Set up the contact form** with Formspree
5. **Deploy** to GitHub Pages, Netlify, or Vercel

---

**Questions?** Check the inline comments in `index.html` — each section has instructions!

**Happy editing!** 🚀
