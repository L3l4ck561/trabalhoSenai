import requests
import json
response = requests.get('https://viacep.com.br/ws/18605523/json/')
cep = response.json()
print(cep['logradouro'], cep['bairro'], cep['localidade'],cep['uf'])