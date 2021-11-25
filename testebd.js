const bd = require("./dbconnection");

(async () => {
    console.log("inciando testes...");
    const result = bd.getProdutos();
    console.log("fim");
}) ();
