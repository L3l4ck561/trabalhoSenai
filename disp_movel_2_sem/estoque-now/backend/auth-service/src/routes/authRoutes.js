// Importando o Express para gerenciar as rotas
const express = require("express");

// Criando uma instância do Router do Express
const router = express.Router();

// Importando o controlador que nós criamos
const authController = require("../controllers/authController")

// Definindo a rota "POST" para que quando o usuário fizer uma
// requisição de registro (cadastro), seja executado
router.post("/register", authController.register); // register é o endpoint da API

// Define a rota "POST" para login
router.post("/login", authController.login);

// Define a rota "POST" para a recuperação de senha
// A lógica é: Envia email, recebe pergunta
router.post("/forgot-password", authController.forgotPassword)

// Rota "POST" para o passo 2: Enviar resposta e nova seha
router.post("/reset-password", authController.resetPassword)

module.exports = router;