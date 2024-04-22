export function render( { state, appEl }) {
    if(state.loginStatus) {
        appEl.innerHTML = `
        <div class="main">
            ${generateErrorHtml( state )}
            ${generateChatHtml( state )}
            <div class="logout-container">
                <button class="logout-button">Logout</button>
            </div>
        </div>
        `
    } else {
        appEl.innerHTML = `
        <div class="main">
            <h2>Please login</h2>
            ${generateErrorHtml( state )}
            ${generateLoginHtml( state )}
        </div>
        `
    }
}

function generateErrorHtml( state ) {
    return `
        <div class="error">${state.error}</div>
    `;
}

function generateLoginHtml() {
    return `
    <div class="login">
        <input type="text" class="login-input" placeholder="Enter Username">
        <button class="login-button">Log in</button>
    </div>
    `
}

function generateChatHtml( state ) {
    return `
        <div class="chat-container">
            <div class="users-container">${usersHtml(state.users)}</div>
            <div class="messages-container">${messagesHtml(state.messages)}</div>
            <div class="send-message-container">${sendMessageHtml()}</div>
        </div>
    `
}

export function usersHtml( users ) {
    const usersList = [];
    for(const user in users) {
        usersList.push(`
        <div class=${users[user].loginStatus ? 'online-user' : 'offline-user'}>
            ${user}
        </div>`);
    }
    return usersList.join('');
}

export function messagesHtml( messages ) {
    return messages.map( message => (`
        <div class="one-message-container">
            <div class="username">${message.username}</div>
            <div>${message.message}</div>
        </div>
    `)).join('');
}

function sendMessageHtml() {
    return `
    <form>
        <input type="text" class="message-input" placeholder="Enter message here">
    </form>
    `
}