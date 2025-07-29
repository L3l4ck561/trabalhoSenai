from .pessoa import Pessoa

class Professor(Pessoa):
    def __init__(self, nome, idade, disciplina):
        super().__init__(nome, idade)
        self.disciplina = disciplina

    def __str__(self):
        return f"Professor: {self.get_nome()}, {self.get_idade()} anos, Disciplina: {self.disciplina}"