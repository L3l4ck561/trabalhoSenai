import requests
import json
# 1. Fazendo uma requisição GET para obter dados
response = requests.get('https://jsonplaceholder.typicode.com/posts/1/users')
for address in response.json():
    if address['address']['city'] == 'Gwenborough':
        print(address['address']['city'], address['name'])
