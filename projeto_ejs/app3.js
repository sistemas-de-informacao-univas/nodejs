module.exports = function (a, b){
	this.nome = a;
	this.sobrenome = b;
	this.nomecompleto = function(){
		return this.nome + ' ' + this.sobrenome;
	}
}