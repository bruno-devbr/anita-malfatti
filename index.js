const bgImg_div = document.querySelector(".bg-img"); // DOM da div das imgs de fundo
let estado = false; // guarda se o estado é true/false para a img ir/voltar

// Alterna entre as classes .ir e .voltar a cada 10 segundos
setInterval(() => {
    if (!estado) {
        bgImg_div.classList.add("ir"); // Aplica animação para a esquerda
        bgImg_div.classList.remove("voltar");
    } else {
        bgImg_div.classList.remove("ir");
        bgImg_div.classList.add("voltar"); // Aplica animação para a direita
    }

    estado = !estado; // inverte o valor de estado
}, 10000);

// DOM de da div das obras; btn de parar animação; inputs radio;
const imagesDiv = document.querySelector(".images");
const stopAnimation_btn = document.querySelector("#stopAnimation_input");
const inputIndex = document.querySelectorAll(".imagesIndex input");

// desativa o btn e poe a primeira obra como visivel
stopAnimation_btn.checked = false;
imagesDiv.scrollBy(-3150, 0);

// desativa todos os inputs e so deixa o primeiro marcado
inputIndex.forEach((input, index) => {
    input.checked = index === 0;
});

// variaveis que guarda o setInterval e o indice da obra
let intervalo = null;
let i = 0;

// se btn desmarcado passa a obra a cada 5s
function animationFunct() {
    if (stopAnimation_btn.checked == false) {
        intervalo = setInterval(() => {
            imagesDiv.scrollBy(450, 0);
            i++;

            imagesDiv.classList.add("translate-1");

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
        }, 5000);
    } else {
        clearInterval(intervalo);
    }
}

// ao clicar no btn passa para a proxima obra
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

// ao clicar no btn passa para a ultima obra
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

// btns de passar e voltar obras
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

// se pular animação desmarcado blqueia as funções, caso marcado ele ativa
function blockBtn() {
    if (stopAnimation_btn.checked == false) {
        leftArrow.style.cursor = "not-allowed";
        rightArrow.style.cursor = "not-allowed";

        leftArrow.removeEventListener("click", passArtLeft);
        rightArrow.removeEventListener("click", passArtRight);
    } else {
        leftArrow.style.cursor = "pointer";
        rightArrow.style.cursor = "pointer";

        leftArrow.addEventListener("click", passArtLeft);
        rightArrow.addEventListener("click", passArtRight);
    }
}

// chama todos os eventos para as obras ao ser clicado
stopAnimation_btn.addEventListener("click", () => {
    animationFunct();
    blockBtn();
});

// chama todos os eventos para as obras
animationFunct();
blockBtn();
