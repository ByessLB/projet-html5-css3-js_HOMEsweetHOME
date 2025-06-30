// utils.js

/**
 * Charge du contenu HTML depuis un fichier externe et l'injecte dans un élément du DOM
 * @param {string} url - Chemin vers le fichier HTML
 * @param {string} targetElementId - ID de l'élément cible dans le DOM
 */
export async function loadHTMLContent(url, targetElementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const content = await response.text();
        const targetElement = document.getElementById(targetElementId);

        if (targetElement) {
            targetElement.innerHTML = content;
            getImageURL(targetElement);
            fixImagePaths(targetElement); // Corrige les chemins d'image dans le contenu injecté
            loadLazyImages(targetElement); // Active les images lazys
        } else {
            console.warn(`Élément avec l'ID '${targetElementId}' non trouvé.`);
        }
    } catch (error) {
        console.error(`Erreur lors du chargement de ${url}:`, error);
    }
}

/**
 * Charge un fichier JSON
 * @param {string} url - Chemin vers le fichier JSON
 * @returns {Promise<object|null>} Données JSON ou null en cas d’erreur
 */
export async function loadJSONData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`Erreur lors du chargement de ${url}:`, error);
        return null;
    }
}

/**
 * Mélange un tableau selon l'algorithme de Fisher-Yates
 * @param {Array} array - Tableau à mélanger
 * @returns {Array} Nouveau tableau mélangé
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function fixImagePaths(container) {
    const icons = container.querySelectorAll('img[data-src]');

    icons.forEach (icon => {
        let src = icon.getAttribute('data-src');
        const basePath = window.location.pathname.includes('pages') ? '../' : './';

        if (src && !src.startsWith('http') && !src.startsWith('./') && !src.startsWith('../')) {
            icon.setAttribute('data-src', `${basePath}${src}`);
        }
    })
}

export function loadLazyImages(container) {
    const lazyImages = container.querySelectorAll('img[data-src]');

    lazyImages.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
    })
}

/**
 * Génère un chemin correct vers une image en fonction de la page actuelle
 * @param {string} relativePath - Chemin relatif de l’image (ex: 'appart.jpg')
 * @returns {string} Chemin complet utilisable
 */
export function getImageURL(relativePath) {
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    return `${basePath}assets/Image/biens/${relativePath}`;
}