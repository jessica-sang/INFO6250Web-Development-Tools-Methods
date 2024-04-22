import { useState } from 'react';
import { checkWord } from './word';

function UserPage({ isLoggedIn, setIsLoggedIn, username }) {
    const [inputValue, setInputValue] = useState('');
    const [wordResult, setWordResult] = useState('');

    function onClickLogout() {
        if (!isLoggedIn) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    return (
      <div className="game-page">
        <h1>Welcome {username}, please enter a 5 letter word!</h1>
        <form onSubmit={(e) => {
            e.preventDefault();

            setWordResult(checkWord(inputValue))
            setInputValue('')
        }}>
            <input
                value={inputValue}
                onInput={(e) => setInputValue(e.target.value)}
                placeholder="Please enter a 5 letter word"
            />
            <button>Submit</button>
            <button className="logout-button" onClick={onClickLogout}>Logout</button>
        </form>
        <div className="result word-result">{wordResult}</div>
      </div>
    );
}
  
export default UserPage;
