from flask import FastAPI,jsonify
from pydantic import BaseModel

app = FastAPI()

#Modelo de dados
class Item(BaseModel):
    title: str
    price: float

#Rota GET
@app.get("/api")
def read_root():
    return {"message": "Bem vindo à API com FastAPI"}

#Rot POST
@app.post("/api/data")
def create_item(item: Item):
    return {"recebido": item}

#Executar:uvicorn nome_do_arquivo:app --reload

#Segundo exemplo: URL Semântico
#Get / users => Retorna todos os usuários
#Get / users/ {id} => Retorna um usuário especifico

#Flask:

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return jsonify({"user_id": user_id})

#FastAPI
@app.get("/user/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}