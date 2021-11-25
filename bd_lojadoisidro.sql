create database lojadoisidro;

use lojadoisidro;

create table tbcategoria(
	id        integer not null auto_increment primary key,
	descricao varchar(50) not null
);

create table tbproduto(
	codigo       integer not null auto_increment primary key,
	nome         varchar(80) not null,
	descricao    text,
	qtde_estoque integer,
	preco        double,
	destaque     integer,
	id_categoria integer,
	constraint fk_categ foreign key (id_categoria) references tbcategoria(id)
);

/* inserindo dados */

insert into tbcategoria values (null, 'Informatica');
insert into tbcategoria(descricao) values ('Eletronicos');
insert into tbcategoria values (null, 'Moveis de Escritorio');


insert into tbproduto values (null, 'Mouse', 'Mouse que acende luzinha', 10, 50.0, 1, 1);
insert into tbproduto values (null, 'Teclado', 'Teclado que faz barulho', 5, 100.0, 1, 1);
insert into tbproduto values (null, 'Celular', 'Celular que tira foto embacada', 2, 1000.0, 0, 2);
insert into tbproduto values (null, 'Cafeteira', 'Cafeteria que faz cafe que fica po no fim', 5, 200.0, 1, 2);
insert into tbproduto values (null, 'Cadeira Gamer', 'Cadeira gamer que da dor nas costas', 4, 800.0, 1, 3);
insert into tbproduto values (null, 'Mesa', 'Mesa que nao aguenta o peso do monitor brabo', 2, 350.0, 1, 3);
