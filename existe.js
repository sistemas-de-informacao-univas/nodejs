const fs = require('fs');

fs.open('arquivo.txt','r', (err, fl) => {
	if(err) throw err;
	console.log('Arquivo existe');
});