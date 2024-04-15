import { MESSAGES } from "./constant";

const state = {
    loginStatus: false,
    username: '',
    users: {},
    messages: [],
    error: '',
}

export function login( response ) {
    state.loginStatus = true;
    state.username = response.username;
    state.users = response.users;
    state.messages = response.messages;
    state.error = '';
}

export function logout() {
    state.loginStatus = false;
    state.username = '';
    state.users = {};
    state.messages = [];
    state.error = '';
}

export function getMessages( response ) {
    state.messages = response.messages;
    state.error = '';
}

export function setError( error ) {
    if(!error) {
        state.error = '';
        return;
    }
    state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;