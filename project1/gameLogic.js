const { getUserGame, setUserGame, resetUserGame } = require('./dataStore');
const words = require('./words');

function startNewGame(username) {
    const secretWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    resetUserGame(username, { secretWord, guesses: [], guessCount: 0, gameOver: false });
}

function makeAGuess(username, guess) {
    guess = guess.toUpperCase();
    const userGame = getUserGame(username);

    if (!userGame || !words.map(word => word.toUpperCase()).includes(guess)) {
        return { valid: false };
    }
    
    if (userGame.guesses.map(g => g.guess).includes(guess)) {
        return { valid: true, correct: false, repeat: true };
    }

    const matchCount = guess === userGame.secretWord ? userGame.secretWord.length : getMatchCount(guess, userGame.secretWord);
    const isCorrect = guess === userGame.secretWord;

    userGame.guesses.push({ guess, matchCount });
    userGame.guessCount += 1;
    userGame.lastGuess = guess;
    userGame.lastGuessInvalid = false;

    if (isCorrect) {
        userGame.gameOver = true;
    }

    setUserGame(username, userGame);

    return { valid: true, correct: isCorrect, matchCount: matchCount };
}


function getGameStatus(username, feedback = "") {
    const userGame = getUserGame(username);
    if (!userGame) {
        return 'Game data not found. Please start a new game.';
    }

    let contentHtml = `<p>Guess the secret word!</p>${feedback}`;

    // Show the number of guesses that have been made
    contentHtml += `
        <p>Guesses Made: ${userGame.guessCount}</p>`;

    // Shows the guessed word and the number of letters it matches.
    if (userGame.guesses.length > 0) {
        contentHtml += `
            <p>Previous Guesses:</p><ul>`;
        userGame.guesses.forEach(guessObj => {
            contentHtml += `
                <li>${guessObj.guess} (Matching letters: ${guessObj.matchCount})</li>`;
        });
        contentHtml += `</ul>`;
    } else {
        contentHtml += `
            <p>No guesses made yet.</p>`;
    }

    // Add feedback for invalid guesses
    if (userGame.lastGuessInvalid) {
        contentHtml += `
            <p>Last guess "${userGame.lastGuess}" was invalid.</p>`;
    }

    // If the game is over, display a win or lose message
    if (userGame.gameOver) {
        contentHtml += `
            <p>Congratulations! You've guessed the word correctly: <strong>${userGame.secretWord}</strong>.</p>`;
    } else {
        // Add a guessing list
        contentHtml += `
            <form action="/guess" method="post">
                <input type="text" name="guess" required>
                <button type="submit">Guess</button>
             </form>`;
    }

    // Add option to start a new game
    contentHtml += `
        <form action="/new-game" method="post">
            <button type="submit">Start New Game</button>
        </form>`;

    // Add a logout button
    contentHtml += `
        <form action="/logout" method="post">
            <button type="submit">Logout</button>
        </form>`;

    return contentHtml;
}

function getMatchCount(guess, secretWord) {
    let count = 0;
    for (let i = 0; i < guess.length; i++) {
        if (secretWord.includes(guess[i])) count++;
    }
    return count;
}

module.exports = { startNewGame, makeAGuess, getGameStatus };
