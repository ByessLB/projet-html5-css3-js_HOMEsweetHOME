// avis.js
import { createCarrousel, setupAutoPlay } from './carrousel.js';

export function initializeAvisCarrousel() {
    const track = document.getElementById("carrousel-avis-track");
    const slides = document.querySelectorAll(".avis__bloc");

    if (!track) return;

    const { nextSlide } = createCarrousel(track, slides);
    setupAutoPlay(track, nextSlide);
}
