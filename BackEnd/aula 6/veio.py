def menu():
    continuar = 1
    while continuar:
        try:
            continuar = int(input("0. Sair \n" + "1. Jogar novamente\n"))                                
            if continuar == 1:
                game()
            elif continuar == 0:
                print("Saindo...")
            else:
                print("Opção inválida! Digite 0 ou 1.")
        except ValueError:
            print("Entrada inválida! Digite um número.")

def game():
    jogada = 0 #contabiliza o numero de jogadas para definir qual é o jogador
    global board
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]  # Inicializa o tabuleiro
    while ganhou() == 0: #verifica se o jogador ganhou
        print("\nJogador ", jogada % 2 + 1) 
        exibe()
        try:
            linha = int(input("\nLinha (1, 2, 3): "))
            coluna = int(input("Coluna (1, 2, 3): "))
            if linha < 1 or linha > 3 or coluna < 1 or coluna > 3:
                print("Linha ou coluna fora do intervalo permitido! Digite valores entre 1 e 3.")
                continue
            if board[linha - 1][coluna - 1] == 0:
                if (jogada % 2 + 1) == 1:
                    board[linha - 1][coluna - 1] = 1
                else:
                    board[linha - 1][coluna - 1] = -1
            else:
                print("Posição já ocupada! Escolha outra.")
                jogada -= 1
            if ganhou():
                print("Jogador ", jogada % 2 + 1, " ganhou após ", jogada + 1, " rodadas")
                exibe()
                return
            jogada += 1
            if jogada == 9: # na 9º jogada não ouver ganhador o jogo para e retorna a msg: empate
                print("Empate!")
                exibe() #chama a função q mostra o jogo visual
                return #para o laço de repetição
        except ValueError: # trata o erro caso a pessoa insere um valor que o código não consegue definir como int
            print("Entrada inválida! Digite números inteiros.") # avisa sobre o erro
        except KeyboardInterrupt: #caso reinicie o código ou finalize aparece um alerta sobre
            print("\nJogo interrompido pelo usuário.")
            return

def ganhou(): #verifica tipo o caso da vitória
    # Checando linhas
    for i in range(3):  # analisa cada linha para definir a vitória de acordo com as condições
        soma = board[i][0] + board[i][1] + board[i][2] #soma os valores do vetor da matris
        if soma == 3 or soma == -3: # se o resultado for 3 ou -3 retorna 1 para definir vitória na condiçional da função game() e parar o laço de repetição, finalizando e retornando msg: vitória
            return 1
    # Checando colunas
    for i in range(3): # analisa cad coluna para definir a vitória de acordo com as condições
        soma = board[0][i] + board[1][i] + board[2][i] # soma os valores de cada linha de acordo com o indice do vetor da matris
        if soma == 3 or soma == -3: # se o resultado for 3 ou -3 retorna 1 para definir vitória na condiçional da função game() e parar o laço de repetição, finalizando e retornando msg: vitória
            return 1
    # Checando diagonais
    # analisa cada diagonai para definir a vitória de acordo com as condições
    diagonal1 = board[0][0] + board[1][1] + board[2][2] # soma uma diagonal puxando a ponta de sima e a ultima ponta, ou, o 1º indice do primeiro vetor e o ultimo indice do 3 vetor, e puxa o 2º do segundo vetor e soma
    diagonal2 = board[0][2] + board[1][1] + board[2][0] # soma uma diagonal puxando a ponta de sima e a ultima ponta, ou, o 3º indice do primeiro vetor e o primeiro indice do 3 vetor, e puxa o 2º do segundo vetor e soma
    if diagonal1 == 3 or diagonal1 == -3 or diagonal2 == 3 or diagonal2 == -3:  # se o resultado for 3 ou -3 nas duas diagonais retorna 1 para definir vitória na condiçional da função game() e parar o laço de repetição, finalizando e retornando msg: vitória
        return 1
    return 0

def exibe(): # Monta a tabela do jogo
    for i in range(3): # separa as 3 linhas
        for j in range(3): # para cada linha uma coluna
            if board[i][j] == 0: # lê a posição que resebe a jogada
                print(" _ ", end=' ') # para caso não tenha recebido uma jogada
            elif board[i][j] == 1:  # marca a posição de acordo com X,Y
                print(" X ", end=' ') # senão verifica se foi X que marcou
            elif board[i][j] == -1: # marca a posição de acordo com X,Y
                print(" O ", end=' ') # senão verifica se foi X que marcou
        print()

# Inicia o jogo
menu()