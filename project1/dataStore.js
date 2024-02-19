let sessions = {};
let userGames = {};

function getSession(sid) {
    return sessions[sid];
}

function createSession(sid, username) {
    sessions[sid] = { username };
    if (!userGames[username]) {
        userGames[username] = {};
    }
}

function deleteSession(sid) {
    delete sessions[sid];
}

function getUserGame(username) {
    return userGames[username];
}

function setUserGame(username, gameData) {
    if (userGames[username]) {
        userGames[username] = { ...userGames[username], ...gameData };
    } else {
        userGames[username] = gameData;
    }
}

function resetUserGame(username, gameData) {
    userGames[username] = { ...gameData, lastGuessInvalid: false, lastGuess: '' };
}

module.exports = { getSession, createSession, deleteSession, getUserGame, setUserGame, resetUserGame };
