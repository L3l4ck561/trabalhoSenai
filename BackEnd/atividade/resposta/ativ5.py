import requests

def buscar_cep(cep):
    #tratamento de erro (caso não executi o cep)
    try:
        url = f'https://viacep.com.br/ws/{cep}/json/' # cria a requisição
        response = requests.get(url) # executa a requisição e slava na variavel em formato python
       
       # confere se o codego do status é igual 200
        if response.status_code == 200:
            # converte a resposta para um formato de dados Python
            dados = response.json()
           #vê se foi encontrado a localização, se a resposta sair como erro: true não foi encontrado
            if 'erro' not in dados:
                #salva os dados num dicionario
                endereco_formatado = (
                    f"Endereço: {dados.get('logradouro', 'N/A')}, "
                    f"{dados.get('bairro', 'N/A')}, "
                    f"{dados.get('localidade', 'N/A')}-{dados.get('uf', 'N/A')}"
                )
                print(endereco_formatado)
               
                # Retorna os dados completos para possível uso posterior
                return dados
            else:
                print("CEP não encontrado!")
                return None
        else:
            print(f"Erro na API: {response.status_code}")
            return None
    # exceção na requisição caso não tenha encontrado os dados no requests
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        return None

# Exemplo de uso
dados_cep = buscar_cep('01001000')  # Praça da Sé, SP

# Exemplo com tratamento de CEP inválido
buscar_cep('00000000')