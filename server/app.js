'use strict';

const path       = require('path');
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

const app = express();

module.exports = (dbHandler) => {
    const saveUser    = dbHandler.saveUser;
    const getUsers    = dbHandler.getUsers;
    const getMessages = dbHandler.getMessages;

    // Enable CORS
    app.use(cors());
    // Serve static assets
    app.use(express.static(path.resolve(__dirname, '..', 'build')));
    // So that express knows how to properly parse json
    app.use(bodyParser.json());

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

                app.get('onlineUsers').forEach(onlineUser => {
                    if (user.id === onlineUser.userId) {
                        isOnline = true;
                    }
                });

                return {
                    id    : user.id,
                    name  : user.name,
                    avatar: user.avatar,
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

    return app;
};
