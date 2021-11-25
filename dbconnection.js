/* a funcao connect tem por objetivo apenas se conectar ao banco de dados */
async function connect(){
    // se existe uma conexao prévia já feita (chamada anteriormente) e ela está ativa, não preciso conectar de novo
    if (global.connection && global.connection.state != "disconnected"){
        return global.connection;
    }
    // importo a biblioteca do mysql
    const mysql = require("mysql2/promise");
    // aqui eu faço a conexao e aguardo a conclusão dessa conexão (através do await createConnection) e armazeno o resultado na variável connection
    const connection = await mysql.createConnection("mysql://root:mysql@localhost:3306/lojadoisidro");
    console.log("Conectado ao BD com sucesso");

    // se deu certo, torno essa conexão global (para eu ter só 1) 
    global.connection = connection;

    // retorno essa conexão para quem quiser usar (outras funções)
    return connection;
}

async function getProdutos(){

    // primeira coisa: preciso me conectar ao banco
    const conn = await connect(); 
    console.log("GETPRODUTOS - Conectado ao banco - vou recuperar meus produtos");

    // faço a consulta e pego (através deste operador [resultado]  apenas os dados, ignoro a definição da estrutura da tabela resultante)
    const [resultado] = await conn.query("SELECT * from tbproduto");
    //console.log(resultado);

    // retorno esse resultado para ser exposto pela API posteriormente
    return resultado;
}

async function getProdutoPorId(id){
    const conn = await connect();
    console.log("GETPRODUTOPORID - Conectado ao banco");
    const parameters = [id];
    const [resultado] = await conn.query("SELECT * from tbproduto WHERE codigo = ?", parameters);
    return resultado;
}


async function getCategorias(){
    const conn = await connect();
    console.log("GETCATEGORIAS - Conectado ao banco de dados");
    const [resultado] = await conn.query("SELECT * from tbcategoria");
    return resultado;
}

async function getProdutosPorCategoria(idCategoria){
    const conn = await connect();
    console.log("GETPRODUTOSPORCATEGORIA - Conectado ao banco de dados");
    const parameters = [idCategoria];
    const [resultado] = await conn.query("SELECT * FROM tbproduto where id_categoria = ?", parameters);
    return resultado;
}
module.exports = {getProdutos, getProdutoPorId, getCategorias, getProdutosPorCategoria};