/* CrownSalon Part 3 - interactivity, dynamic content, form validation */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RECIPIENT = 'CrownSaloninfo@gmail.com';
  const FALLBACK = [{"id": "hair", "name": "Hair Styling", "price": 450, "duration": 45, "image": "install.jpg", "alt": "Body wave hair install with a middle part", "description": "From sleek styles to glamourous curls, we create beautiful looks for every occasion, plus professional wig and hair installations."}, {"id": "lashes", "name": "Lashes", "price": 600, "duration": 60, "image": "lashes.jpg", "alt": "Close-up of voluminous lash extensions", "description": "Enhance your eyes with beautiful lash extensions for a fuller and more defined look."}, {"id": "brows", "name": "Brow Lamination", "price": 300, "duration": 30, "image": "brows.jpeg", "alt": "Fuller, laminated brows after treatment", "description": "Get fuller, more defined and beautifully shaped brows with our brow lamination service."}, {"id": "braids", "name": "Braids", "price": 800, "duration": 120, "image": "braids.jpeg", "alt": "Long boho knotless braids with curly ends", "description": "Beautiful and stylish braiding from classic braids to trendy protective styles."}, {"id": "nails", "name": "Nails", "price": 300, "duration": 40, "image": "nails.jpeg", "alt": "French tip manicure and pedicure", "description": "Treat yourself to beautiful manicures, gel nails and stylish nail designs."}];

  function el(tag, text, cls) {
    const e = document.createElement(tag);
    if (text != null) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }

  /* ---------- AJAX: load services.json (falls back to built-in copy) ---------- */
  async function loadServices() {
    try {
      const r = await fetch('services.json');
      if (!r.ok) throw new Error('bad response');
      return await r.json();
    } catch (err) {
      return FALLBACK;
    }
  }

  /* ---------- Form validation ---------- */
  function message(f) {
    const v = f.validity;
    const label = (f.labels && f.labels[0] ? f.labels[0].textContent : 'This field').trim();
    if (v.customError) return f.validationMessage;
    if (v.valueMissing) return label + ' is required.';
    if (v.typeMismatch) return 'Please enter a valid ' + label.toLowerCase() + '.';
    if (v.tooShort) return label + ' must be at least ' + f.minLength + ' characters.';
    if (v.patternMismatch) return f.dataset.error || 'Invalid format.';
    if (v.rangeUnderflow) return 'Please choose today or a future date.';
    return f.validationMessage;
  }
  function check(f) {
    f.setCustomValidity('');
    if (f.type === 'date' && f.value) {
      const d = new Date(f.value + 'T00:00').getDay();
      if (d === 0 || d === 1) f.setCustomValidity('We are closed on Sunday and Monday. Please pick Tuesday to Saturday.');
    }
    const ok = f.checkValidity();
    const s = f.parentElement.querySelector('.error');
    if (s) s.textContent = ok ? '' : message(f);
    f.setAttribute('aria-invalid', String(!ok));
    return ok;
  }
  function validate(form) {
    let first = null;
    $$('input,select,textarea', form).forEach(f => { if (!check(f) && !first) first = f; });
    if (first) first.focus();
    return !first;
  }
  function live(form) {
    $$('input,select,textarea', form).forEach(f => {
      f.addEventListener('blur', () => check(f));
      f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
  }

  /* ---------- Contact form: builds an email the visitor sends ---------- */
  function initContact() {
    const cf = $('#contactForm');
    if (!cf) return;
    live(cf);
    cf.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate(cf)) return;
      const d = Object.fromEntries(new FormData(cf));
      const subject = '[' + d.type + '] Message from ' + d.name;
      const body = 'Name: ' + d.name + '\nEmail: ' + d.email + '\nPhone: ' + d.phone +
        '\nMessage type: ' + d.type + '\n\n' + d.message;
      const p = $('#emailPreview');
      const a = el('a', 'Open in my email app', 'btn btn-primary');
      a.href = 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      p.replaceChildren(el('h3', 'Your email is ready'), el('p', 'To: ' + RECIPIENT),
        el('p', 'Subject: ' + subject), el('pre', body, 'mail-body'), a);
      p.hidden = false;
    });
  }

  /* ---------- Enquiry form: AJAX lookup, then cost/availability response ---------- */
  async function initEnquiry() {
    const f = $('#enquiryForm');
    if (!f) return;
    live(f);
    const sel = $('#e-service'), dt = $('#e-date');
    (await loadServices()).forEach(s => sel.append(new Option(s.name + ' (R' + s.price + ')', s.id)));
    const pre = new URLSearchParams(location.search).get('service');
    if (pre) sel.value = pre;
    const n = new Date();
    dt.min = new Date(n - n.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

    f.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validate(f)) return;
      const out = $('#enquiryResult');
      out.replaceChildren(el('p', 'Checking prices and availability...'));
      const s = (await loadServices()).find(x => x.id === sel.value);
      const day = new Date(dt.value + 'T00:00');
      const hours = day.getDay() === 6 ? '09:00 to 16:00' : '09:00 to 18:00';
      const a = el('a', 'Book this service', 'btn btn-primary');
      a.href = 'checkout.html';
      out.replaceChildren(
        el('h3', 'Thanks ' + $('#e-name').value.trim() + ', here is your quote'),
        el('p', s.name + ': R' + s.price + ' (about ' + s.duration + ' minutes).'),
        el('p', 'Good news: we are open on ' + day.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }) +
          ' from ' + hours + ', and appointments are available.'),
        el('p', 'A non-refundable R100 deposit confirms your booking; the remaining R' + (s.price - 100) + ' is paid in the salon.'),
        a);
      out.focus();
    });
  }

  /* ---------- Services page: dynamic list + search / filter / sort ---------- */
  function card(s) {
    const a = el('article', null, 'service-card');
    const i = el('img');
    i.src = s.image; i.alt = s.alt; i.width = 300; i.height = 300; i.loading = 'lazy'; i.className = 'gallery-img';
    const book = el('a', 'Book now', 'btn btn-primary'); book.href = 'checkout.html';
    const enq = el('a', 'Enquire', 'btn btn-ghost'); enq.href = 'enquiry.html?service=' + encodeURIComponent(s.id);
    a.append(i, el('h3', s.name), el('p', s.description), el('span', 'R' + s.price + ' · ' + s.duration + ' min', 'price'), book, enq);
    return a;
  }
  async function initServices() {
    const list = $('#service-list');
    if (!list) return;
    const all = await loadServices();
    const q = $('#svc-search'), pr = $('#svc-price'), so = $('#svc-sort'), count = $('#svc-count');
    const sorts = {
      name: (a, b) => a.name.localeCompare(b.name),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      duration: (a, b) => a.duration - b.duration
    };
    function render() {
      const term = q.value.trim().toLowerCase();
      let items = all.filter(s => (s.name + ' ' + s.description).toLowerCase().includes(term));
      if (pr.value === 'under400') items = items.filter(s => s.price < 400);
      if (pr.value === '400plus') items = items.filter(s => s.price >= 400);
      items.sort(sorts[so.value]);
      list.replaceChildren(...items.map(card));
      count.textContent = items.length ? items.length + ' of ' + all.length + ' services shown' : 'No services match your search.';
      reveal(); tagGallery();
    }
    [q, pr, so].forEach(c => c.addEventListener('input', render));
    render();
  }

  /* ---------- Accordion (booking policy) ---------- */
  function initAccordion() {
    $$('.accordion > li').forEach((li, i) => {
      const h = $('h3', li), p = $('p', li);
      const b = el('button', h.textContent, 'acc-btn');
      b.type = 'button'; p.id = 'acc' + i; p.hidden = true;
      b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', p.id);
      b.addEventListener('click', () => {
        const open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open)); p.hidden = open;
      });
      h.textContent = ''; h.appendChild(b);
    });
  }

  /* ---------- Lightbox gallery (modal) ---------- */
  function tagGallery() { $$('.gallery-img').forEach(i => i.tabIndex = 0); }
  function initLightbox() {
    let box, im, cap, list = [], i = 0, last;
    function build() {
      box = el('div', null, 'lightbox'); box.hidden = true;
      box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Image viewer');
      const x = el('button', '×', 'lb-close'), p = el('button', '‹', 'lb-nav lb-prev'), n = el('button', '›', 'lb-nav lb-next');
      x.setAttribute('aria-label', 'Close'); p.setAttribute('aria-label', 'Previous image'); n.setAttribute('aria-label', 'Next image');
      im = el('img'); cap = el('p', null, 'lb-cap');
      box.append(x, p, im, cap, n); document.body.appendChild(box);
      x.onclick = close; p.onclick = () => go(-1); n.onclick = () => go(1);
      box.onclick = e => { if (e.target === box) close(); };
    }
    function show() { im.src = list[i].currentSrc || list[i].src; im.alt = list[i].alt; cap.textContent = list[i].alt; }
    function go(d) { i = (i + d + list.length) % list.length; show(); }
    function close() { box.hidden = true; document.body.style.overflow = ''; if (last) last.focus(); }
    document.addEventListener('click', e => {
      const t = e.target.closest('.gallery-img');
      if (!t) return;
      if (!box) build();
      list = $$('.gallery-img'); i = list.indexOf(t); last = t;
      show(); box.hidden = false; document.body.style.overflow = 'hidden'; $('.lb-close', box).focus();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('gallery-img')) e.target.click();
      if (!box || box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });
    tagGallery();
  }

  /* ---------- Scroll reveal animation ---------- */
  let io;
  function reveal() {
    if (!('IntersectionObserver' in window)) return;
    io = io || new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    $$('main section,.au-drop-item,.service-card,.accordion > li').forEach(n => {
      if (!n.dataset.rv) { n.dataset.rv = '1'; n.classList.add('reveal'); io.observe(n); }
    });
  }

  /* ---------- Leaflet map (contact page) ---------- */
  function initMap() {
    if (!$('#map') || !window.L) return;
    const pos = [-29.7262, 31.0850]; /* Umhlanga - adjust to the exact salon location */
    const map = L.map('map').setView(pos, 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker(pos).addTo(map).bindPopup('<strong>CrownSalon</strong><br>43 Umhlanga Drive').openPopup();
  }

  /* ---------- Footer newsletter ---------- */
  function initNewsletter() {
    $$('.footer-newsletter-form').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault(); f.replaceChildren(el('p', 'Thanks for signing up!'));
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAccordion(); initLightbox(); initContact(); initEnquiry(); initServices(); initMap(); initNewsletter(); reveal();
  });
})();
