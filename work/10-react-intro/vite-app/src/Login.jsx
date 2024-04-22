import { useState } from 'react';

function LoginPage({ setIsLoggedIn, setUsername }) {
    const [error, setError] = useState('');
    const [inputValue, setInputValue] = useState('');

    function isValidUsername(username,allowlist) {
        if (username.toLowerCase() === 'dog') {
            return false;
        }

        if (!/^[A-Za-z0-9_]+$/.test(username.trim())) {
            return false;
        }
        
        return allowlist.includes(username);
    }

    function onSubmitHandler() {
        const allowlist = ['alex', 'bob', 'charlie', 'user', 'jessica', 'neville'];

        if (isValidUsername(inputValue, allowlist)) {
            setIsLoggedIn(true);
            setUsername(inputValue);
            setError('');
        } else {
            setIsLoggedIn(false)
            if (inputValue === 'dog') {
                setError('Error: Dog is not welcomed');
            } else if (!/^[A-Za-z0-9_]+$/.test(inputValue.trim())) {
                setError('Error: The username is not made up of valid characters');
            } else {
                setError('Error: The username is not allowed')
            }
        }
    }

    return (
      <div className="login-page">
        <h1>Word Game</h1>
        <h2>Please Login</h2>
        <form onSubmit={(e) => {
            e.preventDefault();

            onSubmitHandler();
            setInputValue('')
        }}>
            <input
                value={inputValue}
                onInput={(e) => setInputValue(e.target.value)}
                placeholder="Please enter your username"
            />
            <button className="login-button">Login</button>
        </form>
        <div className="result error">{error}</div>
      </div>
    );
}

export default LoginPage;
