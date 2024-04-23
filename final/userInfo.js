const users = {};
const messages = [];

const isValidUsername = (username) => {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
};

const punchBanana = (username) => {
    if (!users[username]) {
        users[username] = { loginStatus: false, bananaCount: 0 };
    }
    users[username].bananaCount = (users[username].bananaCount || 0) + 1;
    return users[username].bananaCount;
};

const getBananaCount = (username) => {
    return users[username] ? users[username].bananaCount || 0 : 0;
};

module.exports = {
    users,
    messages,
    isValidUsername,
    punchBanana,
    getBananaCount
};
