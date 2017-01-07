'use strict';

const dbHandler   = require('./db/dbHandler');
const saveMessage = dbHandler.saveMessage;

// Import express app
const app = require('./app')(dbHandler);

const http     = require('http').Server(app);
const io       = require('socket.io')(http);
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://mongo:27017/simpleChat');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Successfully connected to db! :)');
});

// No online users initially
app.set('onlineUsers', []);

// Socket actions
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        // Async; don't care if it fails at this point
        saveMessage(msg);

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        app.set('onlineUsers', app.get('onlineUsers').filter(x => x.socketId !== socket.id))
        io.sockets.emit('onlineUsers', app.get('onlineUsers'));
    });

    socket.on('userWentOnline', (userData) => {
        let onlineUsers = app.get('onlineUsers');

        onlineUsers.push({
            userId  : userData.userId,
            socketId: socket.id
        });
        io.sockets.emit('onlineUsers', onlineUsers);

        app.set('onlineUsers', onlineUsers);
    });

    socket.on('userIsTyping', (data) => {
        io.sockets.emit('userIsTyping', data);
    });

    socket.on('userIsNotTyping', (data) => {
        io.sockets.emit('userIsNotTyping', data);
    });
});

const PORT = process.env.PORT || 9000;
http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
