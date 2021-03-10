const uploadFile = document.querySelector('#upload')
const brightness = document.querySelector('#brightness');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = document.querySelector('img')
const downloadBtn = document.querySelector('.download__btn');
const reader = new FileReader();
let fileName;

let img = new Image();
canvas.width = 800;
canvas.height =  600;

function getImageSize() {
    let w = canvas.width;
    let nw = img.naturalWidth;
    let nh = img.naturalHeight;
    let aspect = nw / nh;
    let h = w / aspect;
    canvas.height = h;
    console.log('he', h , 'wid', w);
    
    ctx.drawImage(img, 0, 0, w, h)
}



uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0]
    if (file) {
        fileName = file.name;
    }

    reader.readAsDataURL(file);
    
    reader.addEventListener('load', () => {
        img = new Image();
        img.src = reader.result;
        
        img.onload = function () {
            getImageSize();
        }
    })
    
});

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('filter__input')) {
        if (e.target.classList.contains('filter__input-brightness')) {
            console.log(e.target);
        }
    }
});

downloadBtn.addEventListener('click', (e) => {
    let newFileName;
    if (!fileName) return;
    const fileExtension = fileName.toLowerCase().slice(-4);

    if (fileExtension === '.jpg' || fileExtension === '.png') {
        newFileName = fileName.substring(0, fileName.length - 4) +'-edited.jpg';
        console.log(newFileName);
    }
    download(canvas, newFileName) 
})
function download(canvas, fileName) {
    let e;
    const link = document.createElement('a');
    link.download = fileName
    link.href = canvas.toDataURL('image/jpg', 0.9);
    e = new MouseEvent('click');
    link.dispatchEvent(e)
}