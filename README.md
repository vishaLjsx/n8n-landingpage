# n8n Orchestrate — Landing Page

A complete, high-performance landing page for **n8n Orchestrate** — an agency that designs and deploys production-grade, self-hosted n8n workflow systems for SMBs.

Built with **React + Vite** and plain **CSS custom properties**, following an engineering-schematic aesthetic.

---

## Key Highlights

- **Engineering-Schematic Aesthetic**: Strict `2px` border-radius on all rectangular elements, zero drop shadows, hairline borders (`#e3e3e3`), schematic grid patterns, and technical monospace badges.
- **Single Permitted Gradient**: The violet-to-orange gradient (`#6a2bff` → `#ff7043`) is used strictly once on the hero headline highlight.
- **Pure Presentational Components**: 11 modular components (`Header`, `Hero`, `LogoCloud`, `ProblemSection`, `ProcessSteps`, `ServicesGrid`, `ResultsStats`, `Testimonials`, `FAQ`, `CTASection`, `Footer`), completely decoupled from copy.
- **Single Source of Truth**: All page content, stats, services, navigation, and FAQ items live in `src/data/siteData.js`.
- **Accessibility & Responsiveness**: Mobile drawer menu, interactive FAQ accordion with `aria-expanded` and `aria-controls`, and visible keyboard `:focus-visible` rings.

---

## Directory Structure

```
c:\Users\pc\Downloads\n8n-landingpage/
├── index.html                  # HTML shell with Google Fonts & metadata
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Documentation and re-skinning guide
└── src/
    ├── main.jsx                # Application root entrypoint
    ├── App.jsx                 # Spreads siteData slices into section components
    ├── index.css               # Imports tokens, base, and component styles
    ├── styles/
    │   ├── tokens.css          # Design system CSS variables (colors, fonts, radius)
    │   ├── base.css            # Typography rules, resets, layout containers
    │   └── components.css      # Component styles (header, hero, cards, accordion, footer)
    ├── data/
    │   └── siteData.js         # Single source of truth containing all content
    └── components/
        ├── Header.jsx          # Sticky nav, brand mark, mobile drawer toggle, CTA
        ├── Hero.jsx            # Kicker, headline with gradient, stats, workflow diagram
        ├── LogoCloud.jsx       # Client teams running on built workflows
        ├── ProblemSection.jsx  # 4 cards on the cost of manual operations
        ├── ProcessSteps.jsx    # 4 numbered technical steps (01 to 04)
        ├── ServicesGrid.jsx    # 6 automation services with monospace tool badges
        ├── ResultsStats.jsx    # 3 case study metrics with industry labels
        ├── Testimonials.jsx    # 3 client founder/operator testimonials
        ├── FAQ.jsx             # 5 questions in an accessible interactive accordion
        ├── CTASection.jsx      # Closing call-to-action band
        └── Footer.jsx          # Brand blurb, link columns, legal & status bar
```

---

## How to Re-Skin the Page

You can completely customize copy, pricing, metrics, services, and branding by editing **`src/data/siteData.js`** alone without touching any React component files:

### 1. Brand & Navigation
Update `siteData.brand` and `siteData.header` to rename the agency or update nav links:
```javascript
export const siteData = {
  brand: {
    name: "Your Agency Name",
    version: "v1.0.0",
    ...
  },
  header: {
    navLinks: [
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      ...
    ],
    cta: {
      label: "Book a Call",
      href: "https://cal.com/your-team",
    },
  },
  ...
};
```

### 2. Hero & Workflow Schematic
Modify the hero headline, stat counters, and live workflow diagram in `siteData.hero`:
```javascript
hero: {
  kicker: "CUSTOM ENTERPRISE AUTOMATION",
  headlineBefore: "Eliminate manual friction with automations that ",
  headlineHighlight: "run on your own private cloud",
  headlineAfter: ".",
  stats: [
    { number: "100%", label: "Data Ownership" },
    ...
  ],
  workflowChain: {
    title: "CUSTOM WORKFLOW DIAGRAM",
    nodes: [
      { type: "Trigger", title: "Inbound Hook", meta: "POST /v1/webhook" },
      ...
    ],
  },
}
```

### 3. Services, Case Studies & FAQ
Add, remove, or edit entries in `siteData.services`, `siteData.results`, and `siteData.faq`. The components will automatically adapt without layout shifts.

### 4. Adjusting the Design System
All visual design tokens reside in `src/styles/tokens.css`. To modify the color palette or typography:
- Update `--color-ink`, `--color-canvas`, `--border-hairline`.
- Update `--color-accent` (default: `#6a2bff`), `--color-accent-tint` (`#efe7ff`), and `--color-accent-wash` (`#f7f3ff`).
- The single hero gradient is defined under `--gradient-hero`.

---

## Getting Started

### Development
Start the local development server:
```bash
npm run dev
```

### Production Build
Compile and optimize for production:
```bash
npm run build
```

### Preview Production Build
Preview the generated `dist` folder locally:
```bash
npm run preview
```
