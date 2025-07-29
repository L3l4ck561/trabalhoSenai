import pandas as pd

# Crie um dicionário chamado vendas contendo:
vendas = {
'Produto': ["Notebook", "Mouse", "Teclado", "Monitor", "Impressora"],
'Quantidade': [10, 50, 30, 15, 8],
'Preco': [3500, 150, 200, 1200, 800]
}

# Depois, transforme esse dicionário em um do Pandas e imprima o resultado.
dado = pd.DataFrame(vendas)
print(dado)

# Filtre apenas os dados do produto "Notebook" e exiba na tela.
nt = dado[dado['Produto']== 'Notebook']
print("\n",nt)

# Calcule a média de todos os produtos e exiba na tela.
media = dado['Preco'].mean()
print("\nMédia dos preços: R$ ", round(media, 2))

# Crie uma nova coluna chamada Novo_Preco, aumentando o preço de cada produto em 15% .
dado['Novo_Preco'] = dado['Preco']*1.1
print(dado)

# Utilize o Matplotlib para criar um gráfico de barras  comparando os preços antigos e novos.
import matplotlib.pyplot as plt   

plt.figure(figsize=(8,5))
plt.bar(dado['Produto'], dado['Preco'], color='blue', label='Preco Atual')
plt.bar(dado['Produto'], dado['Novo_Preco'], color='green', alpha=0.5, label='Novo_Preco')
plt.xlabel('Produto') 
plt.ylabel('Preco')  
plt.title('Preco Antes e Depois do Aumento')
plt.legend()
plt.show()