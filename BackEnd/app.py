from flask import Flask, request, jsonify

app = Flask(__name__)

#Banco de dados fictício para os exemplos
dados = {
    "id": 1,
    "nome": "Produto A",
    "preco": 100.00,
}

@app.route('/')
def home():
    return "Servidor Flask está funcionando!"

@app.route("/produto", methods=["GET"])
def obter_produto():
    return jsonify(dados)

@app.route("/produto", methods=["POST"])
def criar_produto():
    novo_produto = request.json #Captura
    #corpo da requisição
    return jsonify({"mensagem": "Produtocriado!", "produto": novo_produto}), 201
if __name__ == "__main__":
    app.run(debug=True)