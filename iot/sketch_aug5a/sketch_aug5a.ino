/*
  Controle de Semáforo com Botão de Pedestre - Versão Corrigida
  
  Este código controla um sistema de semáforo de duas vias
  com um semáforo para pedestres. Quando o botão de pedestre é
  pressionado, o ciclo atual do semáforo de veículos é completado
  com segurança (verde -> amarelo -> vermelho) antes de ceder a vez
  ao pedestre.
*/

// Definição dos pinos
#define VERMELHO_PRINCIPAL 13
#define AMARELO_PRINCIPAL 12
#define VERDE_PRINCIPAL 11

#define VERMELHO_SECUNDARIO 10
#define AMARELO_SECUNDARIO 9
#define VERDE_SECUNDARIO 8

#define VERMELHO_PEDESTRE 6
#define VERDE_PEDESTRE 7

#define BOTAO_PEDESTRE 2

// Constantes de tempo (em milissegundos)
const int TEMPO_VERDE_PRINCIPAL = 10000;  // 10 segundos
const int TEMPO_AMARELO_PRINCIPAL = 3000;   // 3 segundos
const int TEMPO_VERDE_SECUNDARIO = 7000;   // 7 segundos
const int TEMPO_AMARELO_SECUNDARIO = 3000;  // 3 segundos
const int TEMPO_PEDESTRE = 5000;          // 5 segundos
const int TEMPO_MINIMO_VERDE = 3000;      // Tempo mínimo para uma via ficar verde antes de ceder (3s)

// Variável para controlar o estado do botão
volatile bool botao_pressionado = false;

// Função de interrupção para o botão de pedestre
void interrupcao_botao() {
  if (digitalRead(BOTAO_PEDESTRE) == LOW) {
    // Adiciona um pequeno "debounce" para evitar múltiplos disparos
    delay(50);
    if (digitalRead(BOTAO_PEDESTRE) == LOW) {
      botao_pressionado = true;
    }
  }
}

void setup() {
  // Configura os pinos como saída
  pinMode(VERMELHO_PRINCIPAL, OUTPUT);
  pinMode(AMARELO_PRINCIPAL, OUTPUT);
  pinMode(VERDE_PRINCIPAL, OUTPUT);

  pinMode(VERMELHO_SECUNDARIO, OUTPUT);
  pinMode(AMARELO_SECUNDARIO, OUTPUT);
  pinMode(VERDE_SECUNDARIO, OUTPUT);

  pinMode(VERMELHO_PEDESTRE, OUTPUT);
  pinMode(VERDE_PEDESTRE, OUTPUT);

  // Configura o pino do botão como entrada e com resistor de pull-up interno
  pinMode(BOTAO_PEDESTRE, INPUT_PULLUP);

  // Anexa a interrupção ao pino do botão
  attachInterrupt(digitalPinToInterrupt(BOTAO_PEDESTRE), interrupcao_botao, FALLING);

  // Estado inicial do semáforo
  digitalWrite(VERMELHO_PRINCIPAL, HIGH);
  digitalWrite(VERDE_SECUNDARIO, HIGH);
  digitalWrite(VERMELHO_PEDESTRE, HIGH);
}

void loop() {
  // Ciclo automático do semáforo
  passoPrincipal();
  
  // Verifica se o botão foi pressionado após o ciclo da via principal
  if (botao_pressionado) {
    gerenciarPedestre();
  }
  
  passoSecundario();
  
  // Verifica se o botão foi pressionado após o ciclo da via secundária
  if (botao_pressionado) {
    gerenciarPedestre();
  }
}

void passoPrincipal() {
  // 1. Verde para a via principal, vermelho para a secundária e pedestres
  digitalWrite(VERMELHO_PRINCIPAL, LOW);
  digitalWrite(VERDE_PRINCIPAL, HIGH);
  digitalWrite(VERMELHO_SECUNDARIO, HIGH);
  digitalWrite(VERDE_SECUNDARIO, LOW);
  digitalWrite(VERMELHO_PEDESTRE, HIGH);
  digitalWrite(VERDE_PEDESTRE, LOW);

  long tempoInicio = millis();
  while (millis() - tempoInicio < TEMPO_VERDE_PRINCIPAL) {
    // Apenas verifica se o botão foi pressionado, mas não interrompe imediatamente
  }

  // 2. Amarelo para a via principal
  digitalWrite(VERDE_PRINCIPAL, LOW);
  digitalWrite(AMARELO_PRINCIPAL, HIGH);
  delay(TEMPO_AMARELO_PRINCIPAL);

  // 3. Vermelho para a via principal
  digitalWrite(AMARELO_PRINCIPAL, LOW);
  digitalWrite(VERMELHO_PRINCIPAL, HIGH);
  delay(1000); // Pequena pausa para segurança
}

void passoSecundario() {
  // 1. Verde para a via secundária, vermelho para a principal e pedestres
  digitalWrite(VERMELHO_PRINCIPAL, HIGH);
  digitalWrite(VERDE_PRINCIPAL, LOW);
  digitalWrite(VERMELHO_SECUNDARIO, LOW);
  digitalWrite(VERDE_SECUNDARIO, HIGH);
  digitalWrite(VERMELHO_PEDESTRE, HIGH);
  digitalWrite(VERDE_PEDESTRE, LOW);

  long tempoInicio = millis();
  while (millis() - tempoInicio < TEMPO_VERDE_SECUNDARIO) {
    // Apenas verifica se o botão foi pressionado, mas não interrompe imediatamente
  }

  // 2. Amarelo para a via secundária
  digitalWrite(VERDE_SECUNDARIO, LOW);
  digitalWrite(AMARELO_SECUNDARIO, HIGH);
  delay(TEMPO_AMARELO_SECUNDARIO);

  // 3. Vermelho para a via secundária
  digitalWrite(AMARELO_SECUNDARIO, LOW);
  digitalWrite(VERMELHO_SECUNDARIO, HIGH);
  delay(1000); // Pequena pausa para segurança
}

void gerenciarPedestre() {
  // Garante que ambas as vias estejam com o sinal vermelho
  // e desliga os outros sinais de tráfego.
  digitalWrite(VERDE_PRINCIPAL, LOW);
  digitalWrite(AMARELO_PRINCIPAL, LOW);
  digitalWrite(VERMELHO_PRINCIPAL, HIGH);
  
  digitalWrite(VERDE_SECUNDARIO, LOW);
  digitalWrite(AMARELO_SECUNDARIO, LOW);
  digitalWrite(VERMELHO_SECUNDARIO, HIGH);
  
  // Acende o sinal verde para o pedestre
  digitalWrite(VERMELHO_PEDESTRE, LOW);
  digitalWrite(VERDE_PEDESTRE, HIGH);

  delay(TEMPO_PEDESTRE);

  // Sinal de pedestre piscando para avisar que o tempo está acabando
  for (int i = 0; i < 5; i++) {
    digitalWrite(VERDE_PEDESTRE, LOW);
    delay(250);
    digitalWrite(VERDE_PEDESTRE, HIGH);
    delay(250);
  }

  // Finaliza a travessia dos pedestres
  digitalWrite(VERDE_PEDESTRE, LOW);
  digitalWrite(VERMELHO_PEDESTRE, HIGH);
  
  // Reinicia a variável de controle do botão para o próximo ciclo
  botao_pressionado = false;
}