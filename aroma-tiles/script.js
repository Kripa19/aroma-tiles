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

// ---- Lightbox: click any tile photo to see it enlarged ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, name) {
  lightboxImg.src = src;
  lightboxImg.alt = name || 'Enlarged tile photo';
  lightboxCaption.textContent = name || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.zoomable').forEach((el) => {
  el.addEventListener('click', () => {
    openLightbox(el.dataset.zoomSrc, el.dataset.zoomName);
  });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(el.dataset.zoomSrc, el.dataset.zoomName);
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

// ---- Category browsing: data for each room/style category ----
const categoryData = {
  'living-room': {
    icon: '🏠',
    title: 'Living Room',
    tiles: [
      { name: 'Statuario Classico', src: 'assets/tiles/statuario_classico.jpg' },
      { name: 'Marmolino', src: 'assets/tiles/marmolino.jpg' },
      { name: 'Persian Grey', src: 'assets/tiles/persian_grey.jpg' },
      { name: 'Tundra Griss', src: 'assets/tiles/tundra_griss.jpg' },
      { name: 'Solid Ivory', src: 'assets/tiles/solid_ivory.jpg' },
    ]
  },
  'bedroom': {
    icon: '🛏️',
    title: 'Bedroom',
    tiles: [
      { name: 'Mono Dove', src: 'assets/tiles/mono_dove.jpg' },
      { name: 'Mono Crema', src: 'assets/tiles/mono_crema.jpg' },
      { name: 'Solid White', src: 'assets/tiles/solid_white.jpg' },
      { name: 'Radia Light', src: 'assets/tiles/radia_light.jpg' },
    ]
  },
  'kitchen': {
    icon: '🍳',
    title: 'Kitchen',
    tiles: [
      { name: 'Bottochino Beige', src: 'assets/tiles/bottochino_beige.jpg' },
      { name: 'Tomas Grey', src: 'assets/tiles/tomas_grey.jpg' },
      { name: 'Marbelano', src: 'assets/tiles/marbelano.jpg' },
      { name: 'Masso Bianco', src: 'assets/tiles/masso_bianco.jpg' },
    ]
  },
  'bathroom': {
    icon: '🛁',
    title: 'Bathroom',
    tiles: [
      { name: 'Onyx Ice', src: 'assets/tiles/onyx_ice.jpg' },
      { name: 'Persian Grey', src: 'assets/tiles/persian_grey.jpg' },
      { name: 'Masso Bianco', src: 'assets/tiles/masso_bianco.jpg' },
      { name: 'Helix Aqua', src: 'assets/tiles/helix_aqua.jpg' },
    ]
  },
  'dining-room': {
    icon: '🍽️',
    title: 'Dining Room',
    tiles: [
      { name: 'Statuario Classico', src: 'assets/tiles/statuario_classico.jpg' },
      { name: 'Bottochino Beige', src: 'assets/tiles/bottochino_beige.jpg' },
      { name: 'Radia Light', src: 'assets/tiles/radia_light.jpg' },
      { name: 'Solid Ivory', src: 'assets/tiles/solid_ivory.jpg' },
    ]
  },
  'balcony': {
    icon: '🌿',
    title: 'Balcony & Terrace',
    tiles: [
      { name: 'Helix Terra', src: 'assets/tiles/helix_terra.jpg' },
      { name: 'Helix Aqua', src: 'assets/tiles/helix_aqua.jpg' },
      { name: 'Quadro Stone', src: 'assets/tiles/quadro_stone.jpg' },
      { name: 'Sabbia Griss', src: 'assets/sabbia_griss.jpg' },
      { name: 'Giro Stone', src: 'assets/tiles/giro_stone.jpg' },
    ]
  },
  'outdoor': {
    icon: '🌳',
    title: 'Outdoor Tiles',
    tiles: [
      { name: 'Matone Nero', src: 'assets/tiles/matone_nero.jpg' },
      { name: 'Quadro Sand', src: 'assets/tiles/quadro_sand.jpg' },
      { name: 'Sabbia Strom', src: 'assets/sabbia_strom.jpg' },
      { name: 'Giro Griss', src: 'assets/tiles/giro_griss.jpg' },
    ]
  },
  'wooden': {
    icon: '🌲',
    title: 'Wooden Look Tiles',
    tiles: [
      { name: 'Teakwood', src: 'assets/tiles/teakwood.jpg' },
      { name: 'Madera Knot', src: 'assets/tiles/madera_knot.jpg' },
      { name: 'Marbowood', src: 'assets/tiles/marbowood.jpg' },
      { name: 'Wooden Strip', src: 'assets/tiles/wooden_strip.jpg' },
      { name: 'Wooden Brick', src: 'assets/tiles/wooden_brick.jpg' },
    ]
  },
  'stone': {
    icon: '🪨',
    title: 'Stone Look Tiles',
    tiles: [
      { name: 'Masso Bianco', src: 'assets/tiles/masso_bianco.jpg' },
      { name: 'Masso Nero', src: 'assets/tiles/masso_nero.jpg' },
      { name: 'Quadro Stone', src: 'assets/tiles/quadro_stone.jpg' },
      { name: 'Giro Stone', src: 'assets/tiles/giro_stone.jpg' },
    ]
  },
  'marble': {
    icon: '✨',
    title: 'Marble Look Tiles',
    tiles: [
      { name: 'Statuario Classico', src: 'assets/tiles/statuario_classico.jpg' },
      { name: 'Marmolino', src: 'assets/tiles/marmolino.jpg' },
      { name: 'Onyx Ice', src: 'assets/tiles/onyx_ice.jpg' },
      { name: 'Bottochino Beige', src: 'assets/tiles/bottochino_beige.jpg' },
      { name: 'Persian Grey', src: 'assets/tiles/persian_grey.jpg' },
    ]
  },
};

const categoryModal = document.getElementById('categoryModal');
const categoryModalClose = document.getElementById('categoryModalClose');
const categoryModalIcon = document.getElementById('categoryModalIcon');
const categoryModalTitle = document.getElementById('categoryModalTitle');
const categoryModalGrid = document.getElementById('categoryModalGrid');

function openCategoryModal(key) {
  const data = categoryData[key];
  if (!data) return;

  categoryModalIcon.textContent = data.icon;
  categoryModalTitle.textContent = data.title;
  categoryModalGrid.innerHTML = '';

  data.tiles.forEach((tile) => {
    const item = document.createElement('div');
    item.className = 'category-modal-item';

    const photo = document.createElement('div');
    photo.className = 'category-modal-photo';
    photo.style.backgroundImage = `url('${tile.src}')`;
    photo.addEventListener('click', () => openLightbox(tile.src, tile.name));

    const name = document.createElement('span');
    name.className = 'category-modal-name';
    name.textContent = tile.name;

    item.appendChild(photo);
    item.appendChild(name);
    categoryModalGrid.appendChild(item);
  });

  categoryModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCategoryModal() {
  categoryModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.category-card').forEach((card) => {
  card.addEventListener('click', () => openCategoryModal(card.dataset.category));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCategoryModal(card.dataset.category);
    }
  });
});

categoryModalClose.addEventListener('click', closeCategoryModal);
categoryModal.addEventListener('click', (e) => {
  if (e.target === categoryModal) closeCategoryModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && categoryModal.classList.contains('open')) closeCategoryModal();
});
