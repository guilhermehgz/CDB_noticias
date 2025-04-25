const tabuleiro = document.getElementById("tabuleiro");
const reiniciarBtn = document.getElementById("reiniciar");
const voltarBtn = document.getElementById("voltar");
const dificuldadeSelect = document.getElementById("dificuldade");

let cartas = [];
let cartasViradas = [];
let totalCartasViradas = 0;
let numPar = 0;

const dificuldadeConfig = {
    easy: { pares: 4, imagens: ["🍎", "🍌", "🍒", "🍇"] },
    medium: { pares: 6, imagens: ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊"] },
    hard: { pares: 8, imagens: ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🍓", "🍍"] }
};

// Função para iniciar o jogo com base na dificuldade
function iniciarJogo() {
    tabuleiro.innerHTML = "";
    cartas = [];
    numPar = 0;
    totalCartasViradas = 0;
    cartasViradas = [];

    const dificuldade = dificuldadeSelect.value;
    const config = dificuldadeConfig[dificuldade];
    const imagens = [...config.imagens, ...config.imagens];

    imagens.sort(() => Math.random() - 0.5);

    imagens.forEach(imagem => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.innerHTML = `
            <div class="frente">?</div>
            <div class="verso">${imagem}</div>
        `;
        carta.onclick = () => virarCarta(carta);
        cartas.push(carta);
        tabuleiro.appendChild(carta);
    });

    const numColunas = Math.sqrt(imagens.length);
    tabuleiro.style.gridTemplateColumns = `repeat(${numColunas}, 120px)`;
}

function virarCarta(carta) {
    if (cartasViradas.length < 2 && !carta.classList.contains("flipped")) {
        carta.classList.add("flipped");
        cartasViradas.push(carta);
        totalCartasViradas++;

        if (cartasViradas.length === 2) {
            checarPar();
        }
    }
}

function checarPar() {
    const [carta1, carta2] = cartasViradas;
    const imagem1 = carta1.querySelector(".verso").textContent;
    const imagem2 = carta2.querySelector(".verso").textContent;

    if (imagem1 === imagem2) {
        numPar++;
        if (numPar === cartas.length / 2) {
            setTimeout(() => alert("Parabéns, você venceu!"), 500);
        }
        cartasViradas = [];
    } else {
        setTimeout(() => {
            carta1.classList.remove("flipped");
            carta2.classList.remove("flipped");
            cartasViradas = [];
        }, 1000);
    }
}

// Reiniciar o jogo
reiniciarBtn.onclick = () => {
    iniciarJogo();
};

// Voltar à página de jogos
voltarBtn.onclick = function() {
    window.location.href = "../games.html";  // Redireciona para a página games.html
};

// Iniciar o jogo ao carregar a página
iniciarJogo();
