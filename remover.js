const fs = require('fs');

fs.unlink('novo.txt', function(err) {
	if(err) throw err;
	console.log('removido com sucesso!');

});