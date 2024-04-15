const app = document.querySelector('#app');

export const render = (username, storedWord) => {
    app.innerHTML = generateHtml(username, storedWord);
    return;
}

const generateHtml = (username, storedWord) => {
    if (!username && !storedWord) {
        return `
            <div class="container">
                <input
                    class="input"
                    type="text"
                    placeholder="Please enter a username to login"
                    maxlength="15"
                />
                <button class="login">Login</button>
            </div>
            <div class="error"></div>
        `
    } else {
        return `
            <div class="container">
                <div class="info">
                    <div>User: ${username}</div>
                    <div>Stored Word: ${storedWord || ''}</div>
                </div>
            
                <input
                    class="input"
                    type="text"
                    placeholder="Update your word"
                    maxlength="15"
                />
                <button class="update">update</button>
                <button class="delete">Log out</button>
            </div>
            <div class="error"></div>
        `
    }
}
