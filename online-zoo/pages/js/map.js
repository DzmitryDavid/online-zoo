const sideMenu = document.querySelector('.side-menu');
const burgerBtn = document.querySelector('.burger');
const sideMenuCloseBtn = document.querySelector('.side-menu__close');


burgerBtn.addEventListener('click', () => {
    sideMenu.classList.add('show');
});
sideMenuCloseBtn.addEventListener('click', () => {
    sideMenu.classList.remove('show')
})