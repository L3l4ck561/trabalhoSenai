#Importa o conector do MySQL.
import mysql.connector

#*Função que faz a conexão com o banco de dados MySQL
def open_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Dev@561',
        database='orcafacil'
    )