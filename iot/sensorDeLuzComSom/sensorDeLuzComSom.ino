// Inclui a biblioteca para controlar o LCD
#include <LiquidCrystal.h>;

// Inicializa a biblioteca com os pinos de interface do LCD
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

// Texto que será exibido e rolado na tela
const String mensagem = "Palmeiras nao tem mundial!";

// Variáveis de controle de tempo para a rolagem (usando millis() paranão travar)
unsigned long tempoAnteriorRolagem = 0;
const long intervaloRolagem = 300; // Intervalo de 300 milissegundosentre cada passo da rolagem

// Variável para controlar a posição da rolagem
int posicaoAtual = 0;

void setup() {
// Define o número de colunas e linhas do LCD
lcd.begin(16, 2);

// Exibe a mensagem fixa de boas-vindas na primeira linha (semrolagem)
lcd.setCursor(0, 0);
lcd.print(mensagem);
}

void loop() {
// --- Lógica da Rolagem do Texto na Linha Superior ---
// Checa se já passou o tempo para o próximo passo da rolagem
if (millis() - tempoAnteriorRolagem >= intervaloRolagem) {
tempoAnteriorRolagem = millis(); // Atualiza o tempo

// Move o texto um caractere para a esquerda
posicaoAtual++;

// Se a rolagem chegou ao fim, reinicia o texto para o início do looping
if (posicaoAtual > mensagem.length()) {
posicaoAtual = 0;
}

// Limpa a primeira linha e exibe a parte correta da mensagem
lcd.setCursor(0, 0);
lcd.print("        "); // Limpa a linha

lcd.setCursor(0, 0);
// Exibe o texto a partir da posição atual
lcd.print(mensagem.substring(posicaoAtual));
}

// --- Lógica do Contador de Tempo na Linha Inferior ---
lcd.setCursor(0, 1);
int segundos = millis() / 1000;

lcd.print("Tempo: ");
lcd.print(segundos);
lcd.print("s   "); // Espaços extras para garantir que a linha sejalimpa
}