var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mysqlSync = require('sync-mysql');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'univas'
});

var conSync = new mysqlSync({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'univas'
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
	
	html += "<h1>Controle da Agenda de Contatos</h1><br>";

	html += "<form action='clientes' method='get'>";
	html += "<input class='btn btn-success' type='submit' value='Clientes'>";
	html += "</form>";
		
	html += "<form action='fornecedores' method='get'>";
	html += "<input class='btn btn-success' type='submit' value='Fornecedores'>";
	html += "</form>";

	html += "<form action='vendedores' method='get'>";
	html += "<input class='btn btn-success' type='submit' value='Vendedores'>";
	html += "</form>";

	html += "</body></html>";
	res.send(html);
});

app.get('/clientes', function(req, res){
	var html;
	html = "<html><head>";
	html += "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>";
	html += "</head><body>";
	html += "<div align = 'center' width='50%'>";
	html += "<a href='/'>Voltar</a>";
	html += "<form action='/clientes/inserir' method='post'><br>";
	html += "<h1>Controle da Agenda de Clientes</h1><br>";
	html += " Nome: <input type='text' name='nome' > ";
	html += " Telefone: <input type='text' name='telefone'> ";
	html += " <input type='submit' value='Inserir'>";
	html += "<hr>";
	html += "<table border=1>";
	html += "<thead>";
	html += "<td width='40%'>NOME</td><td width='30%'>TELEFONE</td><td width='30%'>AÇÕES</td>";
	html += "</thead>";

	var sql = "SELECT * FROM agenda";

	var rows = conSync.query(sql);
	for(var i = 0; i < rows.length; i++){
		html += "<tbody>";
		html += "<td>"+ rows[i].nome + "</td>";
		html += "<td>"+ rows[i].telefone + "</td>";
		html += "<td>";
		html += "<a href='/clientes/" + rows[i].id + "'>Editar</a>  ";
		html += "<a href='/clientes/remover/" + rows[i].id + "'>Remover</a>";
		html += "</td>";

		html += "</tbody>";
	};

	html += "</table></div>";
	html += "</body></html>";
	res.send(html);

});


app.post('/clientes/inserir', function(req, res){
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
	res.redirect('/clientes');

});


app.get('/clientes/:id', function(req, res) {
	
	var id = req.params.id;

	var sql = "SELECT * FROM agenda WHERE id = " + id;

	var rows = conSync.query(sql);
	var nome = rows[0].nome;
	var telefone = rows[0].telefone;
	
	var html;
	html = "<html><head>";
	html += "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>";
	html += "</head><body>";
	html += "<div align = 'center' width='50%'>";
	html += "<form action='/clientes/atualizar' method='post'><br>";
	html += "<h1>Editando dados na Agenda de Clientes</h1><br>";
	html += " Nome: <input type='text' name='nome' value='" + nome + "'> ";
	html += " Telefone: <input type='text' name='telefone' value='" + telefone + "'> ";
	html += " <input type='hidden' name='id' value='" + id + "'>";
	html += " <input type='submit' value='Atualizar'>";
	html += " <input type='button' value='Cancelar' onClick='history.back();'>";

	res.send(html);

});


app.post('/clientes/atualizar', function(req, res){
	var post = {
	    nome: req.body.nome,
	    telefone: req.body.telefone
	};

	var id = req.body.id;
 
	con.query('UPDATE agenda set ? where id = ?', [post, id], function(erro, result) {
	    if (erro) {
	        console.log(erro.message);
	    } else {
	        console.log('Registro atualizado com sucesso!');
	    }
    });
	res.redirect('/clientes')
});


app.get('/clientes/remover/:id', function(req, res) {
	
	var id = req.params.id;

    con.query('DELETE FROM agenda WHERE id = ' + id, function(erro, result) {
	    if (erro) {
	        console.log(erro.message);
	    } else {
	        console.log('Registro removido com sucesso!');
	    }
    });
	res.redirect('/clientes')
});


app.listen(3000, function(){
	console.log('Servidor pronto');
});
