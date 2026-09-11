// Ce script doit être chargé de manière synchrone AVANT le CSS.
// Il applique immédiatement le thème sauvegardé, évitant tout flash visuel.
document.documentElement.setAttribute(
  'data-theme',
  localStorage.getItem('theme') || 'dark'
);
