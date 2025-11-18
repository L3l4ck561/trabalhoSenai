import React, { useState } from 'react';
import './kanban.css';

const tarefasIniciais = [
  { id: 1, texto: 'Configurar o ambiente React', status: 'aFazer' },
  { id: 2, texto: 'Criar o componente Kanban', status: 'aFazer' },
  { id: 3, texto: 'Estilizar as colunas', status: 'emAndamento' },
  { id: 4, texto: 'Implementar o `useState`', status: 'concluido' },
];

const colunas = ['aFazer', 'emAndamento', 'concluido'];

function Kanban() {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [novaTarefaTexto, setNovaTarefaTexto] = useState('');

  const handleDragStart = (evento, id) => {
    setDraggedTaskId(id);
    evento.currentTarget.classList.add('arrastando');
  };

  const handleDragEnd = (evento) => {
    setDraggedTaskId(null);
    evento.currentTarget.classList.remove('arrastando');
  };

  const handleDragOver = (evento) => {
    evento.preventDefault();
  };

  const handleDrop = (evento, novoStatus) => {
    evento.preventDefault();

    moverTarefa(draggedTaskId, novoStatus);

    evento.currentTarget.classList.remove('drag-over');
  };

  const handleDragEnter = (evento) => {
    evento.currentTarget.classList.add('drag-over');
  };
  const handleDragLeave = (evento) => {
    evento.currentTarget.classList.remove('drag-over');
  };

  const moverTarefa = (id, novoStatus) => {
    setTarefas((tarefasAtuais) => {
      return tarefasAtuais.map(tarefa => {
        if (tarefa.id === id) {
          return { ...tarefa, status: novoStatus };
        }
        return tarefa;
      });
    });
  };

  const handleAdicionarTarefa = (evento) => {
    evento.preventDefault();

    const textoLimpo = novaTarefaTexto.trim();
    if (textoLimpo === '') return;

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      status: 'aFazer'
    };

    setTarefas(tarefasAtuais => [...tarefasAtuais, novaTarefa]);

    setNovaTarefaTexto('');
  };

  return (
    <>
      <form className="add-task-form" onSubmit={handleAdicionarTarefa}>
        <input
          type="text"
          value={novaTarefaTexto}
          onChange={(e) => setNovaTarefaTexto(e.target.value)}
          placeholder="Adicionar nova tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>
      <div className="kanban-board">
        {colunas.map(status => (
          <div
            key={status}
            className="kanban-coluna"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <h2>
              {status === 'aFazer' && 'A Fazer'}
              {status === 'emAndamento' && 'Em Andamento'}
              {status === 'concluido' && 'Concluído'}
            </h2>

            <div className="kanban-coluna-cartoes">
              {tarefas
                .filter(tarefa => tarefa.status === status)
                .map(tarefa => (
                  <div
                    key={tarefa.id}
                    className="kanban-cartao"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, tarefa.id)}
                    onDragEnd={handleDragEnd}
                  >
                    {tarefa.texto}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Kanban;