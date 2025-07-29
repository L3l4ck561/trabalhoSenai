from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'chave_secreta'

# Configuração do banco de dados MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3307
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'gestao_eventos'

mysql = MySQL(app)

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Cadastro de Eventos
@app.route('/eventos', methods=['GET', 'POST'])
def eventos():
    if request.method == 'POST':
        nome = request.form['nome']
        data = request.form['data']
        local = request.form['local']
        descricao = request.form['descricao']
        capacidade = request.form['capacidade']
        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO eventos (nome, data, local, descricao, capacidade) VALUES (%s, %s, %s, %s, %s)", (nome, data, local, descricao, capacidade))
        mysql.connection.commit()
        cur.close()
        flash('Evento cadastrado com sucesso!')
        return redirect(url_for('eventos'))
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, nome, data, local, descricao, capacidade FROM eventos")
    eventos = cur.fetchall()
    cur.close()
    return render_template('eventos.html', eventos=eventos)

# Cadastro de Participantes
@app.route('/participantes', methods=['GET', 'POST'])
def participantes():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        telefone = request.form['telefone']
        cpf = request.form['cpf']
        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO participantes (nome, email, telefone, cpf) VALUES (%s, %s, %s, %s)", (nome, email, telefone, cpf))
        mysql.connection.commit()
        cur.close()
        flash('Participante cadastrado com sucesso!')
        return redirect(url_for('participantes'))
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, nome, email, telefone, cpf FROM participantes")
    participantes = cur.fetchall()
    cur.close()
    return render_template('participantes.html', participantes=participantes)

# Inscrição em Eventos
@app.route('/inscricoes', methods=['GET', 'POST'])
def inscricoes():
    if request.method == 'POST':
        participante_id = request.form['participante_id']
        evento_id = request.form['evento_id']
        
        cur = mysql.connection.cursor()
        cur.execute("SELECT COUNT(*) FROM inscricoes WHERE evento_id = %s", [evento_id])
        num_inscritos = cur.fetchone()[0]
        
        cur.execute("SELECT capacidade FROM eventos WHERE id = %s", [evento_id])
        capacidade = cur.fetchone()[0]
        
        if num_inscritos < capacidade:
            cur.execute("INSERT INTO inscricoes (participante_id, evento_id) VALUES (%s, %s)", (participante_id, evento_id))
            mysql.connection.commit()
            flash('Inscrição realizada com sucesso!')
        else:
            flash('Capacidade máxima atingida!')
        cur.close()
        return redirect(url_for('inscricoes'))
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, nome FROM eventos")
    eventos = cur.fetchall()
    
    cur.execute("SELECT id, nome FROM participantes")
    participantes = cur.fetchall()
    cur.close()
    return render_template('inscricoes.html', eventos=eventos, participantes=participantes)

# Relatórios
@app.route('/relatorios')
def relatorios():
    cur = mysql.connection.cursor()
    
    cur.execute("""
        SELECT e.nome, COUNT(i.id) as inscritos
        FROM eventos e
        LEFT JOIN inscricoes i ON e.id = i.evento_id
        GROUP BY e.id
    """)
    eventos_inscricoes = cur.fetchall()
    
    cur.execute("""
        SELECT p.nome, e.nome
        FROM participantes p
        JOIN inscricoes i ON p.id = i.participante_id
        JOIN eventos e ON i.evento_id = e.id
    """)
    participantes_eventos = cur.fetchall()
    
    cur.close()
    return render_template('relatorios.html', eventos_inscricoes=eventos_inscricoes, participantes_eventos=participantes_eventos)

if __name__ == '__main__':
    app.run(debug=True)