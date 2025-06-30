// accordion.js

export function displayCollapse() {
    const collapses = document.querySelectorAll('.collapse')

    collapses.forEach((collapse) => {
        collapse.addEventListener('click', () => {
            collapses.forEach((other) => {
                if (other !== collapse && other.classList.contains('open')) {
                    other.classList.remove('open')
                }
            })
            collapse.classList.toggle('open')
        })
    })
}
