
isbn = "numr"
titulo ="numr"
autor = "numr"
editora = "numr"
ano = "numr"
genero = "numr"
edicao ="numr"


values = (isbn, titulo, autor, editora, ano, edicao, genero)
coll = "isbn, titulo, autor, editora, ano, edicao, genero"
SQL = f"INSERT INTO pessoa ({coll}) VALUES {values};"
print(SQL)