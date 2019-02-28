const fs = require('fs');

var read_stream = fs.createReadStream('arquivo.txt', {encoding: 'utf8'});
read_stream.on("data", function(data){
    process.stdout.write(data);
});
read_stream.on("error", function(err){
    console.error("Ocorreu um erro: %s", err)
});
read_stream.on("close", function(){
    console.log("\nFim da leitura.")
});