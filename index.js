const bgImg_div = document.querySelector(".bg-img");
let estado = false;

setInterval(() => {
    if (!estado) {
        bgImg_div.classList.add("ir");
        bgImg_div.classList.remove("voltar");
    } else {
        bgImg_div.classList.remove("ir");
        bgImg_div.classList.add("voltar");
    }
    estado = !estado;
}, 10000);

const imagesDiv = document.querySelector(".images");
const stopAnimation_btn = document.querySelector("#stopAnimation_input");
const inputIndex = document.querySelectorAll(".imagesIndex input");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

// PEGA A LARGURA REAL DE UMA IMAGEM + 5px de margem
const imgWidth = document.querySelector(".images img").offsetWidth + 5;
console.log(imgWidth);
const totalImgs = inputIndex.length;
const fullScroll = imgWidth * totalImgs;

stopAnimation_btn.checked = false;
imagesDiv.scrollBy(-fullScroll, 0);

inputIndex.forEach((input, index) => {
    input.checked = index === 0;
});

let intervalo = null;
let i = 0;

function animationFunct() {
    clearInterval(intervalo);

    if (!stopAnimation_btn.checked) {
        intervalo = setInterval(() => {
            imagesDiv.scrollBy(imgWidth, 0);
            i++;

            imagesDiv.classList.add("translate-1");

            if (i >= totalImgs) {
                i = 0;
                imagesDiv.scrollBy(-fullScroll, 0);
            }

            inputIndex.forEach((input) => (input.checked = false));
            inputIndex[i].checked = true;

            ajustarAlturaCarrossel();
        }, 5000);
    } else {
        clearInterval(intervalo);
    }
}

function passArtLeft() {
    if (imagesDiv.scrollLeft === 0) {
        imagesDiv.scrollBy(fullScroll, 0);
        i = totalImgs - 1;
    } else {
        imagesDiv.scrollBy(-imgWidth, 0);
        i--;
        ajustarAlturaCarrossel();
    }

    if (i < 0) i = totalImgs - 1;

    inputIndex.forEach((input) => (input.checked = false));
    inputIndex[i].checked = true;
}

function passArtRight() {
    if (imagesDiv.scrollLeft >= fullScroll - imgWidth) {
        imagesDiv.scrollBy(-fullScroll, 0);
        i = 0;
    } else {
        imagesDiv.scrollBy(imgWidth, 0);
        i++;
        ajustarAlturaCarrossel();
    }

    if (i >= totalImgs) i = 0;

    inputIndex.forEach((input) => (input.checked = false));
    inputIndex[i].checked = true;
}

function ajustarAlturaCarrossel() {
    if (window.innerWidth > 750) return;

    const images = document.querySelector(".images");
    const imagemAtual = document.querySelectorAll(".images .obra img")[i];

    if (!imagemAtual.complete) {
        imagemAtual.onload = () => {
            images.style.height = imagemAtual.offsetHeight + 50 + "px";
        };
    } else {
        images.style.height = imagemAtual.offsetHeight + 50 + "px";
    }
}

function blockBtn() {
    leftArrow.removeEventListener("click", passArtLeft);
    rightArrow.removeEventListener("click", passArtRight);

    if (!stopAnimation_btn.checked) {
        leftArrow.style.cursor = "not-allowed";
        rightArrow.style.cursor = "not-allowed";
    } else {
        leftArrow.style.cursor = "pointer";
        rightArrow.style.cursor = "pointer";

        leftArrow.addEventListener("click", passArtLeft);
        rightArrow.addEventListener("click", passArtRight);
    }
}

stopAnimation_btn.addEventListener("click", () => {
    animationFunct();
    blockBtn();
});

ajustarAlturaCarrossel();
animationFunct();
blockBtn();
