// criando um servidor

// Comandos do servidor
// res.send - envia um comando para uma página
// res.render - envia uma página renderizada

// Habilitando um template engine

// const nunjucks = require('nunjucks')
// server.set("view engine, "html")
// nunjucks.configure("views", {express: server});

// Pegando arquivos js da raiz do projeto
// module.exports = 


const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const routes = require('./routes');


const server = express();


// funcionar o body
server.use(express.urlencoded({ extended: true }))
// habilita o uso do css
server.use(express.static('public'));
// utilizando o método override para poder usar o verbo PUT
server.use(methodOverride('_method'));
// acessando as rotas de outro arquivo
server.use(routes);


server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(5000, function () {
    console.log('server is running!');
});
