void setup()
{
  pinMode(13, OUTPUT); // r
  pinMode(12, OUTPUT); // y
  pinMode(11, OUTPUT); // g

  pinMode(10, OUTPUT); // r
  pinMode(9, OUTPUT); // y
  pinMode(8, OUTPUT); // g

  pinMode(2, INPUT_PULLUP); //botão

  pinMode(7, OUTPUT); // g
  pinMode(6, OUTPUT); // r
}

void loop()
{
  digitalWrite(13, LOW);
  digitalWrite(12, LOW);
  digitalWrite(8, LOW);
  digitalWrite(9, LOW);

  digitalWrite(10, HIGH);
  digitalWrite(11, HIGH);
if (digitalRead(2) == LOW) {
  emergencia();
  return;
}
  delay(4500);
  digitalWrite(11, LOW);
  delay(200);

  digitalWrite(12, HIGH);
if (digitalRead(2) == LOW) {
  emergencia();
  return;
}
  delay(2000);
  digitalWrite(12, LOW);
  delay(200);

  digitalWrite(10, LOW);

  digitalWrite(13, HIGH);
  digitalWrite(8, HIGH);
if (digitalRead(2) == LOW) {
  emergencia();
  return;
}
  delay(5000);
  digitalWrite(8, LOW);
  delay(200);

  digitalWrite(9, HIGH);
if (digitalRead(2) == LOW) {
  emergencia();
  return;
}
  delay(2000);
  digitalWrite(9, LOW);
  delay(200);
}

void emergencia() {
  digitalWrite(13, HIGH); // S1 vermelho
  digitalWrite(12, LOW);
  digitalWrite(11, LOW);

  digitalWrite(10, HIGH); // S2 vermelho
  digitalWrite(9, LOW);
  digitalWrite(8, LOW);

  delay(5000); // ou esperar até o botão ser solto
}
