# CrownSalon

A multi-page website for CrownSalon, a beauty salon offering hair, lashes, brows, braids, and nail services. Visitors can learn about the salon, browse and search services, review the booking policy, create an account/log in, enquire about a service, book an appointment, and get in touch.

**Live site:** _add your Netlify / GitHub Pages link here_
**Repository:** _add your GitHub link here_

## Overview

`index.html` is the homepage. It introduces the salon, shows a clickable photo gallery and links out to the other pages. Part 1 built the structure, Part 2 added styling and the login/checkout scripts, and Part 3 (this version) adds JavaScript interactivity, SEO, validated forms and deployment.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with navigation, lightbox gallery and quick links to every section |
| About | `about.html` | More detail about the salon |
| Services | `services.html` | Searchable, filterable, sortable list of services (loaded from `services.json`) |
| Booking Policy | `booking-policy.html` | Salon booking rules, shown as an accordion |
| Enquiry | `enquiry.html` | **New in Part 3.** Validated enquiry form that returns a cost and availability quote |
| Contact | `contact.html` | Validated contact form that builds an email, address details and an interactive map |
| Log In | `login.html` | Customer login, sign-up and password reset |
| Book Now | `checkout.html` | Booking/checkout form with order summary |

## Features

- **Navigation bar and footer** linking to all pages, with opening hours and a newsletter sign-up
- **Lightbox gallery** (home and services pages): click or press Enter on an image, arrow keys to browse, Esc to close
- **Accordion** for the booking policy (keyboard accessible, `aria-expanded`)
- **Interactive map** on the contact page (Leaflet + OpenStreetMap)
- **Animations**: scroll-reveal and button hover transitions, switched off for users who prefer reduced motion
- **Dynamic services**: cards built in the DOM from `services.json` with `fetch`, plus search, price filter and sort
- **Enquiry form**: validates input, then fetches pricing and shows cost, duration, deposit and opening hours for the chosen date
- **Contact form**: validates input, then compiles an email to CrownSaloninfo@gmail.com that the visitor sends with one click
- **Login and checkout** (from Part 2): account forms and a booking summary driven by `login.js` and `checkout.js`

## Form validation

Both new forms use HTML5 attributes (`required`, `type`, `minlength`, `maxlength`, `pattern`) and JavaScript validation (`novalidate` + custom checks) with inline error messages that update as the user types. Rules include: valid email, South African phone format (e.g. `0714567890` or `+27714567890`), minimum message length, and a date that is not in the past and not a Sunday or Monday (salon closed).

## SEO

- Unique `<title>` and meta description on every page, plus canonical and Open Graph tags
- One `<h1>` per page with `h2`/`h3` beneath it
- Descriptive alt text and file names for images, lazy loading, compressed images, `width`/`height` set
- Clean lowercase URLs, internal links between pages, mobile-friendly navigation
- `robots.txt` and `sitemap.xml` (update the domain after deployment)
- Targeted keywords: salon Umhlanga, lash extensions, brow lamination, braids, hair installation, nails

## Security and performance

- `_headers` (Netlify) sets a Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy
- Scripts load with `defer`; user input is written to the page with `textContent`, not `innerHTML`

## Project Structure

```
/
├── index.html
├── about.html
├── services.html
├── booking-policy.html
├── enquiry.html
├── contact.html
├── login.html
├── checkout.html
├── style.css              (Part 2 styles)
├── enhancements.css       (Part 3 styles)
├── enhancements.js        (Part 3 scripts)
├── login.js
├── checkout.js
├── services.json
├── robots.txt
├── sitemap.xml
├── _headers
└── images: braids.jpeg, lashes.jpg, nails.jpeg, brows.jpeg, install.jpg,
            maintenance.jpg, wallpaper.jpeg
```

Images sit in the same folder as the HTML files. Run the site through Netlify, GitHub Pages or a local server (e.g. VS Code Live Server) so `services.json` can load; if it cannot, the site falls back to a built-in copy.

## Getting Started

1. Clone or download the repository.
2. Open the folder with a local server (or just deploy it) and visit `index.html`.
3. After deploying, replace `https://YOUR-SITE.netlify.app` in `sitemap.xml`, `robots.txt` and the canonical tags with your real URL.

## Changelog

### Part 3 (2026-11-04)

| File(s) | Change |
|---|---|
| all pages | Renamed pages to clean URLs (`About us.html` to `about.html`, etc.) and updated every nav and footer link. This also resolves the Part 1 note about inconsistent capitalisation and spaces in file names. |
| all pages | Added unique titles and meta descriptions, canonical and Open Graph tags; brand name changed from `h1` to a styled paragraph so each page has a single `h1`. |
| all pages | Added Enquiry link to the nav and footer; added `enhancements.css` and `enhancements.js`. |
| `index.html` | Fixed the duplicate `<body>` tag and stray `</header>`; replaced the invalid `</img.src>` closings and `length` attributes with valid `<img>` tags using `height`; added alt text; corrected the "Welcomee" typo; made the gallery a lightbox and added a gallery section. |
| `services.html`, `booking-policy.html` | Removed duplicate `<body>`/`</body>` tags. |
| `about.html` | Removed a stray `</style>` tag. |
| `services.html` | Replaced the static list with dynamic cards loaded from `services.json`, with search, price filter and sorting (static list kept in `<noscript>`). |
| `booking-policy.html` | Converted policies to an accordion; clearer `h1`. |
| `contact.html` | Added validated contact form (email builder) and Leaflet map. Resolves the Part 1 note that forms had no action. |
| `enquiry.html` | New page with validated enquiry form and quote response. |
| new files | `services.json`, `robots.txt`, `sitemap.xml`, `_headers`. |
| images | Compressed images for faster loading. |

## License

© 2026 CrownSalon. All rights reserved.
