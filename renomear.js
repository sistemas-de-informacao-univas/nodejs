const fs = require('fs');

fs.rename('teste.txt', 'arquivo.txt', function(err) {
	if(err) throw err;
	console.log('alterado com sucesso!');

});