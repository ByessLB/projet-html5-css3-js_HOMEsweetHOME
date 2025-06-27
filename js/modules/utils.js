// utils.js
export async function loadHTMLContent(url, targetElementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const content = await response.text();
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) targetElement.innerHTML = content;
        else console.warn(`Élément avec l'ID '${targetElementId}' non trouvé.`);
    } catch (error) {
        console.error(`Erreur lors du chargement de ${url}:`, error);
    }
}

// Charger un fichier JSON
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

// Mélanger un tableau (Fisher-Yates)
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 
