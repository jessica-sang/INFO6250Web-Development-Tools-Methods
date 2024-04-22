import { useState } from 'react'
import './App.css'
import Login from './Login.jsx';
import Game from './Game.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <div className="App">
    {isLoggedIn ? (
      <Game
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
      />
    ) : (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />
    )}
  </div>
  );
}

export default App
