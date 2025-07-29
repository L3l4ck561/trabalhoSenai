from flask import Flask, jsonify, request
app = Flask(__name__)

#Rota Get
@app.route('/', methods=['GET'])
def home():
    return jsonify({"mensagem": "Bem vindo à API com Flask!"})

#Rota POST
@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    return jsonify({"Recebido":data}), 201

if __name__ == '__main__':
    app.run(debug=True)