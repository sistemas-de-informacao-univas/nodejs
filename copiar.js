const fs = require('fs')
const origem = fs.createReadStream('arquivo.txt');
var destino = fs.createWriteStream('copia.txt');
origem.pipe(destino);