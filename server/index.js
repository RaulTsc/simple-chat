'use strict';

const express = require('express');
const path    = require('path');
const app     = express();
var http      = require('http').Server(app);
var io        = require('socket.io')(http);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`)
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    console.log('user connected');
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;

http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
