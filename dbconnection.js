/* a funcao connect tem por objetivo apenas se conectar ao banco de dados */
async function connect() {
    // se existe uma conexao prévia já feita (chamada anteriormente) e ela está ativa, não preciso conectar de novo
    if (global.connection && global.connection.state != "disconnected") {
        return global.connection;
    }
    // importo a biblioteca do mysql
    const mysql = require("mysql2/promise");
    // aqui eu faço a conexao e aguardo a conclusão dessa conexão (através do await createConnection) e armazeno o resultado na variável connection
    const connection = await mysql.createConnection("mysql://root:mysql@localhost:3306/lojadoisidro");
    //const connection = await mysql.createConnection("mysql://sql10453815:QMMjGfMJXg@sql10.freesqldatabase.com:3306/sql10453815");
    console.log("Conectado ao BD com sucesso");

    // se deu certo, torno essa conexão global (para eu ter só 1) 
    global.connection = connection;

    // retorno essa conexão para quem quiser usar (outras funções)
    return connection;
}

async function getProdutos() {

    // primeira coisa: preciso me conectar ao banco
    const conn = await connect();
    console.log("GETPRODUTOS - Conectado ao banco - vou recuperar meus produtos");

    // faço a consulta e pego (através deste operador [resultado]  apenas os dados, ignoro a definição da estrutura da tabela resultante)
    const stringSQL = `select tbproduto.codigo as produto_codigo, tbproduto.nome as produto_nome, tbproduto.descricao as produto_descricao,
    tbproduto.qtde_estoque as produto_estoque, tbproduto.destaque as produto_destaque, tbproduto.preco as produto_preco,  
    tbproduto.link_foto as produto_link, tbcategoria.id as categoria_id, tbcategoria.descricao as categoria_descricao 
    from tbproduto inner join tbcategoria on tbproduto.id_categoria = tbcategoria.id  `;
    const [resultado] = await conn.query(stringSQL);

    let listaProdutos = [];

    for (i = 0; i < resultado.length; i++) {
        let tmp = resultado[i];
        let prod = {
            codigo: tmp.produto_codigo,
            nome: tmp.produto_nome,
            descricao: tmp.produto_descricao,
            preco: tmp.produto_preco,
            qtd_estoque: tmp.produto_estoque,
            destaque: tmp.produto_destaque,
            link_foto: tmp.produto_link,
            categoria: {
                id: tmp.categoria_id,
                descricao: tmp.categoria_descricao
            }
        }
        listaProdutos.push(prod);
    }


    //console.log(resultado);

    // retorno esse resultado para ser exposto pela API posteriormente
    //return resultado;
    return listaProdutos;
}

async function getProdutoPorId(id) {
    const conn = await connect();
    console.log("GETPRODUTOPORID - Conectado ao banco");
    const parameters = [id];
    const stringSQL = `select tbproduto.codigo as produto_codigo, tbproduto.nome as produto_nome, tbproduto.descricao as produto_descricao,
    tbproduto.qtde_estoque as produto_estoque, tbproduto.destaque as produto_destaque, tbproduto.preco as produto_preco,  
    tbproduto.link_foto as produto_link, tbcategoria.id as categoria_id, tbcategoria.descricao as categoria_descricao 
    from tbproduto inner join tbcategoria on tbproduto.id_categoria = tbcategoria.id where tbproduto.codigo = ?`;
    const [res] = await conn.query(stringSQL, parameters);
    if (res.length > 0) {
        let resultado = res[0];
        let produto = {
            codigo: resultado.produto_codigo,
            nome: resultado.produto_nome,
            descricao: resultado.produto_descricao,
            preco: resultado.produto_preco,
            destaque: resultado.produto_destaque,
            link_foto: resultado.produto_link,
            qtd_estoque: resultado.produto_estoque,
            categoria: {
                id: resultado.categoria_id,
                descricao: resultado.categoria_descricao
            }
        }
        console.log(produto)
        return produto;
    }
    else {
        return null;
    }
}


async function getCategorias() {
    const conn = await connect();
    console.log("GETCATEGORIAS - Conectado ao banco de dados");
    const [resultado] = await conn.query("SELECT * from tbcategoria");
    return resultado;
}

async function getProdutosPorCategoria(idCategoria) {
    const conn = await connect();
    console.log("GETPRODUTOSPORCATEGORIA - Conectado ao banco de dados");
    const parameters = [idCategoria];
    const [resultado] = await conn.query("SELECT * FROM tbproduto where id_categoria = ?", parameters);
    return resultado;
}
module.exports = { getProdutos, getProdutoPorId, getCategorias, getProdutosPorCategoria };