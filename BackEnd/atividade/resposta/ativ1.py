import requests

# Buscar comentários de um post específico
response = requests.get('https://jsonplaceholder.typicode.com/posts/1/comments&#39;')

# confere se o codego do status é igual 200
if response.status_code == 200:
    # converte a resposta para um formato de dados Python
    comentarios = response.json()
    print("Emails dos usuários que comentaram:")
    # loop para cada email
    for comentario in comentarios:
        print(comentario['email'])
else:
    # se o código do status não for 200, exibe a mensagem de erro
    print(f"Erro ao buscar comentários: {response.status_code}")