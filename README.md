# CrownSalon

A multi-page website for CrownSalon, a beauty salon offering hair, lashes, brows, braids, and nail services. Visitors can learn about the salon, browse services, review the booking policy, create an account/log in, book an appointment, and get in touch.

## Overview

This is the homepage (`index.html`) of the site. It introduces the salon and links out to the other pages, while also embedding quick-access sections (About, Services, Booking Policy, Log In, Checkout, Contact) directly on the page.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with navigation, hero images, and quick links to every section |
| About | `About us.html` | More detail about the salon |
| Services | `Services.html` | Full list of services offered |
| Booking Policy | `Booking policy.html` | Salon booking rules and policies |
| Contact | `Contact us.html` | Contact form and address details |
| Log In | `Login system.html` | Customer login |
| Book Now | `Checkout.html` | Booking/checkout form |

## Features

- **Navigation bar** linking to all core pages
- **Image gallery** on the homepage showcasing braids, lashes, nails, brows, and hair installs
- **Login form** — email and password fields, with links to create an account or recover a password
- **Checkout / booking form** — collects name, email, phone, and payment details to confirm a booking, plus an order summary section
- **Contact form** — name, email, and message fields, alongside the salon's address, phone number, and business hours
- **Footer** with quick links (About, Services, Booking Policy, Account, Contact), social links (Instagram, TikTok), and copyright/legal links

## Project Structure

```
/
├── index.html
├── About us.html
├── Services.html
├── Booking policy.html
├── Contact us.html
├── Login system.html
├── Checkout.html
└── images/
    ├── braids.jpeg
    ├── lashes.jpg
    ├── nails.jpeg
    ├── brows.jpeg
    └── install.jpg
```

> Note: image files (`braids.jpeg`, `lashes.jpg`, `nails.jpeg`, `brows.jpeg`, `install.jpg`) are referenced directly by filename in the HTML — make sure they sit in the same folder as `index.html`, or update the `src` paths if you move them into an `images/` subfolder.

## Known Issues / Cleanup Suggestions

- There's a duplicate `<body>` tag in `index.html` (one wraps the header image gallery, then a second `<body>` opens for `<main>`) — HTML only allows one `<body>` per document.
- The `<img>` tags are self-closed with a stray `</img.src>` instead of a proper closing style — image tags are void elements and don't need a closing tag at all (e.g. `<img src="braids.jpeg" width="220" height="200">`).
- The `length` attribute isn't valid for images — use `height` instead.
- Contact links are inconsistent in capitalization (`Contact us.html` vs `contact us.html`), which can cause broken links on case-sensitive servers.
- Forms don't yet have an `action` or backend endpoint set, so submissions won't currently go anywhere.
- No CSS file is linked — styling beyond the inline `<h1>` background color isn't yet defined.

## Getting Started

1. Clone or download the project files.
2. Ensure all referenced image files are present in the same directory.
3. Open `index.html` in a browser to view the site.
4. (Optional) Add a stylesheet and link it in the `<head>` for full styling.

## License

© 2026 CrownSalon. All rights reserved.
