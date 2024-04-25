import { MESSAGES } from "./constants";

export function login(response, setState) {
    setState(prevState => ({
        ...prevState,
        loginStatus: true,
        username: response.username,
        users: response.users,
        messages: response.messages,
        error: ''
    }));
}

export function logout(setState) {
    setState({
        loginStatus: false,
        username: '',
        users: {},
        messages: [],
        error: ''
    });
}

export function setError(error, setState) {
    setState(prevState => ({
        ...prevState,
        error: MESSAGES[error] || MESSAGES.default
    }));
}

export function refreshChat(setState) {
    fetchGetMessages()
    .then(response => {
        setState(prevState => ({
            ...prevState,
            users: response.users,
            messages: response.messages,
            error: ''
        }));
    })
    .catch(error => {
        setError(error.error, setState);
    });
}
