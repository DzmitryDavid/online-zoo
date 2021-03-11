const uploadFile = document.querySelector('#upload')
const brightness = document.querySelector('#brightness');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const revert = document.querySelector('#revert')


const downloadBtn = document.querySelector('.download__btn');
const reader = new FileReader();
let fileName;

let img = new Image();
console.log();


function renderImage(e) {
    canvas.height =  img.height;
    canvas.width = img.width;
    // let w = canvas.width;
    // let nw = img.naturalWidth;
    // let nh = img.naturalHeight;
    // let aspect = nw / nh;
    // let h = w / aspect;
    // canvas.height = h;
    
    // let val = e.target.value
    if (e.target.classList.contains('filter__input')) {
        let sepia = document.querySelector('#sepia').value;
        let hueRotate = document.querySelector('#huerotate').value;
        let saturate = document.querySelector('#saturate').value;
        let blur = document.querySelector('#blur').value;
        let invert = document.querySelector('#invert').value;

        ctx.filter = `sepia(${sepia}%) 
        hue-rotate(${hueRotate}deg) 
        blur(${blur}px) 
        saturate(${saturate}%)
        invert(${invert}%)`;
    }
    revert.addEventListener('click', () => {
        const filters = document.querySelectorAll('.filter__input');
        
        filters.forEach(filter => {
            filter.value = '0';
            if (filter.classList.contains('filter__input-saturate')) {
                filter.value = '100';
            }
        });

        ctx.filter = 'none';
        ctx.drawImage(img, 0, 0, img.width, img.height)
    })
    ctx.drawImage(img, 0, 0, img.width, img.height)
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
        
        img.onload = function (e) {
            renderImage(e);
            
        }
    })
});


document.addEventListener('change', (e) => {
    if (e.target.classList.contains('filter__input')) {
        renderImage(e)        
    }
});

// save | download
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
    link.href = canvas.toDataURL('image/jpg', 1);
    e = new MouseEvent('click');
    link.dispatchEvent(e)
}