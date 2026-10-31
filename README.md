# Fork & Flame

A restaurant landing page built with HTML, CSS, and JavaScript. I made it to practice front-end fundamentals, then finished it as a portfolio piece: a real menu, a working cart, search and filters, and form validation — no frameworks.

**Live demo:** open `index.html` (it opens `pages/index.html`), or enable GitHub Pages on this repo.

The site is split into separate screens. Each screen has its own HTML, CSS, and JS. Shared layout and cart storage live in `css/base.css` and `js/common.js`.

## Features

- Responsive layout for desktop, tablet, and phone
- Sticky header and mobile navigation
- Menu search and category filters
- Add to cart, quantity controls, and persistent cart (`localStorage`)
- Pickup checkout and contact form with client-side validation
- Accessible details: skip link, labels, `aria-live` updates, and keyboard-visible focus styles

## How to run

No build step and no dependencies.

1. Clone the repository
2. Open `index.html` in your browser

Optional: serve the folder with any static server, for example:

```bash
npx serve .
```

## Project structure

```text
index.html          Opens the home screen
pages/index.html    Home
pages/menu.html     Menu
pages/about.html    About
pages/cart.html     Cart
pages/contact.html  Contact
css/base.css        Shared layout and footer
css/home.css
css/menu.css
css/about.css
css/cart.css
css/contact.css
js/common.js    Nav, cart storage, toast
js/home.js
js/menu.js
js/about.js
js/cart.js
js/contact.js
images/
```

## What this project shows

- Semantic HTML and a clear visual hierarchy
- CSS custom properties, grid, and mobile-first media queries
- Vanilla JavaScript for UI state, DOM updates, and validation
- Attention to empty states, errors, and reduced-motion preferences

Checkout and contact are front-end demos. They do not send data to a backend.

## Photo credits

Food and interior photos come from [Unsplash](https://unsplash.com). The Classic Burger photo is included from the original project files.

## License

MIT
