const donateInput = document.querySelector('#donate-panda');
const sideMenu = document.querySelector('.side-menu');
const burgerBtn = document.querySelector('.burger');
const sideMenuCloseBtn = document.querySelector('.side-menu__close');


burgerBtn.addEventListener('click', () => {
    sideMenu.classList.add('show');
});
sideMenuCloseBtn.addEventListener('click', () => {
    sideMenu.classList.remove('show')
})

donateInput.oninput = () => {
    if (donateInput.value > 4) {
        donateInput.value = donateInput.value.slice(0, 4);
    }
};

