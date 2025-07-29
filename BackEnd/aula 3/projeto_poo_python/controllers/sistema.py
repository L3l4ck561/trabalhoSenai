import sqlite3
from database import conectar
from models.aluno import Aluno
from models.professor import Professor

class Sistema:
    def __init__(self):
        self.conexao = conectar()

    def adicionar_pessoa(self, pessoa, tipo):
        cursor = self.conexao.cursor()
        cursor.execute("INSERT INTO pessoas (nome, idade, tipo) VALUES (?, ?, ?)", 
                       (pessoa.get_nome(), pessoa.get_idade(), tipo))
        self.conexao.commit()

    def listar_pessoas(self):
        cursor = self.conexao.cursor()
        cursor.execute("SELECT * FROM pessoas")
        return cursor.fetchall()