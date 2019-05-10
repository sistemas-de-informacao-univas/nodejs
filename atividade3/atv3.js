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

var sql = "delete from materiais where mat_grupo = 0";
con.query(sql, function(erro){
	if (erro) throw erro;
});

var sql = "delete from materiais where mat_subgrupo = 0";
con.query(sql, function(erro){
	if (erro) throw erro;
});

var sql = "SELECT m.mat_descricao, g.grp_descricao, s.sgp_descricao, m.mat_estoque FROM materiais as m join grupos as g on m.mat_grupo = g.grp_id join subgrupos as s on m.mat_subgrupo = s.sgp_id where m.mat_unidade = 'UN' and g.grp_id = 12 and s.sgp_id = 25";
con.query(sql, function(erro, rows, fields){
	if (erro) throw erro;
	for(var i = 0; i < rows.length; i++){
		console.log(i + ', ' + 
			rows[i].mat_descricao + ', ' + 
			rows[i].grp_descricao + ', ' + 
			rows[i].sgp_descricao + ', ' + 
			rows[i].mat_estoque);
	}
});

con.end();