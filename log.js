var http = require('http');
var fs = require('fs');



var numbers = [];
var cont = 0;


teste();

function teste() {
    for (i = 0; i < 6; i++) {
        numbers[i] = Math.floor((Math.random() * 59) + 1);

    }
}

console.log(numbers);


var linhas = [];
var data = [];

data = fs.readFileSync('aposta.txt', 'utf-8');
linhas = data.split(/\r?\n/);

console.log(linhas.toString('utf-8'));

for (i = 0; i < 6; i++) {
    for (j = 0; j < 6; j++) {
        if (numbers[i] == linhas[j]) {
            console.log(numbers[i]);
            cont++;


        }

    }
}
console.log(cont)
var acert;
var resultado = 'Sorteados:' + numbers + ' || Aposta:' + linhas + ' || Acertos:' + cont;
fs.writeFile('novo.txt', resultado + '\n', { flag: 'a' }, function (err) {
    if (err) throw err;
    console.log('OK');
})


function Mostrar() {
    var linha = linhas;
    var msg = numbers;
    var acertos = cont;
    document.getElementById("meusNumeros").value = linha
    document.getElementById('nmr').value = msg
    document.getElementById('acertos').value = acertos;
}

var server = http.createServer(function (request, response) {
    fs.readFile('exercicio4.html', function (err, html) {
        response.writeHeader(200, { 'Content-Type': 'text/html; charset=UTF-8;' });
        response.write(html);
        response.end();
    });
});
server.listen(3000, function () {
    console.log('Executando Servidor HTTP');
});