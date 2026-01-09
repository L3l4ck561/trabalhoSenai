from flask import Flask, render_template, request, redirect, url_for
import resources.database_connection as database_connection
cod = 0
app = Flask(__name__)
app.config['SECRET_KEY'] = 'S3rgi01sg@y'

@app.route('/', methods=['GET', 'POST'])
def home():
    if  request.method == 'POST':
        cliente = request.form['cliente']
        endereco = request.form['endereco']
        tell = request.form['tell']
        email = request.form['email']
        cpf = request.form['cpf']
        titulo = request.form['titulo']
    
        connection = database_connection.open_connection()
        cursor = connection.cursor()
        SQL = "INSERT INTO cabecalho (cliente,endereco,telefone,email,cpf_cnpj,nome_projeto) VALUES (%s, %s, %s, %s, %s, %s);"
        valores = (cliente,endereco,tell,email,cpf,titulo)
        cursor.execute(SQL,valores)
        connection.commit()
        cursor.close()
        connection.close()
        return redirect(url_for('home'))
    else:
        connection = database_connection.open_connection()
        cursor = connection.cursor()
        SQL = "SELECT * FROM cabecalho WHERE ativo = 1"
        cursor.execute(SQL)
        projetos = cursor.fetchall()
        cursor.close()
        connection.close()
        return render_template('index.html', projetos = projetos)

@app.route('/edit-cabecalho/<codigo>', methods=['POST','GET'])
def edit_cabecalho(codigo):
    if (request.method == 'POST'):
        cliente = request.form['cliente']
        endereco = request.form['endereco']
        tell = request.form['tell']
        email = request.form['email']
        cpf = request.form['cpf']
        titulo = request.form['titulo']

        connection = database_connection.open_connection()
        cursor = connection.cursor()
        SQL = "UPDATE cabecalho SET cliente = %s,endereco = %s,telefone = %s,email = %s,cpf_cnpj = %s,nome_projeto = %s WHERE codigo = %s"
        valores = (cliente,endereco,tell,email,cpf,titulo,codigo)
        cursor.execute(SQL, valores)
        connection.commit()
        cursor.close()
        connection.close()

        return redirect(url_for('ler_receita', projeto = codigo))
    else:
        connection = database_connection.open_connection()
        cursor = connection.cursor()
        SQL = "SELECT cliente,endereco,telefone,email,cpf_cnpj,nome_projeto FROM cabecalho WHERE codigo = %s;"
        cursor.execute(SQL, (codigo,))
        cabecalho = cursor.fetchone()
        print(cabecalho)
        cursor.close()
        connection.close()

    return render_template('editar_cabecalho.html', n_projeto = codigo, cabecalho = cabecalho)

@app.route('/del-projeto/<codigo>')
def del_projeto(codigo):
    connection = database_connection.open_connection()
    cursor = connection.cursor()
    SQL = "UPDATE cabecalho SET ativo = 0 WHERE codigo = %s;"
    cursor.execute(SQL, (codigo,))
    connection.commit()
    cursor.close()
    connection.close()
    return redirect(url_for('home'))

@app.route('/ler-receita/<projeto>')
def ler_receita(projeto,total = 0):
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    SQL = "SELECT * FROM pedido WHERE ativo = 1 AND n_orca = " + projeto
    cursor.execute(SQL)
    pedidos = cursor.fetchall()

    SQL = "SELECT * FROM cabecalho WHERE ativo = 1 AND codigo = " + projeto
    cursor.execute(SQL)
    orca = cursor.fetchall()

    cursor.close()
    connection.close()

    for pedido in pedidos:
        total += pedido[1] * pedido[4]

    return render_template('receita.html', pedidos = pedidos, total = total, cod = 0, orca = orca, n_projeto = projeto)

@app.route('/add-pedido/<n_projeto>', methods=['GET', 'POST'])
def add_pedido(n_projeto):
    if (request.method == 'POST'):
        quant = request.form['quant']
        unit = request.form['unit']
        desc = request.form['desc']
        unitario = request.form['unitario']

        connection = database_connection.open_connection()
        cursor = connection.cursor()

        SQL = "INSERT INTO pedido (quantidade,nome_produto,descricao,valor_quant,n_orca) VALUES (%s,%s, %s, %s, %s);"
        valores = (quant,unit,desc,unitario,n_projeto)
        cursor.execute(SQL,valores)
        connection.commit()
        cursor.close()
        connection.close()
        return redirect(url_for('ler_receita',projeto = n_projeto))
    else:
        return render_template('receita.html', cod = 0)

@app.route('/edit-pedido/<codigo>/<cod2>', methods=['GET','POST'])
def edit_pedido(codigo,cod2):
    if (request.method == 'POST'):
        quant = request.form['quant2']
        unit = request.form['unit2']
        desc = request.form['desc2']
        unitario = request.form['unitario2']

        connection = database_connection.open_connection()
        cursor = connection.cursor()
        SQL = "UPDATE pedido SET quantidade = %s, nome_produto = %s, descricao = %s, valor_quant = %s WHERE codigo = %s"
        valores = ( quant, unit, desc, unitario, codigo)
        cursor.execute(SQL, valores)
        connection.commit()
        cursor.close()
        connection.close()

        return redirect(url_for('ler_receita', projeto = cod2))
    else:
        connection = database_connection.open_connection()
        cursor = connection.cursor()
        SQL = "SELECT codigo,quantidade,nome_produto,descricao,valor_quant FROM pedido WHERE codigo = %s;"
        cursor.execute(SQL, (codigo,))
        pedido = cursor.fetchone()
        cursor.close()
        connection.close()

        return render_template('receita.html', pedido_edit=pedido, cod = 1, codigo = codigo, n_projeto = cod2)
    
@app.route('/delt-pedido/<codigo>/<n_projeto>')
def delet_pedido(codigo,n_projeto):
    connection = database_connection.open_connection()
    cursor = connection.cursor()
    SQL = "UPDATE pedido SET ativo = 0 WHERE codigo = %s;"
    cursor.execute(SQL, (codigo,))
    connection.commit()
    cursor.close()
    connection.close()
    return redirect(url_for('ler_receita', projeto = n_projeto))

if __name__ == '__main__':
    app.run(debug=True)