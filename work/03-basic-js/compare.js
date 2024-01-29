"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */

word = word.toLowerCase();
guess = guess.toLowerCase();

const commonLetters = {};
const wordLetterCount = {};

for (let letter of word) {
  wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
}

for (let letter of guess) {
  if (wordLetterCount[letter] > 0) {
    commonLetters[letter] = (commonLetters[letter] || 0) + 1;
    wordLetterCount[letter] -= 1;
  }
}

let totalCount = 0;
for (let count of Object.values(commonLetters)) {
  totalCount += count;
}

return totalCount;
}
