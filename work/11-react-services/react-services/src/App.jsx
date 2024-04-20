import { useEffect, useState } from 'react';
import './App.css';
import User from './Users.jsx';
import Login from './Login.jsx';
import Loading from './Loading.jsx';
import { fetchSession } from './services.js';

function App() {
  const [loading, setLoading] = useState(false);

  const [userState, setUserState] = useState({
    username: '',
    isLoggedIn: false,
    error: ''
  })

  useEffect(
    () => {
      fetchSession()
      .then( response => {
        // use session data to set state
        setUserState({
          username: response.username,
          isLoggedIn: true,
          error: ''
        })
      })
      .catch( err => {
        // use error data to set state
        if (err.error == 'auth-missing') {
          setUserState({
            username: '',
            isLoggedIn: false,
            error: ''
          });

          return;
        }
      });
    }, []
  );

  function onLogin(username) {
    setUserState({
      username,
      isLoggedIn: true,
      error: ''
    })
  }

  function onLogout() {
    setUserState({
      username: '',
      isLoggedIn: false,
      error: ''
    })
  }

  return (
    <div className="App">
      <h1>Word Store Game</h1>
      <div className='display-panel'>
        {
          userState.isLoggedIn ? 
            <User 
              setLoading={setLoading}
              user={userState.username}
              setUserState={setUserState}
              onLogout={onLogout}
            /> : <Login
              setLoading={setLoading}
              setUserState={setUserState}
              onLogin={onLogin}
            />
        }
      </div>
      <div className='error'>
        {userState.error}
      </div>
      <div className='loading'>
        {loading ? <Loading /> : ''}
      </div>
    </div>
  );
}

export default App;
