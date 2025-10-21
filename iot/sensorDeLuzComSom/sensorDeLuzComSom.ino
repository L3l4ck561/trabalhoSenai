#include <WiFi.h>
#include <WebServer.h>

// 📶 Wi-Fi
const char* ssid = "SESI-IOT";
const char* password = "12341234";

// 🔌 GPIOs dos LEDs
const int ledVerde = 2;
const int ledAmarelo = 4;
const int ledVermelho = 5;

// 🌐 Servidor web
WebServer server(80);

// 🖥️ Página HTML estilizada
const char* htmlPage = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <title>Controle de LEDs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: Arial; text-align: center; background: #f0f0f0; margin-top: 50px; }
    h1 { color: #333; }
    .led-button {
      padding: 15px 30px;
      font-size: 18px;
      margin: 10px;
      border: none;
      border-radius: 8px;
      color: white;
      cursor: pointer;
    }
    .verde { background-color: #28a745; }
    .amarelo { background-color: #ffc107; color: black; }
    .vermelho { background-color: #dc3545; }
  </style>
</head>
<body>
  <h1>Controle de LEDs</h1>
  <div>
    <button class="led-button verde" onclick="fetch('/verde/on')">Ligar Verde</button>
    <button class="led-button verde" onclick="fetch('/verde/off')">Desligar Verde</button>
  </div>
  <div>
    <button class="led-button amarelo" onclick="fetch('/amarelo/on')">Ligar Amarelo</button>
    <button class="led-button amarelo" onclick="fetch('/amarelo/off')">Desligar Amarelo</button>
  </div>
  <div>
    <button class="led-button vermelho" onclick="fetch('/vermelho/on')">Ligar Vermelho</button>
    <button class="led-button vermelho" onclick="fetch('/vermelho/off')">Desligar Vermelho</button>
  </div>
</body>
</html>
)rawliteral";

// 🔧 Rotas
void handleRoot() {
  server.send(200, "text/html", htmlPage);
}

void handleLed(int pin, bool estado) {
  digitalWrite(pin, estado ? HIGH : LOW);
  server.send(200, "text/plain", estado ? "Ligado" : "Desligado");
}

void setup() {
  Serial.begin(115200);

  // 🧱 Configura os pinos
  pinMode(ledVerde, OUTPUT);
  pinMode(ledAmarelo, OUTPUT);
  pinMode(ledVermelho, OUTPUT);
  digitalWrite(ledVerde, LOW);
  digitalWrite(ledAmarelo, LOW);
  digitalWrite(ledVermelho, LOW);

  // 🌐 Conecta ao Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Conectado!");
  Serial.print("📱 IP: http://");
  Serial.println(WiFi.localIP());

  // 🚦 Rotas dos LEDs
  server.on("/", handleRoot);
  server.on("/verde/on", []() { handleLed(ledVerde, true); });
  server.on("/verde/off", []() { handleLed(ledVerde, false); });
  server.on("/amarelo/on", []() { handleLed(ledAmarelo, true); });
  server.on("/amarelo/off", []() { handleLed(ledAmarelo, false); });
  server.on("/vermelho/on", []() { handleLed(ledVermelho, true); });
  server.on("/vermelho/off", []() { handleLed(ledVermelho, false); });

  server.begin();
  Serial.println("🌐 Servidor iniciado");
}

void loop() {
  server.handleClient();
}