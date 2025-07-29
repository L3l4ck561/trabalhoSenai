let tabuleiro = [0,0,0,0,0,0,0,0,0] // 0 = vazio, 1 = X, -1 = O

let jogadorAtual = 1; // 1 para X, -1 para O
let jogoAtivo = true;

let pontoX = 0
let pontoO = 0

const celulas = document.querySelectorAll('.celula')
const msg = document.getElementById('mensagem')
const jogadorAtualSpan = document.getElementById('jogador-atual')

celulas.forEach((celulas, index)=>{
    celulas.addEventListener('click', () =>{
        if(jogoAtivo && tabuleiro[index] === 0){
            tabuleiro[index] = jogadorAtual
            celulas.textContent = jogadorAtual === 1 ? 'X' : 'O'
            celulas.setAttribute('data-jogador', jogadorAtual === 1 ? 'X' : 'O')
            if(verificarVencedor()){
                msg.textContent = `Jogador ${jogadorAtual === 1 ? 'X' : 'O'} Venceu!!`;
                jogoAtivo = false;
                pontuacao()
            }else if (tabuleiro.every(celula => celula != 0)){
                msg.textContent = 'Empate!!'
                jogoAtivo = false
            }else{
                jogadorAtual *= -1;
                jogadorAtualSpan.textContent = jogadorAtual === 1 ? 'X' : 'O'
            }
        }
    })
})

function verificarVencedor(){
    const ganhador = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]
    for (posVencedor of ganhador) {
        const [a, b, c] = posVencedor;
        if (tabuleiro[a] !==0 && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return true
        }
    }
}

function reiniciar(){
tabuleiro = [0,0,0,0,0,0,0,0,0]
jogadorAtual = 1;
jogoAtivo = true;
msg.innerHTML =''
jogadorAtualSpan.innerHTML = 'X'
celulas.forEach((celulas)=>{
    celulas.textContent = ''
    celulas.setAttribute('data-jogador', '')

})
}

function pontuacao(){
    const jogador1 = document.getElementById('primeiro')
    const jogador2 = document.getElementById('segundo')
    const ponto1 = document.getElementById('ponto1')
    const ponto2 = document.getElementById('ponto2')

    if(jogadorAtual == 1){
        pontoX++
    }else{
        pontoO++
    }

    if(pontoO == pontoX){
    jogador1.innerHTML = "1º O & X"
    jogador2.innerHTML = ""
    ponto1.innerHTML = pontoO
    ponto2.innerHTML = ''
    }else{
        if(pontoO < pontoX){
            jogador1.innerHTML = "1º X"
            jogador2.innerHTML = "2º O"
            ponto1.innerHTML = pontoX
            ponto2.innerHTML = pontoO
        }else{
            jogador1.innerHTML = "1º O"
            jogador2.innerHTML = "2º X"
            ponto2.innerHTML = pontoX
            ponto1.innerHTML = pontoO
        }
    }
}