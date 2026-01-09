from flask import Flask, jsonify, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'S3rgi01sg@y'

num = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add():
    global num
    num += 1
    return jsonify({'num': num})  # Retorna o número atualizado em formato JSON

if __name__ == '__main__':
    app.run(debug=True)
