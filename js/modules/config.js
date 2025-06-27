// config.js
export const repoName = 'projet-html5-css3-js_HOMEsweetHOME';
export const baseURL = `${window.location.origin}/${repoName}/`;

// Gestion du basePath selon si on est dans /pages ou non
export const basePath = window.location.pathname.includes(`/${repoName}/pages`) ? '../' : './';