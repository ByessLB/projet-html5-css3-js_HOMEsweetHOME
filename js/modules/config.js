// config.js
export const repoName = 'projet-html5-css3-js_HOMEsweetHOME';
const currentPage = window.location.pathname.split('/').pop();
export const baseURL = currentPage === '' || currentPage === 'index.html' || currentPage === 'repoName' ? './' : '../';
