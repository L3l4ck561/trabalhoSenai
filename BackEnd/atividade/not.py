import requests
import json
# 1. Fazendo uma requisição GET para obter dados
response = requests.get('https://jsonplaceholder.typicode.com/posts/1')
# 2. Verificando o status da resposta
print(f"Status code: {response.status_code}") # 200 significa sucesso
# 3. Convertendo a resposta para JSON
data = response.json()
# 4. Exibindo os dados
print("Dados do post:")
print(f"ID: {data['id']}")
print(f"Título: {data['title']}")
print(f"Corpo: {data['body']}\n")
# 5. Fazendo uma requisição POST para criar um novo post
novo_post = {
'title': 'Meu novo post',
'body': 'Conteúdo do meu post',
'userId': 1
}

response_post = requests.post(
'https://jsonplaceholder.typicode.com/posts',
json=novo_post
)
# 6. Verificando a resposta do POST
if response_post.status_code == 201: # 201 significa criado com sucesso
    post_criado = response_post.json()
    print("Post criado com sucesso!")
    print(f"ID do novo post: {post_criado['id']}")
else:
    print(f"Erro ao criar post: {response_post.status_code}")

