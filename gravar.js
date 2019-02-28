const fs = require('fs');

fs.writeFile('novo.txt','quinta-feira \n', {encoding: 'utf-8', flag: 'a'}, function(err) {
	if(err) throw err;
	console.log('Gravado com sucesso!');

});