import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username);
  };

  return (
    <div className="login">
      <h2>Please login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="login-input"
          placeholder="Enter Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit" className="login-button">Log in</button>
      </form>
    </div>
  );
}

export default Login;
