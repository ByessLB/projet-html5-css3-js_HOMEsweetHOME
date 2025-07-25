// main.js
import { loadHTMLContent, loadJSONData, shuffleArray } from './modules/utils.js'
import { displayBiens } from './modules/biens.js'
import { createCarrousel, setupAutoPlay } from './modules/carrousel.js'
import { initializeModalWithBiens, modalConnexion } from './modules/modal.js'
import { linksMenu } from './modules/links.js'
import { baseURL } from './modules/config.js'
import { displayCollapse } from './modules/accordion.js'

let allBiens = []

async function loadAllBiens() {
    const biensData = await loadJSONData(`${baseURL}data/properties.json`)
    if (biensData) {
        allBiens = biensData
    }
}

function initializeRangeInputs() {
    const rangeInputs = document.querySelectorAll('input[type="range"]')
    rangeInputs.forEach((input) => {
        const label = document.createElement('span')
        label.style.marginLeft = '0.5rem'
        label.classList.add('range-value')
        input.after(label)
        const updateLabel = () => (label.textContent = input.value)
        input.addEventListener('input', updateLabel)
        updateLabel()
    })
}

function displayRandomBiens() {
    if (!allBiens.length) return
    const shuffled = shuffleArray(allBiens).slice(0, 6)
    displayBiens(shuffled, 'biens-container', false)
}

function displayAllBiens() {
    if (!allBiens.length) return
    displayBiens(allBiens, 'container-locations', true)
}

function initializeCarrouselAvis() {
    const track = document.getElementById('carrousel-avis-track')
    const slides = document.querySelectorAll('.avis__bloc')
    if (!track || !slides.length) return
    const { nextSlide } = createCarrousel(track, slides)
    setupAutoPlay(track, nextSlide)
}

async function main() {
    await Promise.all([
        loadHTMLContent(`${baseURL}pages/header.html`, 'header'),
        loadHTMLContent(`${baseURL}pages/footer.html`, 'footer'),
        loadAllBiens(),
    ])

    linksMenu(baseURL);
    initializeRangeInputs()
    initializeCarrouselAvis()
    displayRandomBiens()
    displayAllBiens()
    displayCollapse()
    modalConnexion()
    initializeModalWithBiens(allBiens, baseURL);
}

document.addEventListener('DOMContentLoaded', main)
