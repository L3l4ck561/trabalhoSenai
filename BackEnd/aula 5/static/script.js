// Função para carregar a lista de alunos
async function carregarAlunos() {
    const response = await fetch('/alunos');
    const alunos = await response.json();
    const lista = document.getElementById('lista-alunos');
    lista.innerHTML = '';
    for (const [nome, nota] of Object.entries(alunos)) {
        const item = document.createElement('li');
        item.textContent = `${nome}: ${nota}`;
        lista.appendChild(item);
    }
}

// Função para adicionar um aluno
async function adicionarAluno() {
    const nome = document.getElementById('nome').value;
    const nota = parseFloat(document.getElementById('nota').value);
    if (!nome || isNaN(nota)) {
        alert("Por favor, preencha o nome e a nota corretamente.");
        return;
    }
    const response = await fetch('/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, nota })
    });
    if (response.ok) {
        carregarAlunos();
    } else {
        alert("Erro ao adicionar aluno.");
    }
}

// Função para consultar um aluno
async function consultarAluno() {
    const nome = document.getElementById('consulta-nome').value;
    const response = await fetch(`/alunos/${nome}`);
    const resultado = document.getElementById('resultado-consulta');
    if (response.ok) {
        const aluno = await response.json();
        resultado.textContent = `Nota de ${aluno.nome}: ${aluno.nota}`;
    } else {
        resultado.textContent = "Aluno não encontrado.";
    }
}

// Função para alterar a nota de um aluno
async function alterarAluno() {
    const nome = document.getElementById('consulta-nome').value;
    const novaNota = parseFloat(prompt("Digite a nova nota:"));
    if (!nome || isNaN(novaNota)) {
        alert("Por favor, preencha o nome e a nova nota corretamente.");
        return;
    }
    const response = await fetch(`/alunos/${nome}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nota: novaNota })
    });
    if (response.ok) {
        carregarAlunos();
    } else {
        alert("Erro ao alterar nota.");
    }
}

// Função para apagar um aluno
async function apagarAluno() {
    const nome = document.getElementById('consulta-nome').value;
    const response = await fetch(`/alunos/${nome}`, { method: 'DELETE' });
    if (response.ok) {
        carregarAlunos();
    } else {
        alert("Erro ao apagar aluno.");
    }
}

// Função para calcular a média da turma
async function calcularMedia() {
    const response = await fetch('/media');
    const resultado = document.getElementById('resultado-media');
    if (response.ok) {
        const data = await response.json();
        resultado.textContent = `Média da turma: ${data.media.toFixed(2)}`;
    } else {
        resultado.textContent = "Nenhum aluno cadastrado.";
    }
}
// Carrega a lista de alunos ao iniciar
carregarAlunos();