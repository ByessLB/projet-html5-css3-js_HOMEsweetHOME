// carrousel.js
export function createCarrousel(track, slides, onNavigate = null) {
    if (!track || slides.length === 0) return console.warn("Éléments manquants pour le carrousel");

    let currentIndex = 0;

    function updateCarrousel() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        if (onNavigate) onNavigate(currentIndex);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarrousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarrousel();
    }

    const nextBtn = document.querySelector(".carrousel__btn--next");
    const prevBtn = document.querySelector(".carrousel__btn--prev");

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);
    }

    window.addEventListener("resize", updateCarrousel);

    updateCarrousel();

    return { updateCarrousel, nextSlide, prevSlide };
}

export function setupAutoPlay(track, nextSlide) {
    let autoplay;

    function startAutoPlay() {
        autoplay = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
        clearInterval(autoplay);
    }

    track.addEventListener("mouseenter", stopAutoPlay);
    track.addEventListener("mouseleave", startAutoPlay);

    startAutoPlay();
}
