//criar a classe
class Hero {
    // definindo os atributos ou caracteristicas
    constructor (nome, tipo) {
        // this - refere-se ao objeto que sera criado
        this.nome = nome
        this.tipo = tipo //voa ou anda
    }
    atacar1 () {
        let ataque = ''
        let resultado
        if (this.tipo === "voa") {
            ataque = "usou visão laser"
            resultado = "Superman wins"
        } else if (this.tipo) {
            ataque = "usou batarangue"
            resultado = "Batman morreu"
        } else {
            ataque = "Defendeu"
        }

        //Exibe o cena
        console.log(`o ${hero1.nome} ${ataque} ${resultado}`)
    }
    //criando ouro cenario de ataque
    atacar2 () {
        let ataque = ''
        let resultado
        if (this.tipo === "voa") {
            ataque = "usou visão laser"
            resultado = "Superman morreu"
        } else if (this.tipo) {
            ataque = "usou batarangue com criptonita"
            resultado = "Batman wins"
        } else {
            ataque = "Defendeu"
        }

        console.log(`o ${hero1.nome} ${ataque} ${resultado}`)
    }
}

//criando o objeto
const hero1 = new Hero('Surperman', 'voa')
const hero2 = new Hero('Batman', 'anda')

// console.log(`o heroi escolhie é o ${hero1.nome}`)
// console.log(`o heroi escolhie é o ${hero2.nome}`)

hero1.atacar1()
hero2.atacar1()