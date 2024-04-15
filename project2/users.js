const users = {};
const messages = [];

const isValidUsername = (username) => {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
};

module.exports = {
    users,
    messages,
    isValidUsername,
};