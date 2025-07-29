import requests

#realiza um tratamento de erro
try:
    # Tentar fazer uma requisição GET
    response = requests.get('https://jsonplaceholder.typicode.com/posts/9999&#39;')
   
    # Verificar o status code
    if response.status_code == 200:
        # converte a resposta para um formato de dados Python, caso tenha encontrado (por ser = 200)
        data = response.json()
        print(f"Título: {data['title']}")
    elif response.status_code == 404:
        # Se não encontrar, imprime uma mensagem de erro
        print("Post não encontrado!")
    else:
        # Se não for 200 ou 404, imprime o status code pq deu bosta
        print(f"Erro inesperado: {response.status_code}")
       
# Se deu algum erro, imprime a mensagem de erro
# exceção na requisição caso não tenha encontrado os dados no requests
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")
# exceção na requisição caso não consiga definir o tipo de dado no requests
except ValueError as e:
    print(f"Erro ao decodificar JSON: {e}")
# exceção na requisição caso nem exista valor no requests
except KeyError as e:
    print(f"Chave não encontrada nos dados: {e}")