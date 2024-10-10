import React, { useState, useEffect } from 'react';
import { api, setToken } from './api';
import PastryList from './PastryList';

function App() {
  const [pastries, setPastries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPastryName, setNewPastryName] = useState('');
  const [newPastryPrice, setNewPastryPrice] = useState('');

  useEffect(() => {
    fetchPastries();
  }, []);

  async function fetchPastries() {
    try {
      const fetchedPastries = await api('/api/pastries');
      setPastries(fetchedPastries);
    } catch (error) {
      console.error('Failed to fetch pastries:', error);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api('/api/login', 'POST', { username, password });
      setToken(response.token);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async function handleAddPastry(e) {
    e.preventDefault();
    try {
      await api('/api/pastries', 'POST', { name: newPastryName, price: parseFloat(newPastryPrice) });
      setNewPastryName('');
      setNewPastryPrice('');
      fetchPastries();
    } catch (error) {
      console.error('Failed to add pastry:', error);
    }
  }

  return (
    <div>
      <h1>Bakery App</h1>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleAddPastry}>
          <input
            type="text"
            value={newPastryName}
            onChange={(e) => setNewPastryName(e.target.value)}
            placeholder="Pastry Name"
          />
          <input
            type="number"
            value={newPastryPrice}
            onChange={(e) => setNewPastryPrice(e.target.value)}
            placeholder="Price"
          />
          <button type="submit">Add Pastry</button>
        </form>
      )}
      <PastryList pastries={pastries} />
    </div>
  );
}

export default App;