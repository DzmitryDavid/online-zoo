const donateInput = document.querySelector('#donate-gorillas');

donateInput.oninput = () => {
    if (donateInput.value > 4) {
        donateInput.value = donateInput.value.slice(0, 4);
    }
};
