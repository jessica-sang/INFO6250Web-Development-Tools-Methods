const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const userInfo = require('./user');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !userInfo.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if (!userInfo.isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie('sid', sid);

  userInfo.users[username] ||= "";

  res.json({ username });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    // delete the session
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

// Words
app.get('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const storedWord = userInfo.users[username] || "";

  res.json({ storedWord });
});

app.put('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { word } = req.body;

  if (!word && word !== '') {
    res.status(400).json({ error: 'required-word' });
    return;
  }

  if (!userInfo.isValidWord(word)) {
    res.status(400).json({ error: 'invalid-word' });
    return;
  }

  userInfo.users[username] = word;

  res.json({ word });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
