
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'univas'
});

con.connect(function (erro){
	if (erro) throw erro;
	console.log('Conectado ao banco de dados');
});

app.get('/', function(req, res){
	var html = "<html><body>";
	html += "<form action='inserir' method='post'><br>";
	html += "<h1>Controle da Agenda de Clientes</h1>";
	html += "Nome: <input type='text' name='nome'><br>";
	html += "Tel.: <input type='text' name='telefone'><br>";
	html += "<input type='submit' value='Inserir'>";
	html += "<hr>";

	html += "<table>";

	html += "<thead>";
	html += "<td>NOME</td><td>TELEFONE</td>";
	html += "</head>";

	var sql = "SELECT nome, telefone FROM agenda";
	con.query(sql, function(erro, rows, fields){
		for(var i = 0; i < rows.length; i++){
			html += "<tbody>";
			html += "<td>"+ rows[i].nome + "</td>";
			html += "<td>"+ rows[i].telefone + "</td>";
			html += "</tbody>";
		};
	});

	html += "</table>";
	html += "</body></html>";
	
	res.send(html);
});

app.post('/inserir', function(req, res){
	var nome = req.body.nome;
	var telefone = req.body.telefone;
	var sql = "INSERT INTO AGENDA (nome, telefone) " +
	          "VALUES ('" + nome + "', '" + telefone + "')";

	//sql = "INSERT INTO AGENDA (nome, telefone) VALUES ('?', '?')";

	con.query(sql, nome, telefone, function(erro){
		if (erro) throw erro;
		console.log(sql);
		console.log("Dados inseridos na agenda");
	});
	res.redirect('/');

});

app.listen(3000, function(){
	console.log('Servidor pronto');
});

