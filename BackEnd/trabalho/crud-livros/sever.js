// Importa as bibliotecas necessárias
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

// Cria o app Express
const app = express();

// Configura o motor de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Configura arquivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Permite parsear JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do banco MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root', // Ajuste para seu usuário
    password: '', // Ajuste para sua senha
    port: 3307,
    database: 'biblioteca_db'
};

// Rota para a página inicial (mostra formulário e lista)
app.get('/', async (req, res) => {
    try {
        // Conecta ao MySQL
        const conn = await mysql.createConnection(dbConfig);
        // Busca todos os livros
        const [livros] = await conn.execute('SELECT * FROM livros');
        await conn.end();
        // Renderiza a página com a lista de livros
        res.render('index', { livros });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para criar um livro
app.post('/livros', async (req, res) => {
    const { titulo, autor, ano, genero } = req.body;
    // Valida os campos
    if (!titulo || !autor || !ano || !genero) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    try {
        const conn = await mysql.createConnection(dbConfig);
        await conn.execute(
            'INSERT INTO livros (titulo, autor, ano, genero) VALUES (?, ?, ?, ?)',
            [titulo, autor, parseInt(ano), genero]
        );
        await conn.end();
        // Redireciona para atualizar a página
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar livro' });
    }
});

// Rota para atualizar um livro
app.post('/livros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, ano, genero } = req.body;
    if (!titulo || !autor || !ano || !genero) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    try {
        const conn = await mysql.createConnection(dbConfig);
        await conn.execute(
            'UPDATE livros SET titulo = ?, autor = ?, ano = ?, genero = ? WHERE id = ?',
            [titulo, autor, parseInt(ano), genero, parseInt(id)]
        );
        await conn.end();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
});

// Rota para excluir um livro
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const conn = await mysql.createConnection(dbConfig);
        await conn.execute('DELETE FROM livros WHERE id = ?', [parseInt(id)]);
        await conn.end();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao excluir livro' });
    }
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});