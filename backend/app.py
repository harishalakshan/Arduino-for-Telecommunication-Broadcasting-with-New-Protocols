from flask import Flask, jsonify, request
import serial

app = Flask(__name__)

arduino = serial.Serial('/dev/ttyUSB0', 9600)

@app.route('/api/status', methods=['GET'])
def get_status():
    arduino.write(b'STATUS\n')
    response = arduino.readline().decode('utf-8').strip()
    status, signal = response.split(',')
    return jsonify({'status': status, 'signal_strength': int(signal)})

@app.route('/api/toggle-broadcast', methods=['POST'])
def toggle_broadcast():
    arduino.write(b'TOGGLE\n')
    response = arduino.readline().decode('utf-8').strip()
    return jsonify({'status': response})

@app.route('/api/send-lora', methods=['POST'])
def send_lora():
    # Simulated LoRa broadcast logic
    return jsonify({'message': 'LoRa broadcast sent'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)