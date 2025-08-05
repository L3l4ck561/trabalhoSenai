// C++ code
//
void setup()
{
  pinMode(13, OUTPUT); //r
  pinMode(12, OUTPUT); //y
  pinMode(11, OUTPUT); //g

  pinMode(10, OUTPUT); //r
  pinMode(9, OUTPUT); //y
  pinMode(8, OUTPUT); //g
}

void loop()
{
  digitalWrite(13, LOW);
  digitalWrite(12, LOW);
  digitalWrite(8, LOW);
  digitalWrite(9, LOW);

  digitalWrite(10, HIGH);
  digitalWrite(11, HIGH);
  delay(4500);
  digitalWrite(11, LOW);
  delay(500);

  digitalWrite(12, HIGH);
  delay(2000);
  digitalWrite(12, LOW);
  delay(500);

  digitalWrite(10, LOW);

  digitalWrite(8, HIGH);
  digitalWrite(13, HIGH);
  delay(5000);
  digitalWrite(13, LOW);
  delay(500);

  digitalWrite(9, HIGH);
  delay(2000);
  digitalWrite(9, LOW);
  delay(500);
}
