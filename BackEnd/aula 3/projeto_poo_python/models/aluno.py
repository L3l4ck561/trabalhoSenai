from .pessoa import Pessoa

class Aluno(Pessoa):
    def __init__(self, nome, idade, curso):
        super().__init__(nome, idade)
        self.curso = curso

    def __str__(self):
        return f"Aluno: {self.get_nome()}, {self.get_idade()} anos, Curso: {self.curso}"