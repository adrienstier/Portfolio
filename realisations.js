// realisations.js
// Injecte dynamiquement les cartes de projets dans `realisations.html`.
// Remplis le tableau `projects` avec tes éléments réels.

const projects = [
  // Vidéos fournies par l'utilisateur (embed YouTube)
  {
    type: 'youtube',
    id: 'JXGi1k13P0I',
    title: 'Conception',
    meta: ''
  },
  {
    type: 'youtube',
    id: 'vsSeOggrKm0',
    title: "Le Musée des Comp'",
    meta: ''
  },
  {
    type: 'youtube',
    id: 'vw3VeL0-6jI',
    title: 'Espoir (ma première création)',
    meta: ''
  }
];

const blenderProjects = [
  {
    type: 'model',
    title: 'Réserve',
    meta: 'Même bâtiment, deux versions',
    description: 'Deux variantes du bâtiment “Réserve” : intro et outro.',
    gallery: [
      '3D/reserveintro.png',
      '3D/reserveoutro.png'
    ]
  },
  {
    type: 'model',
    title: 'Crate',
    meta: 'Intérieur de caisse',
    description: 'Modèle “Crate” avec vue intérieure détaillée.',
    gallery: [
      '3D/Interieurcaisse.png'
    ]
  },
  {
    type: 'model',
    title: 'Mascotte mains',
    meta: 'Projet 3D stylisé',
    description: 'Mascotte mains, une création originale de ta galerie.',
    gallery: [
      '3D/mascotte_mains_oranges.png',
      '3D/mascotte_mains_vertes.png'
    ]
  },
  {
    type: 'model',
    title: 'Mascotte poulpe',
    meta: 'Projet 3D original',
    description: 'Mascotte poulpe 3D, ajoutée dans ta galerie.',
    gallery: [
      '3D/mascotte_poulpe.png'
    ]
  }
];

const crashProjects = [
  {
    type: 'youtube',
    id: 'pHjAwigYBy4',
    title: 'Incrustation texte',
    meta: 'Crash test'
  },
  {
    type: 'youtube',
    id: 'B5IPqhyAwH8',
    title: 'Motion text',
    meta: 'Crash test'
  },
  {
    type: 'youtube',
    id: '-NvbcADjGUA',
    title: 'Motion shadow',
    meta: 'Crash test'
  },
  {
    type: 'youtube',
    id: 'YDtechKIC0Q',
    title: 'Tracking pannel info',
    meta: 'Crash test'
  }
];

function createYouTubeCard(p) {
  const card = document.createElement('div');
  card.className = 'real-card';

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'real-thumb';

  const iframe = document.createElement('iframe');
  iframe.width = '560';
  iframe.height = '315';
  iframe.src = `https://www.youtube.com/embed/${p.id}`;
  iframe.title = p.title || 'Vidéo YouTube';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  thumbWrap.appendChild(iframe);

  const info = document.createElement('div');
  info.className = 'real-info';
  const title = document.createElement('div');
  title.className = 'real-title';
  title.textContent = p.title || '';
  const meta = document.createElement('div');
  meta.className = 'real-meta';
  meta.textContent = p.meta || '';
  info.appendChild(title);
  info.appendChild(meta);

  card.appendChild(thumbWrap);
  card.appendChild(info);
  return card;
}

function createImageCard(p) {
  const card = document.createElement('div');
  card.className = 'real-card';

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'real-thumb';
  const img = document.createElement('img');
  img.src = p.thumb;
  img.alt = p.title || '';
  thumbWrap.appendChild(img);

  const info = document.createElement('div');
  info.className = 'real-info';
  const title = document.createElement('div');
  title.className = 'real-title';
  title.textContent = p.title || '';
  const meta = document.createElement('div');
  meta.className = 'real-meta';
  meta.textContent = p.meta || '';
  info.appendChild(title);
  info.appendChild(meta);

  card.appendChild(thumbWrap);
  card.appendChild(info);
  return card;
}

function createModelCard(p) {
  const card = document.createElement('div');
  card.className = 'real-card';

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'real-thumb blender-thumb';

  const gallery = document.createElement('div');
  gallery.className = 'model-gallery';

  let currentIndex = 0;
  const mediaWrapper = document.createElement('div');
  mediaWrapper.className = 'gallery-media';

  const buildMedia = src => {
    mediaWrapper.innerHTML = '';
    const img = document.createElement('img');
    img.className = 'gallery-image';
    img.alt = p.title || '';
    img.src = src;
    mediaWrapper.appendChild(img);
  };

  buildMedia(p.gallery[0]);

  if (p.gallery && p.gallery.length > 1) {
    const controls = document.createElement('div');
    controls.className = 'gallery-controls';

    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'gallery-control';
    prev.textContent = '‹';
    prev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + p.gallery.length) % p.gallery.length;
      buildMedia(p.gallery[currentIndex]);
    });

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'gallery-control';
    next.textContent = '›';
    next.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % p.gallery.length;
      buildMedia(p.gallery[currentIndex]);
    });

    controls.appendChild(prev);
    controls.appendChild(next);
    gallery.appendChild(controls);
  }

  gallery.appendChild(mediaWrapper);
  thumbWrap.appendChild(gallery);

  const info = document.createElement('div');
  info.className = 'real-info';
  const title = document.createElement('div');
  title.className = 'real-title';
  title.textContent = p.title || '';
  const meta = document.createElement('div');
  meta.className = 'real-meta';
  meta.textContent = p.meta || '';

  const description = document.createElement('div');
  description.className = 'real-description';
  description.textContent = p.description || '';

  info.appendChild(title);
  info.appendChild(meta);
  info.appendChild(description);

  card.appendChild(thumbWrap);
  card.appendChild(info);
  return card;
}

function renderProjects() {
  const grid = document.getElementById('videosGrid');
  if (!grid) return;
  grid.innerHTML = '';
  projects.forEach(p => {
    let node;
    if (p.type === 'youtube') node = createYouTubeCard(p);
    else node = createImageCard(p);
    grid.appendChild(node);
  });

  const blenderGrid = document.getElementById('blenderGrid');
  if (blenderGrid) {
    blenderGrid.innerHTML = '';
    blenderProjects.forEach(p => {
      const node = createModelCard(p);
      blenderGrid.appendChild(node);
    });
  }

  const crashGrid = document.getElementById('crashGrid');
  if (crashGrid) {
    crashGrid.innerHTML = '';
    crashProjects.forEach(p => {
      const node = createYouTubeCard(p);
      crashGrid.appendChild(node);
    });
  }

  // Si aucun projet, afficher un message d'aide
  if (projects.length === 0) {
    const help = document.createElement('div');
    help.className = 'real-card add-card';
    help.innerHTML = '<div class="add-icon">+</div><div class="add-text">Aucun projet configuré. Ajoute des objets dans <code>realisations.js</code> (tableau `projects`) avec les IDs YouTube ou les miniatures.</div>';
    grid.appendChild(help);
  }
}

// Expose render pour appels manuels si nécessaire
window.realisations = { projects, renderProjects };

// Auto-render au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProjects);
} else {
  renderProjects();
}
