describe('Exemplos de matchers do JEST', () => {
    test('.tobe() = sompara valores rimitivos', () => {
        expect(2 + 2).toBe(4);
    })
    test('.toEqual() = comparar objetos e vetores', () => {
        const obj = { a: 1, b: 2 }
        const obj2 = { a: 1, b: 2 }
        expect(obj).toEqual(obj2);
    })
    test('.toBeTruthy() = verifica se o valor é verdadeiro', () => {
        expect(5 > 3).toBeTruthy();
    })
    test('.toBeFalsy() = verifica se o valor é falso', () => {
        expect(null).toBeFalsy();
    })
    test('.toContain() = verifica se o vetor contem o valor', () => {
        let lista = ['banana', 'maçã', 'melão', 'tomate']
        expect(lista).toContain('tomate');
    })
    test('.toThrow() = verifica se a sua função está lançando erros', () => {
        function erro() {
            throw new Error('Erro forçado')
        }
        expect(() => erro()).toThrow('Erro forçado');
    })
    test('.toBeDefined() verificar se a variável está definida', () => {
        const nome = 'Carlos';
        expect(nome).toBeDefined()
    })
    test('.toBeGreaterThan() verificar se o valor é maior que o outro', () => {
        expect(30).toBeGreaterThan(20)
    })

    //atividade
    test('.toBeGreaterThanOrEqual() = verificar se o valor é maior que o outro ou igual', () => {
        expect(30).toBeGreaterThanOrEqual(30)
    })
    test('.toBeLessThan() = verificar se o valor é menor que o outro', () => {
        expect(30).toBeLessThan(40)
    })
    test('.toBeLessThanOrEqual() = verificar se o valor é menor que o outro ou igual', () => {
        expect(20).toBeLessThanOrEqual(20)
    })

    test('.toBeNaN() = verificar se não é um número', () => {
        expect(0 / 0).toBeNaN()
    })

    class Carro {
        constructor() {
            this.marca = marca
            this.modelo = modelo
            this.ano = ano
        }
        descrever() {
            console.log(`Este é um ${this.marca} ${this.modelo} de ${this.ano}.`)
        }
    }
    test('.toBeInstanceOf() = verificar se é uma instancia de algo', () => {
        const carro1 = new Carro ("Ford", "Ka", 2020)
        expect(carro1).toBeInstanceOf(Carro)
    })
    test('.toBeCloseTo() = verificar se o valor é fracionado ', () => {
        expect(0.3 + 0.4).toBeCloseTo(0.7)
    })
    test('.toBeUndefined() = verificar se a variável não é definida', () => {
        let nome;
        expect(nome).toBeUndefined()
    })
})