var express = require('express')
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var clientes = [];
app.get('/', function(req, res){
   html = '<html><body>';
   html += '<form action="/cliente" method="post">';
   html += '<label>Nome: <input type="text" name="cliente[nome]"></label><br>';
   html += '<label>Idade: <input type="text" name="cliente[idade]"></label><br>';
   html += '<button type="submit">Enviar</button>';
   html += '</form>';
   html += '<br>';
   html += '<h1>Lista de clientes</h1>';
   html += '<ul>';
   for(var i = 0; i < clientes.length; i++){
     html += '<li>'+clientes[i].nome+' | '+clientes[i].idade+'</li>';
   }
   html += '</ul></body></html>';
   res.send(html);
});
 
app.post('/cliente', function(req, res){
   var cliente = req.body.cliente;
   clientes.push(cliente);
   res.redirect('/');
});

app.get('/cliente/:id/editar', function(req, res){
   var id = req.params.id;
   var html = '<html><body>';
   html += '<h1>Editar dados do cliente: '+clientes[id].nome+'</h1>';
   html += '<form action="/cliente/'+ id +'" method="post">';
   html += '<input type="hidden" name="_method" value="put">'; // Força o formulário realizar um comando PUT no submit.
   html += '<label>Nome: <input type="text" name="cliente[nome]" value="'+clientes[id].nome+'"></label>';
   html += '<label>Idade: <input type="text" name="cliente[idade]" value="'+clientes[id].idade+'"></label>';
   html += '<button type="submit">Enviar</button>';
   html += '</form>';
   html += '</html>';
   res.send(html);
});

app.put('/cliente/:id', function(req, res){
   var id = req.params.id;
   clientes[id] = req.body.cliente;
   res.redirect('/');
});

app.delete('/cliente/:id', function(req, res){
   var id = req.params.id;
   clientes.splice(id, 1);
   res.redirect('/');
});

var a=1;

app.listen(3000);




 