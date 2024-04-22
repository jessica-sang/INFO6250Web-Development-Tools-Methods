import { useEffect, useState } from 'react';
import { fetchLogout, fetchGetWord, fetchPutWord } from './services.js';
import { MESSAGES } from './constants.jsx';

function User({ setLoading, user,setUserState, onLogout }) {
    const [inputValue, setInputValue] = useState('');
    const [wordResult, setWordResult] = useState('')

    useEffect(
        () => {
          fetchGetWord()
          .then( response => {            
            const storedWord = '' || response.storedWord;
            setWordResult(storedWord)
          })
          .catch( err => {
            setUserState({
                username: user,
                isLoggedIn: true,
                error: MESSAGES[err.error]
            })
        });
        },
        []
      );

    return (
        <div className="user">
            <div className='user-name'>{user}</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    setLoading(true)
                    fetchPutWord(inputValue)
                    .then( response => {
                        setWordResult(response.word)
                        setUserState({
                            username: user,
                            isLoggedIn: true,
                            error: ''
                        })
                    })
                    .catch( err => {
                        setUserState({
                            username: user,
                            isLoggedIn: true,
                            error: MESSAGES[err.error]
                        })                      
                    });
                    setLoading(false);
                    setInputValue('')
                }}
            >
                <div className='word'>Stored Word: {wordResult}</div>

                <input 
                    maxLength={25}
                    value={inputValue}
                    onInput={(e) => setInputValue(e.target.value)}
                    placeholder='Please enter a word'
                />
                <button>Submit</button>
                <button
                    onClick={() => {
                        fetchLogout()
                        onLogout()
                    }}
                    className='logout-button'
                >Logout</button>
            </form>

        </div>
    );
}

export default User;
