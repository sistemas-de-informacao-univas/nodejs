-- criando o banco de dados
CREATE DATABASE valesapu_univas;

-- setando o banco para uso
use valesapu_univas;

-- criando a tabela agenda
CREATE TABLE agenda (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  telefone VARCHAR(15)
);



