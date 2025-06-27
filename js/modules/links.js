// links.js
export function linksMenu(basePath = '') {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu__item a');

    menuLinks.forEach(link => {
        let href = link.getAttribute('href');

        if (!href.startsWith('http') && !href.startsWith(basePath)){
            href = `${basePath}${href}`;
            link.setAttribute('href', href);
        };

        const linkPath = new URL(href, window.location.origin).pathname;

        if (linkPath === currentPath || (linkPath.endsWith('index.html') && currentPath === '/')) {
            link.parentElement.classList.add('--active');
        } else {
            link.parentElement.classList.remove('--active');
        }
    });
}