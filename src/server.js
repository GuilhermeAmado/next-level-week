const express = require("express");
const server = express();

// configurar pasta publica
server.use(express.static("public/"));

// configurar rotas da aplicação
// pagina inicial
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
// cadastro ponto de coleta
server.get("/create-point", (req, res) => {
  res.sendFile(__dirname + "/views/create-point.html");
});
// resultados da pesquisa
server.get("/search-results", (req, res) => {
  res.sendFile(__dirname + "/views/search-results.html");
});

// ligar o servidor
server.listen(3000);
