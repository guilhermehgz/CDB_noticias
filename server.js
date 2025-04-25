// Importa os módulos necessários
const express = require('express'); // Framework para criar o servidor
const fs = require('fs'); // Módulo para manipular o sistema de arquivos
const path = require('path'); // Módulo para manipular caminhos de arquivos

// Cria uma instância do servidor Express
const app = express();
const PORT = 3000; // Porta onde o servidor será executado

// Define o diretório onde estão as notícias
const NOTICIAS_DIR = path.join(__dirname, 'noticias');

// Configura o servidor para servir arquivos estáticos (como index.html, CSS, JS, etc.)
app.use(express.static(__dirname));

// Rota para obter as notícias em formato JSON
app.get('/api/noticias', (req, res) => {
  // Lê os arquivos no diretório de notícias
  fs.readdir(NOTICIAS_DIR, (err, files) => {
    if (err) {
      // Retorna um erro 500 se houver problemas ao ler o diretório
      return res.status(500).json({ error: 'Erro ao ler as notícias' });
    }

    console.log('Arquivos encontrados:', files);

    // Filtra os arquivos HTML e cria um array de objetos com informações das notícias
    const noticias = files
      .filter(file => file.endsWith('.html')) // Filtra apenas arquivos com extensão .html
      .map(file => {
        const stats = fs.statSync(path.join(NOTICIAS_DIR, file)); // Obtém informações do arquivo
        return {
          titulo: file.replace('.html', ''), // Remove a extensão .html para usar como título
          link: `noticias/${file}`, // Cria o link para o arquivo
          data: stats.birthtime.toISOString() // Obtém a data de criação do arquivo
        };
      })
      .sort((a, b) => new Date(b.data) - new Date(a.data)); // Ordena as notícias pela data (mais recentes primeiro)

    // Retorna as notícias em formato JSON
    res.json(noticias);
  });
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Servidor rodando em http://localhost:${PORT}/api/noticias`);
});