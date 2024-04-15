import {
    fetchSession,
    fetchLogin,
    fetchLogout,
    fetchGetMessages,
    fetchPostMessage,
} from './services';

import state, {
    login,
    logout,
    getMessages,
    setError,
} from './state';

import {
    render,
    usersHtml,
    messagesHtml,
} from './view';

const appEl = document.querySelector('#app');

appEl.addEventListener('click', (e) => {
    // login
    if(e.target.classList.contains('login-button')) {
        const username = document.querySelector('.login-input').value;
        fetchLogin(username)
        .then( response => {
            fetchGetMessages()
            .then( response => {
                login(response);
                render({ state, appEl });
            })
        })
        .catch( error => {
            setError(error.error)
            render({ state, appEl });
        })
    }

    // logout
    if(e.target.classList.contains('logout-button')) {
        fetchLogout()
        .then(response => {
            logout()
            render({ state, appEl });
        })
        .catch( error => {
            setError(error.error);
            render({ state, appEl });
        })
    }
})

app.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = document.querySelector('.message-input').value;

    fetchPostMessage(message)
    .then( response => {
        login(response);
        render({ state, appEl });
    })
    .catch( error => {
        setError(error.error);
        render({ state, appEl });
    })
})

fetchSession()
.then( response => {
    fetchGetMessages()
    .then(response => {
        login(response);
        render({ state, appEl});
    })
})
.catch( error => {
    logout();
    render({ state, appEl });
})

pollChats();

function refreshChat() {
    fetchGetMessages()
    .then( response => {
        login(response);

        const usersContainerEl = document.querySelector('.users-container');
        usersContainerEl.innerHTML = usersHtml(state.users);

        const messagesContainerEl = document.querySelector('.messages-container');
        messagesContainerEl.innerHTML = messagesHtml(state.messages);
    })
    .catch( error => {
        setError(error.error);
    })
}

function pollChats() {
    refreshChat()
    setTimeout(pollChats, 5000)
}