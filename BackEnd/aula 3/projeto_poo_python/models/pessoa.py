class Pessoa:
    def __init__(self, nome, idade):
        self._nome = nome  # Atributo protegido
        self._idade = idade  # Atributo protegido

    def __str__(self):
        return f"{self._nome}, {self._idade} anos"

    def get_nome(self):
        return self._nome

    def get_idade(self):
        return self._idade