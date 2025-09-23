function soma (a,b){
    return a+b
}

function subtrai(a,b){
    return a-b
}

function mutiplica(a,b){
    return a*b
}

function divide(a,b){
    if(b===0) throw new Error("Divisão por 0")
    return a/b
}

function paripar(a){
    if(typeof(a)==='string' || a=='') throw new Error("valor inválido - você inseriu texto, ou, o valor é nulo")
    
    return a%2 ? 'impar':'par'
}

function potencia(b, e){
    if(typeof(b)==='string' || b=='') throw new Error("valor 'base' inválido - você inseriu texto, ou, o valor é nulo")
    if(typeof(e)==='string' || e=='') throw new Error("valor 'expoente' inválido - você inseriu texto, ou, o valor é nulo")
    return Math.pow(b,e)
}

function raizQuadrada(a){
    if(a<=0) throw new Error("valor inválido - é igual a 0, ou, negativo")
    return Math.sqrt(a)
}

module.exports = {soma,subtrai,mutiplica,divide,paripar,potencia,raizQuadrada}