const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

let sessions = {};
let userWords = {};

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        const username = sessions[sid].username;
        const word = userWords[username] || '';
        const data = { username, word };
        res.send(renderPage('data.html', data));
    } else {
        res.send(renderPage('login.html'));
    }
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username || username === 'dog' || !/^[a-zA-Z0-9]+$/.test(username)) {
        const statusCode = username === 'dog' ? 403 : 400;
        res.status(statusCode).send(renderPage('error.html', { statusCode, message: 'Invalid username.' }));
        return;
    }

    const sid = uuid();
    res.cookie('sid', sid, { httpOnly: true });
    sessions[sid] = { username };
    userWords[username] = userWords[username] || '';
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid').redirect('/');
});

app.post('/update-word', (req, res) => {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        const username = sessions[sid].username;
        userWords[username] = req.body.word;
    }
    res.redirect('/');
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Render HTML page function
function renderPage(fileName, data = {}) {
    let html = require('fs').readFileSync(`${__dirname}/${fileName}`, 'utf8');
    for (const [key, value] of Object.entries(data)) {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return html;
}
