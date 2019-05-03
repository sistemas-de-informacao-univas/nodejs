const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// importando routes
const customerRoutes = require('./routes/agenda');

// configurando App
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Conexão com o Banco de Dados
app.use(myConnection(mysql, {
  host: 'valesapucai.com.br',
  user: 'valesapu_admin',
  password: 'sapucai19',
  database: 'valesapu_univas',
  port: 3306
}, 'single'));

app.use(express.urlencoded({extended: false}));

// Rotas
app.use('/', customerRoutes);

// Arquivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando o servidor
app.listen(app.get('port'), () => {
  console.log("Servidor Pronto");
});
