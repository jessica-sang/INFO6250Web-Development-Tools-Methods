function compare( word, guess ) {
    let convertedWord = word.toLowerCase();
    let convertedGuess = guess.toLowerCase();
    let wordChars = {};
    let guessChars = {};
    let num = 0;
  
    for (let i = 0; i < convertedWord.length; i++) {
      wordChars[convertedWord[i]] = (wordChars[convertedWord[i]] || 0) + 1;
      guessChars[convertedGuess[i]] = (guessChars[convertedGuess[i]] || 0) + 1;
    }
  
    for (const letter in wordChars) {
      if (guessChars[letter]) {
        num += Math.min(wordChars[letter], guessChars[letter]);
      }
    }
  
    return num;
}
  
  export function checkWord(word) {
    const convertedWord = word.toLowerCase();
  
    if (convertedWord.length !== 5) {
      return `'${word}' is not a valid word!`
    } else if (convertedWord === 'recat') {
      return `'${word}' is the secret word!`
    } else {
      return `'${word}' had ${compare(word, 'RECAT')} letters in common`
    }
}
