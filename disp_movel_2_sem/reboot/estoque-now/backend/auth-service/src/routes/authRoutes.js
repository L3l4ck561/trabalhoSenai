// authRoutes.js

// Importa o Express para criar e gerir as rotas.
const express = require('express');
// Cria uma instância do Router do Express.
const router = express.Router();
// Importa o nosso controlador de autenticação, que contém toda a lógica.
const authController = require('../controllers/authController');

// Define a rota POST para '/register'. Quando um pedido POST chegar a esta rota,
// a função 'authController.register' será executada.
router.post('/register', authController.register);

// Define a rota POST para '/login'.
router.post('/login', authController.login);

// --- ROTAS PARA RECUPERAÇÃO DE SENHA ---
// Rota para o passo 1 da recuperação de senha (enviar email, receber pergunta).
router.post('/forgot-password', authController.forgotPassword);

// Rota para o passo 2 (enviar resposta e nova senha).
router.post('/reset-password', authController.resetPassword);

// Atualizar perfil do utilizador (protegida, necessita de token).
router.put('/profile/:id', authController.updateProfile);


// Exporta o router para ser usado no nosso ficheiro principal do servidor.
module.exports = router;