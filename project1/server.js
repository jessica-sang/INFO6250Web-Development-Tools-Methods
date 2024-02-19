const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;

const { startNewGame, makeAGuess, getGameStatus } = require('./gameLogic');
const { getSession, createSession, deleteSession } = require('./dataStore');

const app = express();
const port = 3000;

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    const session = getSession(sid);
    if (!session) {
        return res.send('<form action="/login" method="post">Username: <input type="text" name="username"><button type="submit">Login</button></form>');
    } else {
        const message = req.query.msg;
        let feedback = "";
        if (message === "invalid") {
            feedback = "<p>Last guess was invalid.</p>";
        } else if (message === "correct") {
            feedback = "<p>Congratulations! Your guess was correct!</p>";
        } else if (message === "incorrect") {
            feedback = "<p>Incorrect guess. Try again!</p>";
        }
        const status = getGameStatus(session.username, feedback);
        res.send(status);
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim().toLowerCase();
    if (!username || username === 'dog' || !/^[a-z0-9]+$/i.test(username)) {
        return res.send('Invalid username. <a href="/">Try again</a>');
    }
    const sid = uuid();
    createSession(sid, username);
    res.cookie('sid', sid);
    startNewGame(username);
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    deleteSession(sid);
    res.clearCookie('sid').redirect('/');
});

app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    const session = getSession(sid);
    if (!session) {
        return res.status(401).send("Invalid session. Please log in.");
    }
    const username = session.username;
    const guess = req.body.guess;
    const result = makeAGuess(username, guess);

    let redirectUrl = '/';
    if (!result.valid) {
        return res.redirect('/?msg=invalid');
    } else if (result.correct) {
        return res.redirect('/?msg=correct');
    } else {
        return res.redirect('/?msg=incorrect');
    }
    res.redirect(redirectUrl);
});


app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    const session = getSession(sid);
    if (!session) {
        return res.status(401).send("Invalid session. Please log in.");
    }
    startNewGame(session.username);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
