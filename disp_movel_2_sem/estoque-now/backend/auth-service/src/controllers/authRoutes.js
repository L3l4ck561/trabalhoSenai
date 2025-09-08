const express = require()

const authController = require("../controllers/authController")

// Definindo a rota "POST" para que quando o usuário fizer uma
// requisição de registro (cadasttro), seja executado
router.post("/register", authController.register) //register é o enpoint da API

// Define a rota "POST" para login
router.post("/login", authController.login)

// Define a rota "POST" para recuperação de senha
// A lógica é: Envia email, recebe pergunta
router.post("/forgot-password", authController.forgotPassword)

// Rota "POST" para o passo 2: Enviar resposta e nova senha
router.post("reset-password", authController.resetPassword)

module.exports = router;