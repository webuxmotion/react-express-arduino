#include <ArduinoJson.h>

int lightPin = 2;

unsigned long previousMillis = 0; 
const long interval = 300;
bool ledOn = false;

int percent = 0;
int prevPercent = 0;

DynamicJsonDocument doc(1024);

void setup() {
  pinMode(13, OUTPUT);
  pinMode(lightPin, OUTPUT);
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
  ledOn = digitalRead(lightPin);
}

void loop() {
  if (Serial.available() > 0) {
    char ReaderFromNode; // Store current character
    ReaderFromNode = (char) Serial.read();
    convertToState(ReaderFromNode); // Convert character to state  
  }
  

  unsigned long currentMillis = millis();
  
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    processPotentiometer();

    bool newValue = digitalRead(lightPin);

    if (newValue != ledOn) {
      
      //JsonObject obj = doc.as<JsonObject>();
      doc["sensor"] = newValue;
      
      ledOn = newValue;
    }

    if (percent < 30) {
     
      digitalWrite(LED_BUILTIN, LOW);
      digitalWrite(lightPin,LOW);
      doc["sensor"] = LOW;
      ledOn = LOW;
    }

    String output;
    serializeJson(doc, output);
    Serial.println(output);
  }
}

void processPotentiometer() {
  
  percent = round(analogRead(0) / 1024.00 * 100);
  
  if(percent != prevPercent) {
    prevPercent = percent;
    doc["potentiometr"] = percent;
    
    delay(10);
  }
  
  delay(10);
}

void convertToState(char chr) {
  if(chr=='w'){
    digitalWrite(LED_BUILTIN, HIGH);
    digitalWrite(lightPin,HIGH);
  }
  if(chr=='t'){
    digitalWrite(LED_BUILTIN, LOW);
    digitalWrite(lightPin,LOW);
  }
}