import requests

def criar_todo(user_id, title, completed):
    # salva osnovos dados num dicionario para depois mandar para a API
    novo_todo = {
        'userId': user_id,
        'title': title,
        'completed': completed
    }
    # manda o dicionario para a API
    response = requests.post(
        'https://jsonplaceholder.typicode.com/todos&#39;',
        json=novo_todo
    )
    # se der bão, imprime o id do novo todo
    if response.status_code == 201:
        return response.json()
    else:
        return None

# Testando a função
resultado = criar_todo(1, 'Estudar APIs Python', False)
# realiza um tratamento de erro
if resultado:
    print(f"Todo criado com sucesso! ID: {resultado['id']}")
else:
    print("Falha ao criar todo")
