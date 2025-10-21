// authController.js

const db = require('../config/database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// --- 1. REGISTAR UM NOVO UTILIZADOR ---
exports.register = async (req, res) => {
  const { name, email, age, photo, security_question, security_answer, password } = req.body;

  if (!name || !email || !password || !security_question || !security_answer) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hashedAnswer = await bcrypt.hash(security_answer, saltRounds);

    const query = 'INSERT INTO users (nome, email, idade, photo_url, security_question, security_answer_hash, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    // db foi importado
    await db.query(query, [name, email, age, photo, security_question, hashedAnswer, hashedPassword]);

    res.status(201).json({ message: 'Utilizador registado com sucesso!' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Este email já está em uso.' });
    }
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// --- 2. FAZER LOGIN ---
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (match) {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        photo_url: user.photo_url,
      };
      // Em produção, usaríamos JWT (JSON Web Tokens) aqui.
      res.status(200).json({ message: 'Login bem-sucedido!', token: 'fake-jwt-token', user: userData });
    } else {
      res.status(401).json({ message: 'Senha incorreta.' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// --- 3. ESQUECI A SENHA (PASSO 1) ---
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const query = 'SELECT security_question FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]);
    if (rows.length > 0) {
      res.status(200).json({ security_question: rows[0].security_question });
    } else {
      res.status(404).json({ message: 'Email não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar pergunta de segurança:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// --- 4. REDEFINIR SENHA (PASSO 2) ---
exports.resetPassword = async (req, res) => {
  const { email, security_answer, newPassword } = req.body;
  try {
    const findUserQuery = 'SELECT security_answer_hash FROM users WHERE email = ?';
    const [rows] = await db.query(findUserQuery, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }

    const user = rows[0];

    // Para depuração: Verificar o conteúdo de user
    console.log('Utilizador encontrado no BD para redefinição:', user);

    // Verificamos se a resposta do utilizador e a resposta guardada no BD existem antes de comparar.
    if (!security_answer || !user.security_answer_hash) {
      console.error('Tentativa de redefinição de senha com dados em falta.');
      // Enviamos uma mensagem genérica para não dar pistas a potenciais atacantes.
      return res.status(401).json({ message: 'Resposta de segurança incorreta.' });
    }

    const match = await bcrypt.compare(security_answer, user.security_answer_hash);

    if (match) {
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
      const updateQuery = 'UPDATE users SET password_hash = ? WHERE email = ?';
      await db.query(updateQuery, [newHashedPassword, email]);
      res.status(200).json({ message: 'Senha redefinida com sucesso!' });
    } else {
      res.status(401).json({ message: 'Resposta de segurança incorreta.' });
    }
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// --- 5. ATUALIZAR PERFIL ---
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, age, photo } = req.body;
  
    if (!name || !email || !age) {
      return res.status(400).json({ message: 'Nome, email e idade são obrigatórios.' });
    }
  
    try {
      // Por agora, permitimos a atualização da foto como URL/Base64.
      const query = 'UPDATE users SET nome = ?, email = ?, idade = ?, photo_url = ? WHERE id = ?';
      await db.query(query, [name, email, age, photo, id]);
  
      const [rows] = await db.query('SELECT id, nome, email, idade, photo_url FROM users WHERE id = ?', [id]);
      
      res.status(200).json({ message: 'Perfil atualizado com sucesso!', user: rows[0] });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
