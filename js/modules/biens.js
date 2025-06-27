// biens.js
import { shuffleArray } from './utils.js';

let allBiens = [];

export async function initializeBiens(data) {
    allBiens = data;
}

export function getShuffledBiens(count = 6) {
    const shuffled = shuffleArray(allBiens);
    return shuffled.slice(0, count);
}

export function createBienElement(bien, isDetailed = false) {
    const image = `../assets/Image/biens/${bien.image}`;
    const div = document.createElement('div');
    div.className = 'bien__item';
    div.id = `${bien.id}`;

    if (isDetailed) {
        div.innerHTML = `
            <h4>${bien.type} ${bien.localisation} (${bien.code_postal})</h4>
            <img src="${image}" alt="${bien.localisation}" class="bien__item__img">
            <p>${bien.type} de ${bien.surface}m²<br>
            ${bien.nbr_pieces} pièces - ${bien.nbr_chambre} chambre(s)<br>
            ${bien.rue}</p>
        `;
    } else {
        div.innerHTML = `
            <h4 class="bien__item__title">${bien.type} ${bien.localisation} (${bien.code_postal})</h4>
            <img src="${image}" alt="${bien.localisation}" class="bien__item__img">
        `;
    }

    return div;
}

export function displayBiens(biens, containerId, isDetailed = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    biens.forEach(bien => {
        const element = createBienElement(bien, isDetailed);
        container.appendChild(element);
    });
}
