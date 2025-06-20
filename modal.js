import { getDados } from "./req.js";

async function get(index) {
    const dadosGlobais = await getDados();
    openModal(dadosGlobais, index);
}

const imgModal = document.querySelector(".image img");
const tituloModal = document.querySelector("#titulo");

const texto1 = document.querySelector("#texto-1");
const texto2 = document.querySelector("#texto-2");

const tecnicaModal = document.querySelector("#tecnica");
const dimensoesModal = document.querySelector("#dimensoes");
const localModal = document.querySelector("#local");

function openModal(dadosGlobais, index) {
    modalDiv.style.display = "flex";

    imgModal.setAttribute(
        "src",
        `./images/obras/${dadosGlobais.obras[index].imagem}`
    );

    tituloModal.textContent = dadosGlobais.obras[index].titulo;
    texto1.textContent = dadosGlobais.obras[index].texto1;
    texto2.textContent = dadosGlobais.obras[index].texto2;

    tecnicaModal.textContent = dadosGlobais.obras[index].tecnica;
    dimensoesModal.textContent = dadosGlobais.obras[index].dimensoes;
    localModal.textContent = dadosGlobais.obras[index].local;
}

const modalDiv = document.querySelector(".modal-fundo");
const closeBtn = document.querySelector("#close");

function closeModal() {
    modalDiv.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

const img = document.querySelectorAll(".obra img");

img.forEach((image, index) => {
    image.addEventListener("click", () => {
        get(index);
    });
});
