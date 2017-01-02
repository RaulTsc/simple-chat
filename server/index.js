'use strict';

const express    = require('express');
const path       = require('path');
const app        = express();
const cors       = require('cors');
const http       = require('http').Server(app);
const io         = require('socket.io')(http);
const bodyParser = require('body-parser');

const saveUser = require('./saveUser');
const getUsers = require('./getUsers');

// Enable CORS
app.use(cors());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// So that express knows how to properly parse json
app.use(bodyParser.json());

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    console.log('user connected');
});

app.post('/createUser', (req, res) => {
    res.send(saveUser(req.body));
});

app.get('/users', (req, res) => {
    res.send(getUsers());
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
