const startButton = document.querySelector('.start-btn');
startButton.addEventListener('click', init);

function renderKeys() {
    const pianoContainer = document.createElement('div');
    pianoContainer.innerHTML = `
    <div class="piano__key piano__key-white" data="c"></div>
    <div class="piano__key piano__key-black" data="c♯"></div>
    <div class="piano__key piano__key-white" data="d"></div>
    <div class="piano__key piano__key-black" data="d♯"></div>
    <div class="piano__key piano__key-white" data="e"></div>
    <div class="piano__key piano__key-white" data="f"></div>
    <div class="piano__key piano__key-black" data="f♯"></div>
    <div class="piano__key piano__key-white" data="g"></div>
    <div class="piano__key piano__key-black" data="g♯"></div>
    <div class="piano__key piano__key-white" data="a"></div>
    <div class="piano__key piano__key-black" data="a♯"></div>
    <div class="piano__key piano__key-white" data="b"></div>
    `;
    pianoContainer.classList.add('piano__container')
    document.querySelector('.container').append(pianoContainer);
    addMouseListeners(pianoContainer);
    setTimeout(() => {
        pianoContainer.classList.add('show')
    }, 100);
}

function addMouseListeners(pianoContainer) {
    pianoContainer.addEventListener('mousedown', getMouseTarget);
    pianoContainer.addEventListener('mousedown', addClass);
    pianoContainer.addEventListener('mouseup', removeClass);
    window.addEventListener('keydown', getKey);
    window.addEventListener('keyup', removeClass)
}

function addClass(e) {
    if (e.target === e.target.closest('.piano__container')) return
    e.target.classList.add('active');
}

function removeClass(e) {
    const allKeys = document.querySelectorAll('.piano__key');
    allKeys.forEach(key => key.classList.remove('active'));
    e.target.classList.remove('active');
}

function getMouseTarget (e) {
    const event = e.target;
    // console.log(event.closest('.piano__container'));
    
    if (event === event.closest('.piano__container')) return
    const note = event.getAttribute('data');
    audioPlay(note);
    
}

function getKeyboardKey (key) {
    key.classList.add('active')
    const note = key.getAttribute('data');
    audioPlay(note);
}

function audioPlay(note) {
    const audio = new Audio(`/assets/audio/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();
    
}

function getKey(e) {
    const allWhiteKeys = document.querySelectorAll('.piano__key-white');
    const allBlackKeys = document.querySelectorAll('.piano__key-black');
    const whiteKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    const blackKeys = ['s', 'd', 'h', 'j', 'k'];
    const whiteKeysIndex = whiteKeys.indexOf(e.key)
    const blackKeysIndex = blackKeys.indexOf(e.key)

    if(whiteKeysIndex > -1) getKeyboardKey(allWhiteKeys[whiteKeysIndex]);
    if(blackKeysIndex > -1) getKeyboardKey(allBlackKeys[blackKeysIndex]);
}


function init() {
    startButton.classList.add('hidden');
    renderKeys();

}  