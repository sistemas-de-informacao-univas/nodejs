function fibonacci(n){
	var [a, b] = [0, 1];
	var resultado = [a];
	var x = 1;
	while(x<n){
		resultado.push(b);
		[a, b] = [b, a+b];
		x++;	
	}
	return resultado;
}

module.exports = fibonacci;