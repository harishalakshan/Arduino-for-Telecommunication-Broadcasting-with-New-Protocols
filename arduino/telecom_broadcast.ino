#include <SoftwareSerial.h>
SoftwareSerial mySerial(10, 11); // RX, TX

int broadcastPin = 7;
bool broadcasting = false;

void setup() {
  pinMode(broadcastPin, OUTPUT);
  mySerial.begin(9600);
  digitalWrite(broadcastPin, LOW);
}

void loop() {
  if (mySerial.available()) {
    String cmd = mySerial.readStringUntil('\n');
    if (cmd == "TOGGLE") {
      broadcasting = !broadcasting;
      digitalWrite(broadcastPin, broadcasting ? HIGH : LOW);
      mySerial.println(broadcasting ? "ON" : "OFF");
    } else if (cmd == "STATUS") {
      int signal = analogRead(A0);
      mySerial.println(String(broadcasting ? "ON" : "OFF") + "," + signal);
    }
  }
}