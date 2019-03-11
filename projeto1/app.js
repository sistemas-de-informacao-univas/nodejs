const express = require('express');

var app = express();

app.get('/',function(req,response){
	response.send("<html><body><h1>Olá Node.js!</h1>");
    response.send("<a href='/bemvindo'>Bem vindo</a>");
    response.send("</body></html>");
});

app.get("/bemvindo",function(req,response){
     response.send("<html><body><h1>Bem-vindo ao Node.js!</h1>");
     response.send("<a href='/'>Olá Node.js</a>");
     response.send("</body></html>");
});

app.listen(3000, function(){
	console.log('Servidor pronto');
});

