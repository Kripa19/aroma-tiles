// ====================================================================
// AROMA TILES — SCRIPT
// ====================================================================

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// ---- Header background toggle on scroll (transparent over hero photo, solid once scrolled) ----
const siteHeader = document.getElementById('header');

function updateHeaderState() {
  if (window.scrollY > 40) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
updateHeaderState();
window.addEventListener('scroll', updateHeaderState);

// ---- Hero background slideshow (auto-rotating photos) ----
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

if (heroSlides.length > 1) {
  setInterval(() => {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }, 5000);
}

// ---- Signature hero element: grout grid lights up in a staggered wave ----
const groutGrid = document.getElementById('groutGrid');
const COLS = 8;
const ROWS = 6;
const cells = [];

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const cell = document.createElement('div');
    groutGrid.appendChild(cell);
    cells.push({ el: cell, r, c });
  }
}

function runGroutWave() {
  cells.forEach(({ el, r, c }) => {
    const delay = (r + c) * 70;
    setTimeout(() => {
      el.classList.toggle('terra', Math.random() > 0.6);
      el.classList.add('lit');
      setTimeout(() => el.classList.remove('lit', 'terra'), 1400);
    }, delay);
  });
}

runGroutWave();
setInterval(runGroutWave, 4200);

// ---- Contact form (placeholder submit handler) ----
// NOTE: This currently just shows a confirmation message in the page.
// To actually receive messages, connect this form to a backend or a
// service like Formspree / EmailJS / Google Forms, then replace the
// fetch/console.log below with the real submission logic.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();

  if (!name) {
    formNote.textContent = 'Please enter your name.';
    return;
  }

  // Placeholder behavior — replace with real submission (see note above).
  formNote.style.color = '#3D7A5C';
  formNote.textContent = `Thanks, ${name}! We'll get back to you soon.`;
  contactForm.reset();
});
