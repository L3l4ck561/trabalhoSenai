import requests

# Buscar todos os usuários
response = requests.get('https://jsonplaceholder.typicode.com/users&#39;)')

# confere se o codego do status é igual 200
if response.status_code == 200:
    # converte a resposta para um formato de dados Python
    usuarios = response.json()
    print("Usuários que moram em Gwenborough:")
    # percorre a lista de usuários
    for usuario in usuarios:
        # verifica se o endereço do usuário é Gwenborough
        if usuario['address']['city'] == 'Gwenborough':
            print(f"ID: {usuario['id']}, Nome: {usuario['name']}")
else:
    # se o código do status não for 200, exibe a mensagem de erro
    print(f"Erro ao buscar usuários: {response.status_code}")