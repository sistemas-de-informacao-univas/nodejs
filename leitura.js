const fs = require('fs');

fs.readFile('arquivo.txt', 'utf-8', function(err, data){
    var linhas = data.split(/\r?\n/);
    linhas.forEach(function(linha){
       console.log(linha); 
    })
})