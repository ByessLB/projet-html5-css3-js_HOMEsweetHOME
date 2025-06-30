// links.js
export function linksMenu(basePath = '') {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu__item a');

    menuLinks.forEach(link => {
        let href = link.getAttribute('href');

        // Ignore les liens externes
        if (href.startsWith('http')) return;

        // Création d’un lien absolu pour comparaison fiable
        const absoluteHref = new URL(href, window.location.href);
        console.log(absoluteHref);
        const linkPath = absoluteHref.pathname;

        // Mets à jour le href dans le DOM avec basePath si nécessaire
        if (!href.startsWith('http')) {
            link.setAttribute('href', basePath + href.replace(/^(\.\/|\.\.\/)*/, ''));
        }

        // Supprime index.html pour comparaison
        const normalizedCurrent = currentPath.endsWith('/index.html')
            ? currentPath.replace('/index.html', '')
            : currentPath;

        const normalizedLink = linkPath.endsWith('/index.html')
            ? linkPath.replace('/index.html', '')
            : linkPath;

        // Active le lien si correspond à la page courante
        if (normalizedLink === normalizedCurrent) {
            link.parentElement.classList.add('--active');
        } else {
            link.parentElement.classList.remove('--active');
        }

        console.log(normalizedCurrent)
        console.log(normalizedLink)
    });
}
