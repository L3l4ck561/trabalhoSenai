const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;

app.use(bodyParser.json())

let usuarios = [
    { id: 1, nome: 'Carlos', email: 'carlos@gmail.com', senha: '1234' },
    { id: 2, nome: 'Ana', email: 'ana@gmail.com', senha: '4321' }
];


app.post('/api/login/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { email, senha } = req.body;
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    if (email === usuarios[indice].email && senha === usuarios[indice].senha) {
        return res.status(200).json({
            token: 'abc123',
            mensagem: "Logon com sucesso"
        })
    }

    return res.status(401).json({ mensagem: "Credenciais inválidas!" })
})

app.put('/api/put-login/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email } = req.body;
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    usuarios[indice] = { id, nome, email }
    return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', usuario: usuarios[indice] });
})

app.get('/api/get-users', (req, res) => {
    return res.status(200).json(usuarios);
});

app.get('/api/get-user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    return res.status(200).json(usuarios[indice]);
});

app.delete('/api/delete-user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    usuarios.splice(indice, 1);
    return res.status(200).json({ mensagem: 'Usuário removido com sucesso' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})