var express = require('express');
var app = express();
app.set('view engine','ejs');
app.get('/', function(req, res){

	var titulo = 'Nome da Pagina';
	var capitulo = 'Capitulo 1';
	var blog=[{
		titulo:'Titulo do Post',
		data:'25/03/2019',
		post:'Acao Social Univas'
	},
	{
		titulo:'Novo do Post',
		data:'26/03/2019',
		post:'Pascoa'
	}];

	res.render('pagina2.ejs',{
		titulo: titulo,
		cap: capitulo,
		blog: blog
	});
});
app.listen(3000);