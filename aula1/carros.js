// Atividade 1: Classe Carro em JavaScript
// Instruções:
// Crie um novo arquivo chamado carros.js.
// Dentro dele, defina uma classe chamada Carro.
// O constructor da classe deve aceitar três parâmetros: marca, modelo e ano.
// A classe deve ter um método chamado descrever() que retorna uma string com a descrição completa do carro, por exemplo: "Este é um Ford Ka de 2020."
// Fora da classe, crie duas instâncias (objetos) diferentes da classe Carro.
// Chame o método descrever() para cada um dos carros e exiba o resultado no console usando console.log().

class Carro {
    constructor (marca, modelo, ano) {
        this.marca = marca
        this.modelo = modelo
        this.ano = ano
    }
    descrever () {
        console.log (`Este é um ${this.marca} ${this.modelo} de ${this.ano}.`)
    }
}

const carro1 = new Carro ("Ford", "Ka", 2020)
const carro2 = new Carro ("honda", "fit", 2018)

carro1.descrever()
carro2.descrever()