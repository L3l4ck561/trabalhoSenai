// Seleciona o formulário e elementos
const form = document.getElementById('form-livro');
const idInput = document.getElementById('id');
const tituloInput = document.getElementById('titulo');
const autorInput = document.getElementById('autor');
const anoInput = document.getElementById('ano');
const generoInput = document.getElementById('genero');
const btnCancelar = document.getElementById('btn-cancelar');

// Função para preencher o formulário para edição
function editarLivro(id, titulo, autor, ano, genero) {
    idInput.value = id;
    tituloInput.value = titulo;
    autorInput.value = autor;
    anoInput.value = ano;
    generoInput.value = genero;
    form.action = `/livros/${id}`; // Muda o action para atualizar
    btnCancelar.style.display = 'inline'; // Mostra o botão Cancelar
}

// Botões Editar
document.querySelectorAll('.btn-editar').forEach(button => {
    button.addEventListener('click', () => {
        const row = button.closest('tr');
        const id = row.dataset.id;
        const titulo = row.cells[0].textContent;
        const autor = row.cells[1].textContent;
        const ano = row.cells[2].textContent;
        const genero = row.cells[3].textContent;
        editarLivro(id, titulo, autor, ano, genero);
    });
});

// Botões Excluir
document.querySelectorAll('.btn-excluir').forEach(button => {
    button.addEventListener('click', async () => {
        const row = button.closest('tr');
        const id = row.dataset.id;
        if (confirm('Tem certeza que deseja excluir este livro?')) {
            try {
                const response = await fetch(`/livros/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    row.remove(); // Remove a linha da tabela
                } else {
                    alert('Erro ao excluir livro');
                }
            } catch (err) {
                alert('Erro ao conectar com o servidor');
            }
        }
    });
});

// Botão Cancelar
btnCancelar.addEventListener('click', () => {
    form.reset();
    idInput.value = '';
    form.action = '/livros'; // Volta para criar
    btnCancelar.style.display = 'none';
});