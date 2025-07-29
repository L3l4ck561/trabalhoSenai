import sqlite3

def conectar():
    """ Conecta ao banco de dados SQLite """
    return sqlite3.connect("escola.db")

def criar_tabelas():
    """ Cria as tabelas necessárias no banco de dados """
    conexao = conectar()
    cursor = conexao.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pessoas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            idade INTEGER NOT NULL,
            tipo TEXT NOT NULL
        )
    ''')
    
    conexao.commit()
    conexao.close()