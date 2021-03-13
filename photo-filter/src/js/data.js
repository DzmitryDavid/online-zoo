function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

}
const setBg = (src) => document.body.style.backgroundImage = `url('${src}')`;

const setDarkTheme = () => {

    if (hour > 6 && hour < 12) {
    const src = getRandEl(morningImages);
    setBg(src);

    console.log('morning')
} else if (hour >= 12 && hour < 18) {
    setGreeting('Good afternoon');
    setBg(getRandEl(dayImages));
    setDarkTheme();
    console.log('afternoon')
} else if (hour >= 18 && hour < 24) {
    setGreeting('Good evening');
    setBg(getRandEl(eveningImages));
    setLightTheme();
    console.log('Good evening')
}
else {
    setGreeting('Good night');
    setBg(getRandEl(nightImages));
    setLightTheme();
    console.log('night')
}
}