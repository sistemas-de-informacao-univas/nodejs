var http = require("http");

var server = http.createServer(function (req, res){

   res.end("Ola, o site esta disponivel em " + local);
});

server.listen(3000, function(){
   console.log("seu servidor está pronto em " + this.address().port);
});
