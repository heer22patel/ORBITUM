document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.primary-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
});