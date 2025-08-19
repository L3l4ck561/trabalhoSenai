//sensor de luz com som

int piezoPin = 8;
int ldrPin = 0;
int ldrValue = 0;


void setup()
{
//
}

void loop()
{
ldrValue = analogRead(ldrPin);
tone(piezoPin, 1000);
delay(25);
noTone(piezoPin);
delay(ldrValue);
}