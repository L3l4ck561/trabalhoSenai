const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


let usuarios = {
  1: { nome: 'Sojeva', email: 'sojeva@gmail.com' },
  2: { nome: 'Fabio', email: 'fabio@gmail.com' }
};


app.post('/usuarios', (req, res) => {
  const id = String(Object.keys(usuarios).length + 1);
  usuarios[id] = req.body;
  res.status(201).json({ id, usuario: usuarios[id] });
});


app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});


app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  if (usuarios[id]) {
    res.json(usuarios[id]);
  } else {
    res.status(404).json({ erro: 'Usuário não encontrado' });
  }
});


app.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  if (usuarios[id]) {
    usuarios[id] = req.body;
    res.json({ id, usuario: usuarios[id] });
  } else {
    res.status(404).json({ erro: 'Usuário não encontrado' });
  }
});

app.patch('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  if (usuarios[id]) {
    usuarios[id] = { ...usuarios[id], ...req.body };
    res.json({ id, usuario: usuarios[id] });
  } else {
    res.status(404).json({ erro: 'Usuário não encontrado' });
  }
});


app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  if (usuarios[id]) {
    delete usuarios[id];
    res.json({ mensagem: 'Usuário deletado com sucesso' });
  } else {
    res.status(404).json({ erro: 'Usuário não encontrado' });
  }
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});