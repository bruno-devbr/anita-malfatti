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
