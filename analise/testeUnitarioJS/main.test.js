const {soma,subtrai,mutiplica,divide,paripar,potencia,raizQuadrada} = require('./main')
test('somando 1+2 para igualar a 3',()=>{
    expect(soma(1,2)).toBe(3);
});

test('subtraindo 546 de 238 para igualar a 308',()=>{
    expect(subtrai(546,238)).toBe(308);
});

test('dividindo 16 de 2 para igualar a 8',()=>{
    expect(divide(16,2)).toBe(8);
});

test('mutiplicando 16 de 2 para igualar a 32',()=>{
    expect(mutiplica(16,2)).toBe(32);
});

test('verificando se o número é par, ou, impar',()=>{
    expect(paripar(2)).toBe('par');
});

test('potencia de 2^2 para igualar a 4',()=>{
    expect(potencia(2,2)).toBe(4);
});

test('Raiz Quadrada de 16',()=>{
    expect(raizQuadrada(16)).toBe(4);
});