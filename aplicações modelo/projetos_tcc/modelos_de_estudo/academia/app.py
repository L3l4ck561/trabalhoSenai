from flask import Flask, request, render_template, redirect, url_for, flash, send_file, Response
import mysql.connector
import hashlib
import io

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'  # Mude para uma chave secreta mais forte!

# Função para criptografar a senha usando SHA-256
def criptografar_senha(senha):
    return hashlib.sha256(senha.encode()).hexdigest()

# Conexão com o banco de dados
def conectar_banco():
    return mysql.connector.connect(
        host='localhost',
        user='root',          # Substitua pelo seu usuário
        password='',        # Substitua pela sua senha
        database='academia', # Substitua pelo nome do seu banco
        port = 3307
    )

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para cadastro de usuários
@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    nome = request.form['nome']
    nome_usuario = request.form['nome_usuario']
    email = request.form['email']
    senha = request.form['senha']
    telefone = request.form['telefone']
    data_nascimento = request.form['data_nascimento']
    foto = request.files['foto_perfil']

    # Verificando se a foto foi enviada
    if foto:
        foto_binaria = foto.read()
    else:
        flash("Por favor, envie uma foto.")
        return redirect(url_for('index'))

    # Conexão com o banco de dados
    conn = conectar_banco()
    cursor = conn.cursor()

    # Criptografando a senha
    senha_criptografada = criptografar_senha(senha)

    # Inserindo os dados no banco
    sql = """INSERT INTO usuarios_academia 
             (nome, nome_usuario, email, senha, telefone, data_nascimento, foto_perfil) 
             VALUES (%s, %s, %s, %s, %s, %s, %s)"""
    valores = (nome, nome_usuario, email, senha_criptografada, telefone, data_nascimento, foto_binaria)

    cursor.execute(sql, valores)
    conn.commit()
    cursor.close()
    conn.close()

    flash("Cadastro realizado com sucesso!")
    return redirect(url_for('index'))

# Rota para buscar usuário pelo nome de usuário
@app.route('/buscar_usuario', methods=['POST'])
def buscar_usuario():
    nome_usuario = request.form['busca_nome_usuario']
    
    conn = conectar_banco()
    cursor = conn.cursor()

    # Buscando o usuário pelo nome de usuário
    sql = "SELECT id FROM usuarios_academia WHERE nome_usuario = %s"
    cursor.execute(sql, (nome_usuario,))
    resultado = cursor.fetchone()

    cursor.close()
    conn.close()

    if resultado:
        # Redireciona para a página inicial com os parâmetros de busca
        return redirect(url_for('index', usuario_encontrado="true", nome_usuario=nome_usuario))
    else:
        flash('Usuário não encontrado.')
        return redirect(url_for('index'))

# Rota para baixar a imagem de um usuário pelo nome de usuário
@app.route('/download_image')
def download_image():
    nome_usuario = request.args.get('nome_usuario')
    
    conn = conectar_banco()
    cursor = conn.cursor()

    # Selecionando a imagem com base no nome de usuário
    sql = "SELECT foto_perfil FROM usuarios_academia WHERE nome_usuario = %s"
    cursor.execute(sql, (nome_usuario,))
    resultado = cursor.fetchone()

    cursor.close()
    conn.close()

    if resultado and resultado[0]:
        foto_binaria = resultado[0]
        return send_file(
            io.BytesIO(foto_binaria),
            mimetype='image/jpeg',
            as_attachment=True,
            download_name=f'{nome_usuario}_foto.jpg'
        )
    else:
        flash('Foto não encontrada para este usuário.')
        return redirect(url_for('index'))

# Rota para baixar o código binário da imagem em um arquivo .txt pelo nome de usuário
@app.route('/download_binary')
def download_binary():
    nome_usuario = request.args.get('nome_usuario')
    
    conn = conectar_banco()
    cursor = conn.cursor()

    # Selecionando a imagem com base no nome de usuário
    sql = "SELECT foto_perfil FROM usuarios_academia WHERE nome_usuario = %s"
    cursor.execute(sql, (nome_usuario,))
    resultado = cursor.fetchone()

    cursor.close()
    conn.close()

    if resultado and resultado[0]:
        foto_binaria = resultado[0]
        # Retornar o código binário da imagem como arquivo .txt
        return Response(
            foto_binaria,
            mimetype='text/plain',
            headers={'Content-Disposition': f'attachment;filename={nome_usuario}_imagem.txt'}
        )
    else:
        flash('Código binário não encontrado para este usuário.')
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
