/*
 * Conceitos-chave do React aplicados:
 * - useRef: Para obter uma referência direta à tag <canvas> do DOM.
 * - useState: Para controlar se o utilizador está a desenhar, a cor e a espessura.
 * - useEffect: Para configurar o contexto do canvas assim que o componente é montado
 * e para atualizar o contexto sempre que a cor ou a espessura mudarem.
 *
 * Conceitos-chave do Canvas aplicados:
 * - getContext('2d'): Para obter as ferramentas de desenho.
 * - Eventos do Mouse: onMouseDown, onMouseUp, onMouseMove.
 * - Métodos de Desenho: beginPath, moveTo, lineTo, stroke, lineCap.
 */

import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function Paint() {
    // --- Refs ---
    // ref para a tag <canvas>
    const canvasRef = useRef(null);
    // ref para guardar o contexto de desenho (as "ferramentas")
    const contextRef = useRef(null);

    // --- Estados ---
    // Estado para saber se o botão do rato está pressionado
    const [isDrawing, setIsDrawing] = useState(false);
    // Estados para o desafio (cor e espessura)
    const [cor, setCor] = useState('#000000');
    const [espessura, setEspessura] = useState(5);
    const [isErasing, setIsErasing] = useState(false); // Estado para a borracha

    // --- Efeito de Configuração (Setup) ---
    // Este useEffect é executado APENAS UMA VEZ, quando o componente é montado.
    useEffect(() => {
        const canvas = canvasRef.current;
        // Define um tamanho fixo para o canvas (pode ser dinâmico)
        canvas.width = 800;
        canvas.height = 500;

        // Obtém o contexto 2D
        const context = canvas.getContext('2d');
        context.lineCap = 'round'; // Deixa as linhas com pontas arredondadas
        context.strokeStyle = cor; // Define a cor inicial
        context.lineWidth = espessura; // Define a espessura inicial

        // Guarda o contexto no ref para o podermos usar noutras funções
        contextRef.current = context;
    }, []); // O array vazio [] garante que isto só é executado uma vez.

    // --- Efeito de Atualização (Cor/Espessura) ---
    // Este useEffect é executado sempre que os estados 'cor' ou 'espessura' mudam.
    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = isErasing ? '#F0F2F5' : cor; // Use a cor de fundo do body
            contextRef.current.lineWidth = espessura;
            contextRef.current.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
        }
    }, [cor, espessura, isErasing]); // Array de dependências

    // Funções de Evento do Mouse

    const iniciarDesenho = (evento) => {
        // evento.nativeEvent.offsetX/Y dá-nos as coordenadas X e Y
        // relativas ao canto superior esquerdo do PRÓPRIO CANVAS.
        const { offsetX, offsetY } = evento.nativeEvent;

        contextRef.current.beginPath(); // Começa um novo "caminho" de desenho
        contextRef.current.moveTo(offsetX, offsetY); // Move o "pincel" para onde o rato clicou
        setIsDrawing(true); // Ativa o modo de desenho
    };

    const pararDesenho = () => {
        contextRef.current.closePath(); // Fecha o caminho de desenho
        setIsDrawing(false); // Desativa o modo de desenho
    };

    const desenhar = (evento) => {
        // Só desenha se o botão do rato estiver pressionado (isDrawing === true)
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = evento.nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY); // Desenha uma linha da posição anterior até à atual
        contextRef.current.stroke(); // "Pinta" a linha na tela
    };

    const limparTela = () => {
        const originalCompositeOperation = contextRef.current.globalCompositeOperation;
        contextRef.current.globalCompositeOperation = 'source-over';
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.globalCompositeOperation = originalCompositeOperation; // Restaura
    };

    const toggleEraser = () => {
        setIsErasing(prev => !prev); // Alterna o estado da borracha
    };

    return (
        <div className="paint-container">
            <h1 className="paint-title">
                Quadro de Desenho Simples
            </h1>

            <div className="paint-toolbar">
                <label htmlFor="cor">Cor:</label>
                <input
                    type="color"
                    id="cor"
                    value={cor}
                    onChange={(e) => {
                        setCor(e.target.value);
                        setIsErasing(false); // Desativa a borracha ao escolher uma cor
                    }}
                    disabled={isErasing} // Desativa a seleção de cor quando a borracha está ativa
                />

                <label htmlFor="espessura">Espessura:</label>
                <input
                    type="range"
                    id="espessura"
                    min="1"
                    max="50"
                    value={espessura}
                    onChange={(e) => setEspessura(e.target.value)}
                />
                <span>{espessura}px</span>

                <button
                    onClick={toggleEraser}
                    className={`botao-borracha ${isErasing ? 'active' : ''}`}
                >
                    {isErasing ? 'Desativar Borracha' : 'Ativar Borracha'}
                </button>

                <button onClick={limparTela} className="botao-limpar">Limpar Tudo</button>
            </div>

            {/* --- A TELA DE DESENHO (Canvas) --- */}
            <canvas
                ref={canvasRef} // Liga o ref ao elemento canvas
                onMouseDown={iniciarDesenho} // Evento: Clicar com o rato
                onMouseUp={pararDesenho}     // Evento: Soltar o clique
                onMouseLeave={pararDesenho}  // Evento: Rato sai da tela (evita bugs)
                onMouseMove={desenhar}       // Evento: Mover o rato
            />
        </div>
    );
}

export default Paint;




// import { useState } from "react";
// import "./App.css";
// function App() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     console.log(formData)
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Aqui você pode adicionar lógica para enviar os dados (ex: API)
//   };

//   return (
//     <div className="container">
//     <div className="form-box">
//       <form className="form" onSubmit={handleSubmit}>
//         <span className="title">Log in</span>
//         <span className="subtitle">Log in with your email account.</span>

//         <div className="form-container">
//           <input
//             type="email"
//             className="input"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             className="input"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit">Log in</button>
//       </form>

//       <div className="form-section">
//         <p>
//           create an account? <a href="/login">Sign up</a>
//         </p>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default App;