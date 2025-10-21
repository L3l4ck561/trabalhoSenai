// importando a biblioteca mysql2/promise para usar async/await com MySQL

const mysql = require("mysql2/promise");

// importando a biblioteca da variavél de ambiente

require("dotenv").config();

// Criando um pool de conexões. Ao invés de abrir e fechar uma conexão a cada 
// pedido, o pool gera um conjunto de conexões prontas serem utilizadas.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnection:true, // espera por conexão, se todas estiverem em uso
    connectonLimit:10, // nº max de conexões ao memo tempo ao banco
    queueLimit: 0, //  fila de espera 0=ilimitado
})

// exporta o pool para que possa ser utilizado em outros arquivos
module.exports = pool