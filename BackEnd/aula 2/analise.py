#Teoria sobre análise de dados com python
#Esta é uma habilidade que permite extrair informações 
#valiosas a partir de grandes quantidades de dados. 
#Em python, utilizamos bibliotecas especializadas 
#para facilitar este processo.  

#O que são bibliotecas?
#São coleções de módulos e funções pré-escritas que 
#facilitam o desenvolvimento do software. Em análise de 
# dados, algumas das mais utilizadas são:

#Pandas: Usada para manipulação e análise de dados, 
# permite criar tabelas (DataFrames), realizar filtros
#e cálculos estatísticos.  

#Matplotlib: Biblioteca para criação de gráficos e 
# visualizações.  

#NumPy: Auxilia no trabalho com arrays e operações 
#matemáticas avançadas.  

#O que é um DataFrame?
#Um DataFrame é uma estrutura de dados 
# bidimensional (tabela), semelhante a uma planilha do Excel
#ou uma tabela SQL, onde podemos armazenar e manipular
#informações de forma eficiente.  

#Requisitos
#Ter o Python instalado (versão recomendada: 
# 3.7 ou superior)
#Instalar as bibliotecas necessárias:

#pip install pandas matplotlib  

#Criando um DataFrame
import pandas as pd  

dados = {
         'Nome': ['Ana', 'Bruno', 'Carlos', 'Sansa', 'Vitin'],
         'Idade': [23, 35, 42, 29, 36],
         'Salario': [3500, 5000, 7000, 4200, 6200],
         'Departamento': ['RH', 'TI', 'TI', 'MKT', 'FINANCEIRO']
}

#Criando o DataFrame
df = pd.DataFrame(dados)

print ("###DataFrame Criado!!###")
print(df)  

#Filtrando os dados
ti = df[df['Departamento']== 'TI']
print("\n### Funcionários de TI ###")
print(ti)  

#Estatísticas Básicas
#Podemos calcular a média salarial dos funcionários.  
media_salario = df['Salario'].mean()
print("\nMédia Salarial: R$ ", round(media_salario, 2))  

#Adicionando uma nova Coluna
#Vamos calcular um ajuste salarial de 10% e adicionar ao DF
df['Novo_Salario'] = df['Salario']*1.1
print("\n###DataFrame com Ajuste Salarial!###")
print(df)

#Gráfico de Barras
#Vamos visualizar os salários com a biblioteca Matplotlib.  
import matplotlib.pyplot as plt   

plt.figure(figsize=(8,5))
plt.bar(df['Nome'], df['Salario'], color='blue', label='Salario Atual')
plt.bar(df['Nome'], df['Novo_Salario'], color='green', alpha=0.5, label='Novo_Salario')
plt.xlabel('Funcionarios') 
plt.ylabel('Salario')  
plt.title('Salários Antes e Depois do Aumento')
plt.legend()
plt.show()