import React, { useState } from 'react';
import './App.css';

function App() {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);

  const handleTextoChange = (texto) => {
    setMensagem(texto.target.value)
  }

  const teste = () => {
    if (mensagem.trim()) {
      setMensagens([...mensagens, {id: Date.now(), texto: mensagem}]);
    }
  }

  const Delete = (id) => {
    const novalista = mensagens.filter(item => item.id !== id);
    setMensagens(novalista);
  }

  return (
    <div className="App">
      <div className='box'>

        <h2>Deixe seu comentário</h2>
        <textarea id='input' onChange={handleTextoChange} placeholder='Digite seu comentário'></textarea>
        <br />
        <div className='space' />
        <button onClick={teste}>Enviar comentário</button>
        <div className='space' />

        <hr />

        <h3>comentários</h3>

        {!mensagens.length ? (
          <p className='sem-comentarios'>Nenhum comentário ainda.</p>
        ) : (
          <ul className='lista-comentarios'>
            {mensagens.map((c, index) => (
              <>
              <li key={index} className='comentario-item'><button id='ex' onClick={() => Delete(c.id)}>X</button> - {c.texto}</li>
              </>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default App;
