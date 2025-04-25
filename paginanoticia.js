document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".news-list");
    console.log(container);

    // Faz uma requisição para a API de notícias
    fetch('/api/noticias')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar as notícias');
            }
            return response.json();
        })
        .then(noticias => {
            console.log(noticias);
            if (container) {
                container.innerHTML = ''; // Limpa o container antes de adicionar as notícias

                // Adiciona cada notícia ao container
                noticias.forEach(noticia => {
                    const newsItem = document.createElement("div");
                    newsItem.classList.add("news-item");

                    // Cria o conteúdo HTML da notícia
                    newsItem.innerHTML = `
                        <h3>${noticia.titulo}</h3>
                        <p>${new Date(noticia.data).toLocaleDateString()}</p>
                        <a href="${noticia.link}" class="read-more">Ler Mais</a>
                    `;

                    container.appendChild(newsItem); // Adiciona a notícia ao container
                });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as notícias:', error);
        });
});