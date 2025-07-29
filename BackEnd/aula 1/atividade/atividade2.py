#GET/usuarios
#GET/usuarios/<id>
#POST/usuarios
#PUT/usuarios/<id>
#PATCH/usuarios/<id>
#DELETE/usuarios/<id>

from flask import Flask, request, jsonify

app = Flask(__name__)

usuarios = [
     {"id": 1, "nome": "Flavio", "idade": 30},
     {"id": 2, "nome": "Maria", "idade": 25}
]

@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
     return jsonify(usuarios)

@app.route("/usuarios/<int:id>", methods=["GET"])
def obter_usuario(id):
     usuario = next((u for u in usuarios if u["id"]== id), None) 
     return jsonify(usuario) if usuario else ("Usuário não encontrado", 404)

@app.route("/usuarios", methods=["POST"])
def criar_usuario():
     novo_usuario = request.json
     novo_usuario["id"] = len(usuarios) + 1
     usuarios.append(novo_usuario)
     return jsonify(novo_usuario), 201

@app.route("/usuarios/<int:id>", methods=["PUT"])
def atualizar_usuario(id):
     usuario = next((u for u in usuarios if u["id"]== id),None) 
     if usuario:
          usuario.update(request.json)
          return jsonify(usuario)
     return ("Usuário não encontrado", 404)

@app.route("/usuarios/<int:id>", methods=["PATCH"]) 
def modificar_usuario(id):
     usuario = next((u for u in usuarios if u["id"]== id),None) 
     if usuario:
          usuario.update(request.json)
          return jsonify(usuario)
     return ("Usuário não encontrado", 404)

@app.route("/usuarios/<int:id>", methods=["DELETE"])
def remover_usuario(id):
     global usuarios
     usuarios = [u for u in usuarios if u["id"]!= id]
     return ("Usuário removido", 204)

if __name__ == "__main__":
     app.run(debug=True)

                                                   

