const express = require("express");
const bd      = require("./dbconnection");
const port    = process.env.PORT || 3000;

const api = express();  // aqui nossa máquina vira um site (application server)

// vamos definir as várias rotas que precisamos

api.get("/produtos",  async (req, res) => {
    try{
        const result = await bd.getProdutos();

        // trato a resposta para enviar para o meu browser
        res.status(200);  // operação bem sucedida
        res.json(result);
    }
    catch(erro){
        console.log("Erro - no endpoint GET /produtos");
        console.log(erro);
    }
})

api.get("/produtos/:codigo", async (req, res) => {
    try{
        const idProduto = req.params["codigo"];
        console.log("ID recuperado = "+req.params["codigo"]);
        const resultado = await bd.getProdutoPorId(idProduto);
        if (resultado.length == 0){
            res.status(404); // status 404 indica NOT FOUND, ou seja, não encontrei o produto com o ID especificado
            res.send("NOT FOUND");
        }
        else{
            const produto = resultado[0];
            res.status(200);
            res.json(produto);
        }
    }
    catch(erro){
        console.log("Erro no endpoint /GET/id");
        console.log(erro);
    }
})

api.get("/categorias", async (req, res) => {
    try{
        const categorias = await bd.getCategorias();
        res.status(200);
        res.json(categorias);
    }
    catch (erro){
        console.log("Erro no endpoint GET /categorias");
        console.log(erro);
    }
})

api.get("/categorias/:id", async (req, res) => {
    try{
        const idCategoria = req.params["id"];
        const prodporcateg = await bd.getProdutosPorCategoria(idCategoria);
        res.status(200);
        res.json(prodporcateg);
    }
    catch (erro){
        console.log("Erro no endpoint GET /categorias/id");
        console.log(erro);
    }
})


api.listen(port, () => {
    console.log("API esta no ar...");
})