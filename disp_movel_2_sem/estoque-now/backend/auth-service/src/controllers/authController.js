// authController.js
// Importa o pool de conexões com a base de dados que configurámos.
const pool = require('../config/database');
// Importa a biblioteca bcrypt para encriptação de senhas.
const bcrypt = require('bcrypt');

// Define o "custo" do processamento de encriptação. Um valor mais alto é mais seguro, mas mais lento. 10 é um bom padrão.
const saltRounds = 10;

// --- FUNÇÃO DE REGISTO DE NOVO UTILIZADOR ---
exports.register = async (req, res) => {
  // Extrai todos os dados do corpo do pedido (enviado pelo frontend).
  const { nome, email, idade, photo_url, security_question, security_answer, password } = req.body;

  // Validação básica para garantir que todos os campos foram preenchidos.
  if (!nome || !email || !idade || !security_question || !security_answer || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  try {
    // Encripta a senha do utilizador antes de a guardar.
    const passwordHash = await bcrypt.hash(password, saltRounds);
    // Encripta também a resposta de segurança.
    const securityAnswerHash = await bcrypt.hash(security_answer, saltRounds);

    // Executa o comando SQL para inserir o novo utilizador na base de dados.
    // Os '?' são substituídos de forma segura pelos valores no array para prevenir SQL Injection.
    await pool.query(
      'INSERT INTO users (nome, email, idade, photo_url, security_question, security_answer_hash, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, email, idade, photo_url, security_question, securityAnswerHash, passwordHash]
    );

    // Se a inserção for bem-sucedida, envia uma resposta de sucesso.
    res.status(201).json({ message: 'Utilizador registado com sucesso!' });
  } catch (error) {
    // Se ocorrer um erro (ex: email duplicado), envia uma resposta de erro.
    console.error('Erro no registo:', error);
    res.status(500).json({ message: 'Erro ao registar utilizador. O email pode já estar em uso.' });
  }
};

// --- FUNÇÃO DE LOGIN DO UTILIZADOR ---
exports.login = async (req, res) => {
  // Extrai o email e a senha do corpo do pedido.
  const { email, password } = req.body;

  try {
    // Procura na base de dados por um utilizador com o email fornecido.
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0]; // Pega no primeiro (e único) resultado.

    // Se nenhum utilizador for encontrado, envia um erro de credenciais inválidas.
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Compara a senha fornecida pelo utilizador com o hash guardado na base de dados.
    const match = await bcrypt.compare(password, user.password_hash);

    // Se as senhas não corresponderem, envia um erro de credenciais inválidas.
    if (!match) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Se o login for bem-sucedido, envia uma resposta de sucesso com os dados do utilizador.
    // NUNCA envie a senha ou o hash da senha de volta para o frontend.
    res.status(200).json({
      message: 'Login bem-sucedido!',
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        idade: user.idade,
        photo_url: user.photo_url
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

// --- FUNCIONALIDADE: ESQUECI A SENHA ---

// Passo 1: Encontrar o utilizador e devolver a sua pergunta de segurança.
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Procura o utilizador na base de dados pelo email fornecido.
    const [rows] = await pool.query('SELECT security_question FROM users WHERE email = ?', [email]);
    const user = rows[0];

    // Se o utilizador não for encontrado, enviamos uma resposta genérica por segurança.
    // Não queremos confirmar a um potencial atacante que o email existe.
    if (!user) {
      // Nota: Na prática, para máxima segurança, esta resposta deveria ser 200 OK para não dar pistas.
      // Mas para fins didáticos, 404 é mais claro.
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }

    // Se o utilizador for encontrado, devolvemos a sua pergunta de segurança.
    res.status(200).json({ security_question: user.security_question });

  } catch (error) {
    console.error('Erro em forgotPassword:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

// Passo 2: Verificar a resposta e redefinir a senha.
exports.resetPassword = async (req, res) => {
  const { email, security_answer, newPassword } = req.body;

  try {
    // Primeiro, precisamos de buscar o hash da resposta de segurança guardado na BD.
    const [rows] = await pool.query('SELECT security_answer_hash FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      // Novamente, uma resposta genérica por segurança.
      return res.status(404).json({ message: 'Falha na autenticação.' });
    }

    // Compara a resposta fornecida pelo utilizador com o hash guardado.
    const match = await bcrypt.compare(security_answer, user.security_answer_hash);

    // Se a resposta não corresponder, a operação falha.
    if (!match) {
      return res.status(401).json({ message: 'A resposta de segurança está incorreta.' });
    }

    // Se a resposta estiver correta, encriptamos a nova senha.
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Atualizamos a senha do utilizador na base de dados.
    await pool.query('UPDATE users SET password_hash = ? WHERE email = ?', [newPasswordHash, email]);

    // Enviamos uma resposta de sucesso.
    res.status(200).json({ message: 'Senha redefinida com sucesso!' });

  } catch (error) {
    console.error('Erro em resetPassword:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
