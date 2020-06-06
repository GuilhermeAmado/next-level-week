const express = require("express");
const server = express();

// pegar o banco de dados
const db = require('./database/db');

// configurar pasta publica
server.use(express.static("public/"));

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

// configurar rotas da aplicação
// pagina inicial
server.get("/", (req, res) => {
  return res.render("index.html");
});
// cadastro ponto de coleta
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});
// resultados da pesquisa
server.get("/search-results", (req, res) => {
  // pegar os dados no banco de dados
  db.all(`SELECT * FROM places`, function(err, rows) {
      if (err) {
          return console.log(err);
      }

      const total = rows.length;

      // mostrar a página HTML com os dados do banco de dados
      return res.render("search-results.html", { places: rows, total: total });
  });

});

// ligar o servidor
server.listen(3000);
