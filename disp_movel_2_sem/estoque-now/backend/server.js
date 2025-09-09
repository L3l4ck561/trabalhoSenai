require("dotenv").config();
// Express é o nosso framework para construir o servidor
// Ele é que permite realizar requisições HTTP da web
const express = require("express");
// O cors permite que o frontend "converse" com o backend,
// pois são domínios diferentes
const cors = require("cors")
const authRoutes = require("./auth-service/src/routes/authRoutes")

// Instaciando ou criando a aplicação express
const app = express();
// Chamando a porta que irá "rodar" o servidor
// A porta foi definida no arquivo .env, se não rodar usa como padrão a porta 3000
const PORT = process.env.PORT || 3000

// Habilitando o "cors" para todas as solicitações entre os domínios
app.use(cors());
// Informando ao Express ou ao servidor para que ele etenda JSON no corpo das requisições HTTP
app.use(express.json());

// "/api/auth" define o prefixo para todas as rotas de autenticação.
// Ex.: Se a rota é para "/register" no authRoutes, se torna "/api/auth/register"

app.use("/api/auth", authRoutes);

app.listen(PORT, () => (
    console.log(`Servidor rodando na porta ${PORT} 🚀`)
));