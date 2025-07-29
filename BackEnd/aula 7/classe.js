var meuObjeto = {};

var meuObjeto = novObjeto();

function objeto()
{
    var meuObjeto = novObjeto();
    alert(typeof meuObjeto);
}

//vamos chamar de ligar() o nome do nosso método.

//varnomeDoMetodo = function(){
// [codigo do metodo]
// }

// por exemplo, o metodo ligar exibe um alert:

function obj()
{
    var meuCarro = novObjeto();
    meuCarro.marca = "Corolla";
    meuCarro.ligar = function(){
        alert("Ligando o carro...vruuuummm!")
    }
    meuCarro.ligar();
}


// Uma maneira nais facil de se trabalhar com objetos, é declarando eles, suas prioridaes e metodos com pares chave/valor

var meObjeti = {
    chave1 : valor1, 
    chave2 : valor2,
    chave3 : valor3,
}

function obj()
{
    var meuCarro = {
        modelo : "Corolla",
        ano : 2018,
        exibeInfo: function(){
            alert("Meu carro é um modelo " + this.modelo + " e ano " + this.ano);
        }
    }
    meuCarro.exibeInfo();
}


// objetos nativos:
// vamos usar o metodo sqrt() (square root), ou raiz quadrada

// ou seja:
Math.sqrt(16) = 4
Math.sqrt(25) = 5
Math.sqrt(2112) = 45,95650117230423

// ou seja, se o resultado for inteiro ele mostra inteiro, e se for quebrado ele mostra o float

//Elevado: pow(x,y)
Math.pow(2,7) = 129
Math.pow(9,0.5) = 3.0

//Trigonometria
//seno
Math.sin(0) = 0
//cosseno 
Math.cos(0) = 1
//tangente
Math.tan(0) = 0
//logaritimo
Math.log(2.718282) = 1

//Arredondar para cima
Math.ceil(21.12) = 22
Math.ceil(-8.8) = -8
//Arredondar para baixo
Math.floor(21.12) = 21
Math.floor(-8, 8) = -9
//Arredondar para o inteiro mais proximo
Math.round(8.75) = 9
Math.round(21.12) = 21

//Máximo e mínimo 
Math.max(2.1, 1.2) = 2.1
Math.min(-21, 12) = -21

//Método de caracteres
string.charAt( indice )
//retorna uma string contendo o caractere do índice específico

string.charCodeAtc( indice )
//retorna o valor unicode do caractere na posicao indice de uma string

string.formCharCode (valor1, valor2, ... )
//converte uma lista de valores em unicode em uma string, com os valores correspondentes

//transforma todas as letras em maiuscula
string.toLoweCase()
//transforma todas as letras em minusculas
string.toLowerCase()

//métodos de busca
string.indexOf(substring, indice)
//procura, a partir do índice "índice", uma string a substring dentro da string que invocou o metodo, se nao achar nada, retorna -1
//se nao informa o indice, comeca do 0

string.lastIndexOf(substring, indice)
//Procura a última ocorrência da string substring, a partir do indice de onde ela começa. se nao achar nada, retorna -1

//quebrando strings
string.concat(string)
//concatena, ou seja, adiciona ao final.

string.replace(stringProcurada, stringNova)
//procura uma string, e substitui a primeira ocorrencia por outra string, e retorna a string modificada.

string.slice(Inicio, fim)
//Corta a string e retorna a string cortada

string.split(substring)
//Corta a string original dm um array de strings
//substring é um delimitador entre um elemento e outro

string.substr( inicio, tamanho)
//retorna uma string que contém "tamanho" caracteres, comecando do caractere "inicio
// se nao informar, ele vai ate o final da string"

//dia, mes e ano
getDate() //- retorna de 1 a 31
getMonth() //- retorna de 0 a 11
//0 representa domingo e 6 sabado
getMonth() //- retorna de 0 a 11
getFullYear() // - retorna 4 digitos, com o ano atual

//exemplo
function exibe()
{
    var d = new Date();
    document.write("Dia da semana: "+(d.getDay()+1)+"<br />")
    document.write("Dia do mês: "+d.getDate()+"<br />")
    document.write("Dia do ano: "+(d.getMonth()+1)+"<br />")
    document.write("Ano: "+d.getYear()+"<br />")
}

//Millisegundos, segundos, minutos e horas
getHours() //retorna um número de 0 a 23
getMinutes() //retorna um numero de 0 a 59
getSeconds() //retorna um inteiro de 0 a 59
getMilliseconds() //retorna um inteiro de 0 a 999

//Exemplo:
function exibe()
{
    var d = new Date();
    document.write(d.getHours()+"h"+d.getMinutes()+"min" +d.getSeconds()+ "s e" + d.getMilliseconds()+"milisegundos");
}