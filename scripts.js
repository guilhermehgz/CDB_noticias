const express = require('express');
const app = express();
const path = require('path');

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Rota para a API de notícias
app.get('/api/noticias', (req, res) => {
  res.json([
    { titulo: "Notícia 1", data: "2025-04-01", link: "noticia1.html" },
    { titulo: "Notícia 2", data: "2025-04-02", link: "noticia2.html" }
  ]);
});

// Lista de links de vídeos para o carrossel
const videoLinks = [
    "https://www.youtube.com/embed/tqyeLuEwCQc",
    "https://www.youtube.com/embed/video2",
    "https://www.youtube.com/embed/video3",
    "https://www.youtube.com/embed/video4",
    "https://www.youtube.com/embed/video5"
];

let currentVideoIndex = 0; // Índice do vídeo atualmente exibido

/**
 * Atualiza o vídeo exibido no player com base no índice atual.
 */
function updateVideo() {
    const player = document.getElementById("videoPlayer"); // Seleciona o elemento do player de vídeo

    // Verifica se o vídeo atual já está sendo exibido
    if (player.src !== videoLinks[currentVideoIndex]) {
        player.src = videoLinks[currentVideoIndex]; // Atualiza o link do vídeo apenas se for diferente
    }
}

/**
 * Exibe o vídeo anterior no carrossel.
 */
function previousVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoLinks.length) % videoLinks.length; // Calcula o índice do vídeo anterior
    updateVideo(); // Atualiza o vídeo no player
}

/**
 * Exibe o próximo vídeo no carrossel.
 */
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoLinks.length; // Calcula o índice do próximo vídeo
    updateVideo(); // Atualiza o vídeo no player
}

// Botão secreto para login
window.addEventListener("DOMContentLoaded", () => {
    const inicio = document.getElementById("inicio");
    const botao = document.getElementById("botao-secreto");
    let hoverTimer;
    let hideTimer;

    if (inicio && botao) {
        inicio.addEventListener("mouseenter", () => {
            clearTimeout(hideTimer);

            hoverTimer = setTimeout(() => {
                botao.style.display = "inline-block";
            }, 1000); // mostra após 1 segundo de hover
        });

        inicio.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimer);

            hideTimer = setTimeout(() => {
                botao.style.display = "none";
            }, 2000); // 2 segundos
        });
    }
});

/**
 * Carrega as notícias do servidor e as exibe no carrossel.
 */
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".news-grid-carousel");
    console.log("Container encontrado:", container); // Verifica se o container foi encontrado

    // Faz uma requisição para a API de notícias
    fetch('/api/noticias')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar as notícias'); // Lança um erro se a resposta não for bem-sucedida
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(noticias => {
            console.log("Notícias carregadas:", noticias); // Exibe as notícias carregadas no console
            if (container) {
                container.innerHTML = ''; // Limpa o container antes de adicionar as notícias

                // Adiciona cada notícia ao container
                noticias.forEach(noticia => {
                    const newsBox = document.createElement("div");
                    newsBox.classList.add("news-box"); // Adiciona a classe para estilização

                    // Cria o conteúdo HTML da notícia
                    newsBox.innerHTML = `
                        <img src="${noticia.link.replace('.html', '.jpg')}" alt="Imagem da ${noticia.titulo}" />
                        <h3>${noticia.titulo}</h3>
                        <p>${new Date(noticia.data).toLocaleDateString()}</p>
                        <a href="${noticia.link}" class="read-more">Ler Mais</a>
                    `;

                    container.appendChild(newsBox); // Adiciona a notícia ao container
                });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as notícias:', error); // Exibe o erro no console
        });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
