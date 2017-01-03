'use strict';

const express    = require('express');
const path       = require('path');
const app        = express();
const cors       = require('cors');
const http       = require('http').Server(app);
const io         = require('socket.io')(http);
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

// DB setup
mongoose.connect('mongodb://mongo:27017/simpleChat');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Successfully connected to db! :)');
});

const saveUser    = require('./dbHandlers/saveUser');
const getUsers    = require('./dbHandlers/getUsers');
const saveMessage = require('./dbHandlers/saveMessage');
const getMessages = require('./dbHandlers/getMessages');

// Enable CORS
app.use(cors());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// So that express knows how to properly parse json
app.use(bodyParser.json());

let onlineUsers = [];

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        // Async; don't care if it fails at this point
        saveMessage(msg);

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(x => x.socketId !== socket.id);
        io.sockets.emit('onlineUsers', onlineUsers);
    });

    socket.on('userWentOnline', (userData) => {
        onlineUsers.push({
            userId  : userData.userId,
            socketId: socket.id
        });
        io.sockets.emit('onlineUsers', onlineUsers);
    });
});

app.post('/createUser', (req, res) => {
    saveUser(req.body, (user) => {
        res.send(user);
    });
});

// Only on page load
app.get('/users', (req, res) => {
    getUsers((users) => {
        users = users.map(user => {
            let isOnline = false;

            onlineUsers.forEach(onlineUser => {
                if (user.id === onlineUser.userId) {
                    isOnline = true;
                }
            });

            return {
                id      : user.id,
                name    : user.name,
                avatar  : user.avatar,
                isOnline
            };
        });

        res.send(users);


    });
});

app.get('/messages', (req, res) => {
    getMessages((msgs) => {
        msgs = msgs.map(msg => {
            return {
                text    : msg.text,
                fromName: msg.fromName,
                fromId  : msg.fromId
            };
        });

        res.send(msgs);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
