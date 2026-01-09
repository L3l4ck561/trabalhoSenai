from flask import Flask, jsonify, request, render_template, redirect, url_for, flash
import json
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = "SENAI791@PYTHON"

# Criando um vetor para armazrenar msg do chat
tasks = [[],[],[],[],[],[]]
cod = 0
conta = ''
nome = ''
titulo = [
    'Jogando Mario Kart 8 Deluxe',
    'Jogando The Legend of Zelda: Breath of the Wild',
    'Jogando Super Smash Bros. Ultimate',
    'jogando Fortnite',
    'Jogando Minecraft',""
]
# Rota para renderizar a tela HTML inicial
@app.route('/')
def home():
    return render_template('pagina_inicial.html')

@app.route('/sair')
def sair():
    return redirect(url_for('home'))

@app.route('/cadastro')
def cadastron():
    return render_template('cadastro.html')
@app.route('/validar-cadastro', methods=['POST'])
def validar_cadastro():
    # Recupera as informações do formulário.
    nome = request.form.get('nome')
    nascimento = request.form.get('nascimento')
    email = request.form.get('email')
    senha = request.form.get('senha')
    # Verifica se existe um arquivo com os dados dos usuários.
    if os.path.exists("data/usuarios.json"):
        # Lê o arquivo JSON existente.
        with open("data/usuarios.json", "r", encoding="utf-8") as arquivo:
            # Carrega os dados do arquivo em uma variável.
            usuarios = json.load(arquivo)
    else:
        # Cria uma nova lista, para cadastrar os usuários.
        usuarios = []

    # Laço de repetição que percorre todos os usuários cadastrados.
    for usuario in usuarios:
        # Verifica se o CPF informado já está cadastrado.
        if (usuario['email'] == email):
            flash("O email informado já está cadastrado...")
            return redirect('/login')
    
    # Cria um dicionário com as informações preenchidas no formulário.
    dados = {
        "nome": nome,
        "nascimento": nascimento,
        "email": email,
        "senha": senha,
        "imagem": "/static/user.png"
    }
    # Adiciona o novo usuário com seus dados.
    usuarios.append(dados)
    # Grava os novos dados no arquivo JSON.
    with open("data/usuarios.json", "w", encoding="utf-8") as arquivo:

        # Salva o arquivo JSON com os novos dados e os formata.
        json.dump(usuarios, arquivo, indent=4)

    # Envia uma mensagem de sucesso na gravação dos dados.
    flash("O usuário foi cadastrado com sucesso!!!")
    # Redireciona para a tela de login, após cadastrar o usuário.
    return redirect('/login')

@app.route('/login')
def login():
     return render_template('login.html')
#rota para avalidar o login
@app.route("/validar-login", methods=['post'])
def validar_login():
    email = request.form.get('email')
    senha = request.form.get('senha')
    with open('data/usuarios.json', 'r', encoding='utf-8') as arquivo:
        usuarios = json.load(arquivo)
        for usuario in usuarios:
            if (usuario['email'] == email and usuario['senha'] == senha):
                global conta
                conta = usuario['email']
                return redirect('/index')
        return redirect('/login')
    return redirect('/login')

#rota para pagina aberta
@app.route('/index', methods=['GET'])
def index():
    global cod, titulo, conta, nome
    if request.args.get('cod') != None:
        cod = int(request.args.get('cod'))
    
    with open('data/usuarios.json', 'r', encoding='utf-8') as arquivo:
        usuarios = json.load(arquivo)
    tasks = usuarios[0]["chat"]
    for usuario in usuarios:
        if(usuario['email'] == conta):
            nome = usuario["nome"]
            break



    return render_template('index.html',tasks=tasks[cod],cod = cod,titulo = titulo[cod], conta = conta)

#rota para enviar msg no chat
@app.route('/add/<cod>',methods=['POST'])
def add(cod):
    global conta, nome
    task_description = request.form['task']
    task = {
        'conta': conta,
        'user': nome,
        'id': len(tasks[int(cod)]) + 1,
        'task': task_description
    }
    tasks[int(cod)].append(task)

    with open('data/usuarios.json', 'r', encoding='utf-8') as arquivo:
        usuarios = json.load(arquivo)

    usuarios[0]["chat"] = tasks

    with open('data/usuarios.json', 'w', encoding='utf-8') as arquivo:
        json.dump(usuarios, arquivo, indent=4)

    return redirect(url_for('index'))

@app.route('/conf')
def conf(cod=0):
    if request.args.get('cod') != None:
        cod = int(request.args.get('cod'))

    global conta
    with open('data/usuarios.json', 'r', encoding='utf-8') as arquivo:
        usuarios = json.load(arquivo)
    for usuario in usuarios:
        if(usuario['email'] == conta):
            return render_template('perfil.html',cod = cod, usuario = usuario)
    flash('Usuário não encontrado...')
    return render_template('perfil.html',cod = cod)

@app.route('/perfil')
def perfil(cod=0):
    if request.args.get('cod') != None:
        cod = int(request.args.get('cod'))
    global conta
    with open('data/usuarios.json', 'r', encoding='utf-8') as arquivo:
        usuarios = json.load(arquivo)
    for usuario in usuarios:
        if(usuario['email'] == conta):
            return render_template('index.html',cod = cod, usuario = usuario)
    flash('Usuário não encontrado...')
    return render_template('index.html',cod = cod)

@app.route('/editar', methods=['post'])
def editar():
    nome = request.form.get('nome')
    nascimento = request.form.get('nascimento')
    email = request.form.get('email')
    senha = request.form.get('senha')

    with open('data/usuarios.json', 'r', encoding='utf-8') as arquivo:
        usuarios = json.load(arquivo)
    global conta
    for usuario in usuarios:
        if (usuario['email'] == conta):
            usuario['nome'] = nome
            usuario['nascimento'] = nascimento
            usuario['email'] = email
            usuario['senha'] = senha
            break
    
    with open('data/usuarios.json', 'w', encoding='utf-8') as arquivo:
        json.dump(usuarios, arquivo, indent=4)
    flash("Usuário alterado com sucesso!!!")
    return redirect('conf')

@app.route('/excluir')
def excluir():
    with open('data/usuarios.json', 'r', encoding='utf-8') as arquivo:
        usuarios = json.load(arquivo)
    index_usuario = None
    for index, usuario in enumerate(usuarios):
        global conta
        if (usuario['email'] == conta):
            index_usuario = index
            break

    if (index_usuario is not None):
        usuarios.pop(index_usuario)
        with open('data/usuarios.json', 'w', encoding='utf-8') as arquivo:
            json.dump(usuarios, arquivo, indent=4)

        flash("Usuário excluído com sucesso!!!")
    else:
        flash("Não foi possível excluir o usuário!!!")
    return redirect("/")

@app.route('/img-perfil', methods=['POST'])
def img_perfil():
    url = request.form.get('url')
    print(url)

    with open('data/usuarios.json', 'r', encoding='utf-8') as arquivo:
        usuarios = json.load(arquivo)
    global conta
    for usuario in usuarios:
        if (usuario['email'] == conta):
            usuario['imagem'] = url
            break
    
    with open('data/usuarios.json', 'w', encoding='utf-8') as arquivo:
        json.dump(usuarios, arquivo, indent=4)
    flash("Usuário alterado com sucesso!!!")
    return redirect('index')

if __name__=='__main__':
     app.run(debug=True)