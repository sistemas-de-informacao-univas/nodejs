const express = require('express');

var app = express();

app.get('/',function(req,resp){
	resp.send('Ola mundo');
});

app.listen(3000, function(){
	console.log('Servidor pronto');
});