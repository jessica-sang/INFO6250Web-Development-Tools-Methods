import { useState } from 'react';
import { fetchLogin } from './services.js';
import { MESSAGES } from './constants.jsx';

function Login({ setLoading, setUserState, onLogin }) {
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="login">
            <form onSubmit={(e) => {
                e.preventDefault();

                setLoading(true);

                fetchLogin(inputValue)
                .then( response => {
                    onLogin(response.username);
                    return;
                })
                .catch( err => {
                    setUserState({
                        username: '',
                        isLoggedIn: false,
                        error: MESSAGES[err.error]
                    })
                })
                
                setInputValue('')
                setLoading(false);
            }}>
                <input
                    maxLength={25}
                    value={inputValue}
                    onInput={(e) => setInputValue(e.target.value)}
                    placeholder="Please enter your name"
                />
                <button className='login-button'>Login</button>
            </form>
        </div>
    );
}

export default Login;
