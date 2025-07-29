from database import criar_tabelas
from models.aluno import Aluno
from models.professor import Professor
from controllers.sistema import Sistema

# Criando tabelas
criar_tabelas()

# Inicializando o sistema
sistema = Sistema()

# Criando objetos
aluno1 = Aluno("Carlos", 20, "Desenvolvimento de Sistemas")
professor1 = Professor("Ana", 40, "Programação")

# Adicionando ao banco de dados
sistema.adicionar_pessoa(aluno1, "Aluno")
sistema.adicionar_pessoa(professor1, "Professor")

# Listando do banco
pessoas = sistema.listar_pessoas()

# Exibindo resultados
print("Pessoas cadastradas:")
for pessoa in pessoas:
    print(pessoa)