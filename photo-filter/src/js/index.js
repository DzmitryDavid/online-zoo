const uploadFile = document.querySelector('#upload');
const brightness = document.querySelector('#brightness');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let sepiaInput = document.querySelector('#sepia');
let hueRotateInput = document.querySelector('#huerotate');
let saturateInput = document.querySelector('#saturate');
let blurInput = document.querySelector('#blur');
let invertInput = document.querySelector('#invert');

const revertBtn = document.querySelector('#revert');
const output = document.querySelectorAll('.filter__output')
const filterInputs = document.querySelectorAll('.filter__input');
const downloadBtn = document.querySelector('.download__btn');
const fullScreenBtn = document.querySelector('.header__fullscreen');
const nextImgBtn = document.querySelector('.header__buttons-next');
const prevImgBtn = document.querySelector('.header__buttons-prev');

let currentImage = 0;

const images = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

let image = new Image();
const reader = new FileReader();
let fileName;

function onFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) document.exitFullscreen();
    }
};

function getImage(arrImages, time) {
    let imgNum = arrImages[currentImage]
    image.src = `assets/img/${time}/${imgNum}.jpg`
    image.onload = renderImage;
    fileName = image.src.toString().slice(-14);
};

function renderImage() {
    canvas.height = image.height;
    canvas.width = image.width;
    ctx.drawImage(image, 0, 0, image.width, image.height)
};

function appFilter() {
    let saturate = saturateInput.value;
    let blur = blurInput.value;
    let invert = invertInput.value;
    let sepia = sepiaInput.value;
    let hueRotate = hueRotateInput.value;


    canvas.height = image.height;
    canvas.width = image.width;
    ctx.filter = `sepia(${sepia}%) 
    hue-rotate(${hueRotate}deg) 
    blur(${blur}px) 
    saturate(${saturate}%)
    invert(${invert}%)`;

    ctx.drawImage(image, 0, 0, image.width, image.height)
}

function removeFilters() {
    filterInputs.forEach(filter => {
        filter.value = '0';
        if (filter.classList.contains('filter__input-saturate')) {
            filter.value = '100';
        }
    });
    ctx.filter = 'none';
    getValues()
    ctx.drawImage(image, 0, 0, image.width, image.height);
}

function getValues() {
    let arr = []
    let valuesArr = Array.from(filterInputs)
    valuesArr.map(item => {
        arr.push(item.value)
    })
    output.forEach((item, i) => {
        item.textContent = arr[i]
    })
}
getValues()

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('filter__input')) {
        e.target.addEventListener('mousemove', () => {
           
            getValues();
            appFilter();
        })
    }
});

function download(canvas, fileName) {
    let e;
    const link = document.createElement('a');
    link.download = fileName
    link.href = canvas.toDataURL('image/jpg', 1);
    
    e = new MouseEvent('click');
    link.dispatchEvent(e)
}

downloadBtn.addEventListener('click', (e) => {
    let newFileName;
    if (!fileName) return;
    const fileExtension = fileName.toLowerCase().slice(-4);
    
    if (fileExtension === '.jpg' || fileExtension === '.png') {
        newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
    }
    download(canvas, newFileName)
});

uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0]
    
    if (file) {
        fileName = file.name;
    }
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
        image = new Image();
        image.src = reader.result;

        image.onload = function (e) {
            appFilter(e)
        }
    })
});
    
const setImageTime = () => {
    let today = new Date();
    let hour = today.getHours();
    console.log(hour);
    
    if (hour >= 6 && hour < 12) {
        getImage(images, 'morning');
    } else if (hour >= 12 && hour < 18) {
        getImage(images, 'day');
    } else if (hour >= 18 && hour < 0) {
        getImage(images, 'evening');
    } else {
        getImage(images, 'night');
        
    }
}
setImageTime()

nextImgBtn.addEventListener('click', () => {
    currentImage++
    if (currentImage === images.length) {
        currentImage = 0;
    }
    setImageTime()
});
prevImgBtn.addEventListener('click', () => {
    currentImage--;
    if (currentImage < 0) {
        currentImage = images.length - 1;
    }
    setImageTime()
});

revertBtn.addEventListener('click', removeFilters)
fullScreenBtn.addEventListener('click', onFullScreen);