from flask import Flask, render_template, request, redirect, url_for,jsonify
#importa do Flask: a classe principal do Flask, função Json
# para respostas JSON, objeto request para dados de requisição
# e render_templates para renderizar html.

app = Flask(__name__)
#cria uma instância de aplicação flask, __name__ é o nome do módulo atual

#Dicionario para armazenar os alunos e suas notas
alunos = {}
#Cria um dicionario vazio que sera usado como "banco de dados" em armazenamento

cor = "NOITE"

#Rota para a página inicial
@app.route('/')
#Define uma rota para o endereço raiz ('/') usando o "@app.route"
def index():
    global cor
    return render_template('index.html', cor=cor)
    #Função que retorna um template HTML chamado "index.html"

@app.route('/cor')
def index2():
    global cor
    if cor == "NOITE":
        cor = "DIA"
    else:
        cor = "NOITE"
    return redirect(url_for('index'))

#rota para obter a lista de alunos
@app.route('/alunos', methods=['GET'])
#Define uma rota para o endereço '/alunos' usando o "@app.route", que aceita apenas o método GET
def get_alunos():
    return jsonify(alunos)
    #Função que retorna um JSON com os dados dos alunos

#Rota para adicionar um aluno
@app.route('/alunos', methods=['POST'])
#Define a mesma rota "/alunos", mas agora aceitamos o método POST
def add_aluno():
    data = request.json
    #Pega os dados da requisição JSON enviados na reuqecisão
    nome = data.get('nome')
    #extrai o campo "nome" do JSON
    nota = data.get('nota')
    #extrai o campo "nota" do JSON
    if nome in alunos:
        #verifica se o aluno já existe no dicionário
        return jsonify({'error': 'Aluno já existe'}), 400
        #retorna erro 400(bad request) se o aluno já existe
    alunos[nome] = nota
    #adiciona o aluno e sua nota ao dicionario
    return jsonify({'nome': nome, 'nota': nota}), 201
    #retorna um JSON com os dados do aluno criado e código de status 201(created)

#rota para alterar a nota de um aluno
@app.route('/alunos/<nome>', methods=['PUT'])
#Define uma rota com parametro dinamico <nome> para metodo put
def update_aluno(nome):
    data=request.json#obtem os dados JSON da requisição
    if nome not in alunos:
        #verifica se o aluno existe no dicionario
        return jsonify({'error': 'Aluno não existe'}), 404
    #retorna erro 404(not found) se o aluno não existe
    alunos[nome] = data.get('nota')
    #atualiza a nota do aluno no dicionario
    return jsonify({"success":True})
    # retorna um JSON com sucesso

#rota para consultar a nota de um aluno
@app.route('/alunos/<nome>', methods=['GET'])
#Define uma rota com parametro dinamico <nome> para metodo get
def get_aluno(nome):
    if nome not in alunos:
        #verifica se o aluno existe no dicionario
        return jsonify({'error': 'Aluno não existe'}), 404
    #retorna erro 404(not found) se o aluno não existe
    return jsonify({'nome': nome, "nota": alunos[nome]})
#retorna um JSON com os dados do aluno

#rota para apagar um aluno
@app.route('/alunos/<nome>', methods=['DELETE'])
#Define uma rota com parametro dinamico <nome> para metodo delete
def delete_aluno(nome):
    if nome not in alunos:
        #verifica se o aluno existe no dicionario
        return jsonify({'error': 'Aluno não existe'}), 404
    #retorna erro 404(not found) se o aluno não existe
    alunos.pop(nome)
    #remove o aluno do dicionario
    return jsonify({"success":True})
#retorna um JSON com sucesso

#rota para calcular a media das notas
@app.route('/media', methods=['GET'])
#Define uma rota para metodo get
def get_media():
    if not alunos:
        #verifica se o dicionario de alunos está vazio
        return jsonify({'error': 'Nenhum aluno cadastrado'}), 404
    #retorna erro 404(not found) se o dicionario de alunos está vazio
    media = sum(alunos.values()) / len(alunos)
    #calcula a media das notas
    return jsonify({'media': media})
#retorna um JSON com a media das notas  

if __name__ == '__main__':
    #Verifica se o script está sendo executado corretamente
    app.run(debug=True)
    #inicia o servidor com debug ativado