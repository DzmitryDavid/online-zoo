const donateInput = document.querySelector('#donate-main');
const sideMenu = document.querySelector('.side-menu');
const burgerBtn = document.querySelector('.burger');
const sideMenuCloseBtn = document.querySelector('.side-menu__close');

// popup
const popupOverlay = document.querySelector('.popup-overlay');
const popupCare = document.querySelector('.popup__care');
const popupDonate = document.querySelector('.popup-donate');
const popupInfo = document.querySelector('.popup-info'); 
const popupPayment = document.querySelector('.popup-payment');

// popup-btns:next/back
const popupDonateNextBtn = document.querySelector('.donate-form__footer-btn');
const popupInfoNextBtn = document.querySelector('#popup-info__btn');
const popupDonateBtnBack = document.querySelector('#donate-backBtn');
const popupPaymentBack = document.querySelector('.popup-payment__footer-btn');
const popupCareBtns = document.querySelector('.popup__care-buttons');
const popupDonateBtns = document.querySelectorAll('.popup-donate__buttons');
const popupCompleteBtn = document.querySelector('#complete-btn');
const donateBtn = document.querySelector('.feed__button-donate');
const closePopup = document.querySelector('.close');
// popup-inputs
const donateFooter = document.querySelector('.footer__button-main');
const popupBtns = document.querySelectorAll('.popup__care-buttons-btn');
const quickDonateBtn = document.querySelector('.donation__btn');
const popupDonateInput = document.querySelector('.donate-form__input');
const popupDonateBtn = document.querySelector('.donate-form__btn');
const tenDollarsBtn = document.querySelector('.popup-donate__buttons-btn');
const popupPaymentCvv = document.querySelector('.popup-payment__form-input--cvv')
const popupPaymentCard = document.querySelector('.popup-payment__form-input--card')

// 

const addClass = (el) => {
  el.classList.add('show-popup');
  document.body.style.overflow = 'hidden';
};

const removeClass = (el) => {
  el.classList.remove('show-popup');
  document.body.style.overflow = 'visible';
};

popupDonateBtnBack.addEventListener('click', () => {
  removeClass(popupInfo);
  addClass(popupDonate);
});

popupDonateNextBtn.addEventListener('click',() => {
  removeClass(popupDonate);
  addClass(popupInfo);
});

popupInfoNextBtn.addEventListener('click', () => {
  removeClass(popupInfo);
  addClass(popupPayment);
})

popupPaymentBack.addEventListener('click', () => {
  removeClass(popupPayment);
  addClass(popupInfo);
});

popupCompleteBtn.addEventListener('click', () => {
  alert('Success!Donation complete. Thank you!')
});

popupPaymentCvv.addEventListener('input', () => {
  if (popupPaymentCvv.value > 3) {
    popupPaymentCvv.value = popupPaymentCvv.value.slice(0, 3);
}
});
popupPaymentCard.addEventListener('input', () => {
  if (popupPaymentCard.value > 16) {
    popupPaymentCard.value = popupPaymentCard.value.slice(0, 16);
}
});

popupCareBtns.addEventListener('click', (e) => {
  let donate = e.target;
});



popupBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    removeClass(popupCare);
    addClass(popupDonate)
  })
});

donateBtn.addEventListener('click', () => {
  addClass(popupCare);
  addClass(popupOverlay);
});

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    removeClass(popupOverlay);
    removeClass(popupCare);
    removeClass(popupDonate);
  }
});

closePopup.addEventListener('click', () => {
  removeClass(popupOverlay);
  document.body.style.overflow = 'visible';
});

donateFooter.addEventListener('click', () => {
  addClass(popupOverlay);
  addClass(popupCare);
});

quickDonateBtn.addEventListener('click', () => {
  addClass(popupDonate);
  addClass(popupOverlay);
  if (donateInput.value === '') {
    tenDollarsBtn.style.backgroundColor = '#00a092';
  } else {
    tenDollarsBtn.style.backgroundColor = 'rgba(0, 160, 146, 0.5)';
  }
  
  if (popupDonateInput.value !== '') {
    popupDonateBtn.style.backgroundColor = 'rgba(0, 160, 146, 0.5)';
  } else {
    popupDonateBtn.style.backgroundColor = '#00a092';
  }
});

burgerBtn.addEventListener('click', () => {
  sideMenu.classList.add('show');
});
sideMenuCloseBtn.addEventListener('click', () => {
  sideMenu.classList.remove('show')
});

donateInput.oninput = () => {
  let value = donateInput.value;
  popupDonateInput.value = value;
  if (donateInput.value > 4) {
    
    donateInput.value = donateInput.value.slice(0, 4);
  }
};

popupDonateInput.addEventListener('input', () => {
  console.log(popupDonateInput.value);
  if (popupDonateInput.value !== '') {
    popupDonateBtn.style.backgroundColor = '#00a092';
  } else {
    popupDonateBtn.style.backgroundColor = 'rgba(0, 160, 146, 0.5)';

  }
  if (popupDonateInput.value > 4) {
      popupDonateInput.value = popupDonateInput.value.slice(0, 4);
  }
  
})


