import requests
import json
# 1. Fazendo uma requisição GET para obter dados
response = requests.get('https://jsonplaceholder.typicode.com/posts/1/comments')
for email in response.json():
    print(email['email'])
