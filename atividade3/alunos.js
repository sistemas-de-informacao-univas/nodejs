var mysql = require('mysql');

var con = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'univas'
});

con.connect(function(erro){
	if (erro) throw erro;
	console.log('Banco de Dados pronto para uso');
});

var sql = "insert into alunos (nome, nascimento, curso) values ('aluno','2005-10-04','Letras')";
con.query(sql, function(erro){
	if (erro) throw erro;
});

var sql = "update alunos set curso = 'Biologia' where curso = 'Letras'";
con.query(sql, function(erro){
	if (erro) throw erro;
});

var sql = "delete from alunos where id = 2";
con.query(sql, function(erro){
	if (erro) throw erro;
});

var sql = 'select * from alunos';
con.query(sql, function(erro, rows, fields){
	if (erro) throw erro;
	for(var i = 0; i < rows.length; i++){
		console.log('Nome: ' + rows[i].nome + ' Curso: ' + rows[i].curso);
	}
});

con.end();