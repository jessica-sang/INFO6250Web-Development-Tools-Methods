import React, { useState, useEffect } from 'react';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchGetMessages,
  fetchPostMessage,
} from './services';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import { login, logout, setError, refreshChat } from './state';

function App() {
  const [state, setState] = useState({
    loginStatus: false,
    username: '',
    users: {},
    messages: [],
    error: ''
  });

  useEffect(() => {
    fetchSession()
      .then(response => {
        fetchGetMessages()
          .then(messages => {
            login(messages, setState);
          })
      })
      .catch(error => {
        logout(setState);
      });

    const intervalId = setInterval(() => refreshChat(setState), 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = username => {
    fetchLogin(username)
      .then(() => fetchGetMessages())
      .then(messages => login(messages, setState))
      .catch(error => setError(error.error, setState));
  };

  const handleLogout = () => {
    fetchLogout()
      .then(() => logout(setState))
      .catch(error => setError(error.error, setState));
  };

  const handleSubmitMessage = message => {
    fetchPostMessage(message)
      .then(() => fetchGetMessages())
      .then(messages => login(messages, setState))
      .catch(error => setError(error.error, setState));
  };

  return (
    <div id="app">
      {state.error && <div className="error">{state.error}</div>}
      {state.loginStatus ? (
        <Chat state={state} onLogout={handleLogout} onSubmitMessage={handleSubmitMessage} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
