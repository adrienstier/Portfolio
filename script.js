// ══════════════════════════════════════
//  THEME TOGGLE — dark / light
// ══════════════════════════════════════
function applyThemeToggle() {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', applyThemeToggle);
});

// ══════════════════════════════════════
//  PELLICULE DE FILM — pleine largeur
// ══════════════════════════════════════
function buildFilm(id) {
  const track = document.getElementById(id);
  if (!track) return;
  const count = Math.ceil((window.innerWidth / 48) * 2) + 10;
  for (let i = 0; i < count; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    track.appendChild(hole);
  }
}
buildFilm('filmTop');
buildFilm('filmBottom');

// ══════════════════════════════════════
//  SCROLL REVEAL
// ══════════════════════════════════════
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.10 });
reveals.forEach(r => observer.observe(r));

// ══════════════════════════════════════
//  BURGER MENU MOBILE
// ══════════════════════════════════════
const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
}

// ══════════════════════════════════════
//  ONGLETS RÉALISATIONS
// ══════════════════════════════════════
const tabBtns = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-section');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabSections.forEach(s => s.classList.remove('active-tab'));
    btn.classList.add('active');
    const section = document.getElementById(target);
    if (section) section.classList.add('active-tab');
  });
});

// Ouverture par ancre URL (#videos, #blender, #crashtests, #plus)
const hash = window.location.hash.replace('#', '');
if (hash && document.getElementById(hash) && document.getElementById(hash).classList.contains('tab-section')) {
  tabBtns.forEach(b => b.classList.remove('active'));
  tabSections.forEach(s => s.classList.remove('active-tab'));
  const targetBtn = document.querySelector(`[data-tab="${hash}"]`);
  if (targetBtn) targetBtn.classList.add('active');
  document.getElementById(hash).classList.add('active-tab');
}

// ══════════════════════════════════════
//  FORMULAIRE CONTACT
// ══════════════════════════════════════
const submitBtn = document.getElementById('submitBtn');
const formError = document.getElementById('formError');

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const prenom  = document.getElementById('prenom').value.trim();
    const nom     = document.getElementById('nom').value.trim();
    const email   = document.getElementById('email').value.trim();
    const sujet   = document.getElementById('sujet').value;
    const message = document.getElementById('message').value.trim();

    if (!prenom || !nom || !email || !sujet || !message) {
      formError.textContent = 'Merci de remplir tous les champs obligatoires (*).';
      formError.style.display = 'block';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formError.textContent = 'Merci de saisir une adresse email valide.';
      formError.style.display = 'block';
      return;
    }

    formError.style.display = 'none';

    const budget = document.querySelector('input[name="budget"]:checked')?.value || 'Non précisé';
    const body   = `Bonjour Adrien,\n\nNom : ${prenom} ${nom}\nEmail : ${email}\nType de projet : ${sujet}\nBudget : ${budget}\n\n${message}`;
    window.location.href = `mailto:adrien68190@gmail.com?subject=Projet - ${encodeURIComponent(sujet)}&body=${encodeURIComponent(body)}`;

    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display  = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ══════════════════════════════════════
//  CAROUSEL BLENDER / TEASER — INDEX
// ══════════════════════════════════════
const teaserCarouselSources = {
  videos: [
    'images/vignette_vidéo_conception.png',
    'images/vignette_vidéo_musée_comp.png',
    'images/vignette_vidéo_espoir.png'
  ],
  blender: [
    '3D/reserveintro.png',
    '3D/reserveoutro.png',
    '3D/Interieurcaisse.png',
    '3D/mascotte_mains_oranges.png',
    '3D/mascotte_mains_vertes.png',
    '3D/mascotte_poulpe.png'
  ],
  crashtests: [
    'images/vignette_test_motion_text.png',
    'images/vignette_test_motion_shadow.png',
    'images/vignette_test_tracking_pannel.png',
    'images/vignette_test_incrustation_text.png'
  ]
};

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const key = carousel.dataset.carousel;
  const sources = teaserCarouselSources[key];
  if (!sources || sources.length === 0) return;

  const chosen = shuffleArray(sources).slice(0, 3);
  const wrapper = carousel.querySelector('.carousel-wrapper');
  const dots = carousel.querySelector('.carousel-dots');
  if (!wrapper || !dots) return;

  wrapper.innerHTML = '';
  dots.innerHTML = '';

  chosen.forEach((src, index) => {
    const img = document.createElement('img');
    img.className = `carousel-img${index === 0 ? '' : ' hidden'}`;
    img.src = src;
    img.alt = `${key} image ${index + 1}`;
    wrapper.appendChild(img);

    const dot = document.createElement('button');
    dot.className = `carousel-dot${index === 0 ? ' active' : ''}`;
    dot.dataset.index = index;
    dots.appendChild(dot);
  });
});

const carousels = document.querySelectorAll('.blender-carousel, .teaser-carousel');
carousels.forEach(carousel => {
  const images = carousel.querySelectorAll('.carousel-img');
  const dots = carousel.querySelectorAll('.carousel-dot');
  if (images.length === 0 || dots.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval;

  function showImage(index) {
    images.forEach(img => img.classList.add('hidden'));
    images[index].classList.remove('hidden');
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentIndex = index;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextImage, 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showImage(index);
      resetAutoPlay();
    });
  });

  startAutoPlay();
});
