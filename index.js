const bgImg_div = document.querySelector(".bg-img");

let estado = false;

// Alterna entre as classes .ir e .voltar a cada 10 segundos
setInterval(() => {
    if (!estado) {
        bgImg_div.classList.add("ir"); // Aplica animação para a esquerda
        bgImg_div.classList.remove("voltar");
    } else {
        bgImg_div.classList.remove("ir");
        bgImg_div.classList.add("voltar"); // Aplica animação para a direita
    }
    estado = !estado;
}, 10000);

let i = 0;

const imagesDiv = document.querySelector(".images");
const stopAnimation_btn = document.querySelector("#stopAnimation_input");
const inputIndex = document.querySelectorAll(".imagesIndex input");

imagesDiv.scrollBy(-3150, 0);

let intervalo;
stopAnimation_btn.checked = false;

inputIndex.forEach((input, index) => {
    input.checked = index === 0;
});

function animationFunct() {
    if (stopAnimation_btn.checked == false) {
        intervalo = setInterval(() => {
            imagesDiv.scrollBy(450, 0);
            i++;

            if (i >= 8) {
                i = 0;
                imagesDiv.scrollBy(-3600, 0);
            }

            if (i == 0) {
                inputIndex[7].checked = false;
            } else {
                inputIndex[i - 1].checked = false;
            }

            inputIndex[i].checked = true;
        }, 1000);
    } else {
        clearInterval(intervalo);
    }
}

stopAnimation_btn.addEventListener("click", animationFunct);
animationFunct();

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

function passArtLeft() {
    if (imagesDiv.scrollLeft === 0) {
        imagesDiv.scrollBy(3150, 0);
        i = 7;
    } else {
        imagesDiv.scrollBy(-450, 0);
        i--;
    }

    if (i == 7) {
        inputIndex[0].checked = false;
    } else {
        inputIndex[i + 1].checked = false;
    }

    inputIndex[i].checked = true;
}

function passArtRight() {
    if (imagesDiv.scrollLeft === 3150) {
        imagesDiv.scrollBy(-3150, 0);
        i = 0;
    } else {
        imagesDiv.scrollBy(450, 0);
        i++;
    }

    inputIndex[i].checked = true;

    if (i == 8) {
        i = 0;
    }

    if (i == 0) {
        inputIndex[7].checked = false;
    } else {
        inputIndex[i - 1].checked = false;
    }
}

leftArrow.addEventListener("click", passArtLeft);
rightArrow.addEventListener("click", passArtRight);
