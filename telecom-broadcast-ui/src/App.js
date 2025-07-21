import React, { useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('OFF');
  const [signalStrength, setSignalStrength] = useState(0);

  const toggleBroadcast = async () => {
    const res = await fetch('/api/toggle-broadcast', { method: 'POST' });
    const data = await res.json();
    setStatus(data.status);
  };

  const fetchStatus = async () => {
    const res = await fetch('/api/status');
    const data = await res.json();
    setStatus(data.status);
    setSignalStrength(data.signal_strength);
  };

  const sendLoRa = async () => {
    await fetch('/api/send-lora', { method: 'POST' });
  };

  return (
    <div className="App">
      <h1>Telecom Broadcast Control</h1>
      <button onClick={toggleBroadcast}>Toggle Broadcast</button>
      <button onClick={fetchStatus}>Get Status</button>
      <button onClick={sendLoRa}>Send LoRa Message</button>
      <p>Status: {status}</p>
      <p>Signal Strength: {signalStrength}</p>
    </div>
  );
}

export default App;