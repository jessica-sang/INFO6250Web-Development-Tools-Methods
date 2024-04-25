const uuid = require('uuid').v4;

const sessions = {};

const addSession = (username) => {
    const sid = uuid();
    sessions[sid] = {username};
    return sid;
};

const getSessionUser = (sid) => {
    return sessions[sid]?.username;
};

const deleteSession = (sid) => {
    delete sessions[sid];
};

module.exports = {
    addSession,
    getSessionUser,
    deleteSession,
};
