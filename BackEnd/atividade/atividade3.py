import requests
import json

novo_todo = {
"userId":1,
"title": 'minha casa na arvores',
"completed": 'true'
}

response_post = requests.post(
'https://jsonplaceholder.typicode.com/todos',
json=novo_todo
)

print("\n novo post:\n",novo_todo)

if response_post.status_code == 201: # 201 significa criado com sucesso
    post_criado = response_post.json()
    print("Post criado com sucesso!")
    print(f"ID do novo post: {post_criado['id']}")
else:
    print(f"Erro ao criar post: {response_post.status_code}")