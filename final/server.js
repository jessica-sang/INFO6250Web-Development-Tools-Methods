const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const usersInfo = require('./userInfo');
const sessions = require('./sessions');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    usersInfo.users[username].loginStatus = true;

    res.json({ username, users: usersInfo.users });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if (!usersInfo.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    res.cookie('sid', sid, { httpOnly: true });

    usersInfo.users[username] = { loginStatus: true };

    res.json({ username, users: usersInfo.users });
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) res.clearCookie('sid');
    if (username) {
        sessions.deleteSession(sid);
        usersInfo.users[username].loginStatus = false;
    }

    res.json({ wasLoggedIn: !!username });
});

app.get('/api/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    usersInfo.users[username].loginStatus = true;
    res.json({ username, users: usersInfo.users, messages: usersInfo.messages });
});

app.post('/api/message', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { message } = req.body;
    if (!message) {
        res.status(400).json({ error: 'required-message' });
        return;
    }

    const newMessage = { username, message };
    usersInfo.messages.push(newMessage);
    res.json({ username, users: usersInfo.users, messages: usersInfo.messages });
});

// 获取用户的香蕉打卡次数
app.get('/api/banana-count/:username', (req, res) => {
    const username = req.params.username;
    if (!username || !usersInfo.users[username]) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const count = usersInfo.getBananaCount(username);
    res.json({ count });
});

// 更新用户的香蕉打卡次数
app.post('/api/banana-punch', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    
    if (!username) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const count = usersInfo.punchBanana(username);
    res.json({ count });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
