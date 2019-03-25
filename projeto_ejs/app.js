const express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.get('/clientes',function(req,res){
	res.render("clientes/listar");
});


app.get("/produtos", function(req, res){
	res.render("produtos/produtos");
});


app.listen(3000, function(){
	console.log('Servidor pronto');
});

