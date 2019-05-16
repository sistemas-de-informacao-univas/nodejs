var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mysqlSync = require('sync-mysql');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
	host: 'valesapucai.com.br',
	user: 'valesapucai',
	password: 'sapucai19',
	database: 'valesapu_univas'
});

var conSync = new mysqlSync({
	host: 'valesapucai.com.br',
	user: 'valesapucai',
	password: 'sapucai19',
	database: 'valesapu_univas'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado ao Banco de Dados");
});

app.get('/', function(req, res){
	var html;
	html = "<html><head>";
	html += "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>";
	html += "</head><body>";
	html += "<div align = 'center' width='50%'>";
	html += "<form action='inserir' method='post'><br>";
	html += "<h1>Controle da Agenda de Clientes</h1><br>";
	html += " Nome: <input type='text' name='nome'> ";
	html += " Telefone: <input type='text' name='telefone'> ";
	html += " <input type='submit' value='Inserir'>";
	html += "<hr>";
	html += "<table border=1>";
	html += "<thead>";
	html += "<td width='60%'>NOME</td><td width='30%'>TELEFONE</td><td width='30%'>AÇÕES</td>";
	html += "</thead>";

	var sql = "SELECT * FROM agenda";

	var rows = conSync.query(sql);
	for(var i = 0; i < rows.length; i++){
		html += "<tbody>";
		html += "<td>"+ rows[i].nome + "</td>";
		html += "<td>"+ rows[i].telefone + "</td>";
		html += "<td><a href='/remover/" + rows[i].id + "'>Remover</a></td>";
		html += "</tbody>";
	};

	html += "</table></div>";
	html += "</body></html>";
	res.send(html);

});


app.post('/inserir', function(req, res){
	var post = {
        nome: req.body.nome,
        telefone: req.body.telefone
    };
	
    var sql = "INSERT INTO agenda SET ?";

	con.query(sql, [post], function(erro){
		if (erro) {
	        console.log(erro.message);
	    } else {
			console.log("Dados inseridos na agenda");
		}
	});
	res.redirect('/');

});


app.get('/remover/:id', function(req, res) {
	
	id = req.params.id;

    con.query('DELETE FROM agenda WHERE id = ' + id, function(erro, result) {
	    if (erro) {
	        console.log(erro.message);
	    } else {
	        console.log('Registro removido com sucesso!');
	    }
    });
	res.redirect('/')
});


app.listen(3000, function(){
	console.log('Servidor pronto');
});
