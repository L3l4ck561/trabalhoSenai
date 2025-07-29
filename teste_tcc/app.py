from flask import Flask,render_template,request,redirect,url_for
import resources.database_connection as database_connection

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Dev@561'

def conectDB(SQL,num):
    connection = database_connection.open_connection()
    cursor = connection.cursor()
    cursor.execute(SQL)
    match num:
        case 1:
            connection.commit()
        case 2:
            return cursor.fetchall()
    cursor.close()
    connection.close()


@app.route('/')
def inicio ():

    return render_template('index.html')

#cria
@app.route('/criar', methods=['POST','GET'])
def cadastrar_livro ():
    if (request.method == 'POST'):
        nome = request.form['nome']
        idade = request.form['idade']

        values = (nome, idade)
        SQL = f"INSERT INTO pessoa (nome, idade) VALUES {values};"
        conectDB(SQL, 1)
        return 'ok'

#lê
@app.route('/listar')
def listar():
    # SQL = "SELECT nome, idade cadastros FROM pessoa;"
    # resultado = conectDB(SQL, 2)
    return render_template("listarUsuarios.html")

# Executa o website. 
if __name__ == '__main__':
    app.run(debug=True)