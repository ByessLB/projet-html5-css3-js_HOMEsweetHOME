// modal.js
let currentSlide = 0;
let biens = [];
let basePath = './';

export function initializeModalWithBiens(allBiens, basePathParam) {
  biens = allBiens;
  basePath = basePathParam;

  const modal = document.getElementById('propertyModal');
  const modalClose = document.getElementById('modalClose');
  const track = document.getElementById('carrousel-track');
  const nextBtn = document.querySelector('.carrousel__btn--next');
  const prevBtn = document.querySelector('.carrousel__btn--prev');

  if (!modal || !modalClose || !track || !nextBtn || !prevBtn) return;

  // gestion d'apparition des boutons swipe
  if (biens.length <= 1) {
    nextBtn.style.visibility = 'hidden';
    prevBtn.style.visibility = 'hidden';
  } 

  // Affiche un bien dans la modale selon l'index
  function showBienInModal(index) {
    const bien = biens[index];
    if (!bien) return;
    const image = `${basePath}assets/Image/biens/${bien.image}`;
    track.innerHTML = `
      <div class="carrousel__item modal-carrousel__item">
        <img src="${image}" alt="${bien.type}" class="modal-carousel__img">
        <h3>${bien.type} - ${bien.localisation}</h3>
        <p>${bien.nbr_pieces} pièces | ${bien.surface} m²</p>
        <p>${bien.rue}, ${bien.code_postal}</p>
        <p><strong>Description :</strong> ${bien.description}</p>
      </div>
    `;
  }

  // Ouvre la modale et affiche le bien cliqué
  document.body.addEventListener('click', (e) => {
    const item = e.target.closest('.bien__item');
    if (!item) return;

    const items = [...document.querySelectorAll('.bien__item')];
    const index = items.indexOf(item);
    if (index === -1) return;

    currentSlide = index;
    showBienInModal(currentSlide);
    modal.classList.add('active');
  });

  // Fermer modale
  modalClose.addEventListener('click', () => modal.classList.remove('active'));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  // Bouton suivant
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % biens.length;
    showBienInModal(currentSlide);
  });

  // Bouton précédent
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + biens.length) % biens.length;
    showBienInModal(currentSlide);
  });
}

export function modalConnexion() {
  const authForm = document.getElementById("auth-form");
  const btnClose = document.getElementById("closeForm");
  const iconUser = document.getElementById('icon-user');
  console.log(authForm);
  const liConnexion = document.getElementById('connection-modal');

  iconUser.addEventListener('click', () => {
    authForm.classList.add('active');
  })

  liConnexion.addEventListener('click', () => {
    authForm.classList.add('active');
  })

  btnClose.addEventListener('click', () => authForm.classList.remove('active'));

}