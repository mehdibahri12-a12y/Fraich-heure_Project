import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Test API call
    axios.get('http://localhost:5000/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Organic Store</h1>
        <p>Backend says: {message || 'Loading...'}</p>
      </header>
    </div>
  );
}

export default App;