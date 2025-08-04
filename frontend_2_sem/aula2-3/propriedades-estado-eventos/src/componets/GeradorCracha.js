// GeradorCracha.js
/*
----------------------------------------------------------------
| Conceitos abordados:                                         |
| 1. Hook useState: Para armazenar os dados do formulário      |
|    (nome e cargo).                                           |
| 2. Eventos onChange: Para capturar a digitação do usuário    |
|    nos campos de input em tempo real.                        |
| 3. Evento onClick: Para limpar o formulário com um botão.    |
----------------------------------------------------------------
*/

// Arquivo: src/components/GeradorCracha.js
import React, { useState } from 'react';
import './GeradorCracha.css';

function GeradorCracha() {
    // --- 1. HOOK useState ---
    // Criamos "estados" para guardar as informações que o usuário digita.
    // Cada estado tem uma variável (ex: 'nome') e uma função para atualizá-la (ex: 'setNome').
    const [nome, setNome] = useState('Seu Nome');
    const [cargo, setCargo] = useState('Seu Cargo');
    const [imagem, setImagem] = useState('https://placehold.co/100x100/2a9d8f/white?text=Foto');

    // --- 2. FUNÇÕES DE EVENTO ---
    // Esta função será chamada pelo evento 'onChange' do input de nome.
    const handleNomeChange = (evento) => {
        // Usamos a função 'setNome' para atualizar o estado 'nome'
        // com o valor atual do campo de input (evento.target.value).
        setNome(evento.target.value);
    };

    // Esta função será chamada pelo evento 'onChange' do input de cargo.
    const handleCargoChange = (evento) => {
        setCargo(evento.target.value);
    };

    // Esta função será chamada pelo evento 'onChange' do input de imagem.
    const handleImagemChange = (evento) => {
        setImagem(evento.target.value);
    };

    // Esta função será chamada pelo evento 'onClick' do botão de limpar.
    const handleLimpar = () => {
        setNome('Seu Nome');
        setCargo('Seu Cargo');
        setImagem('https://placehold.co/100x100/2a9d8f/white?text=Foto');
    };

    // Função para chamar uma impressão do crachá
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="container-gerador">
            <div className="formulario no-print">
                <h2>Preencha os dados</h2>

                <label htmlFor="nome">Nome:</label>
                {/* O valor do input é ligado ao estado 'nome' */}
                {/* O evento 'onChange' chama nossa função para atualizar o estado */}
                <input
                    type="text"
                    id="nome"
                    value={nome === 'Seu Nome' ? '' : nome}
                    placeholder="Digite seu nome"
                    onChange={handleNomeChange}
                />

                <label htmlFor="cargo">Cargo:</label>
                <input
                    type="text"
                    id="cargo"
                    value={cargo === 'Seu Cargo' ? '' : cargo}
                    placeholder="Digite seu cargo"
                    onChange={handleCargoChange}
                />

                <label htmlFor="imagem">URL da Imagem:</label>
                <input
                    type="text"
                    id="imagem"
                    value={imagem.startsWith('https://placehold.co') ? '' : imagem}
                    placeholder="Cole a URL de uma imagem"
                    onChange={handleImagemChange}
                />

                {/* O evento 'onClick' chama a função para limpar os dados */}
                <button onClick={handleLimpar}>
                    Limpar Crachá
                </button>
            </div>

            <div className="preview">
                <h2 className='no-print'>Preview do Crachá</h2>
                <div className="cracha">
                    <img src={imagem} alt="Foto do perfil" className="cracha-foto" />
                    {/* Os textos do crachá são lidos diretamente das variáveis de estado */}
                    <h3 className="cracha-nome">{nome}</h3>
                    <p className="cracha-cargo">{cargo}</p>
                    <button onClick={handlePrint} className='botao-imprimir no-print'>
                        Imprimir Crachá
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GeradorCracha;



