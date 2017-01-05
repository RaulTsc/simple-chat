'use strict';

const Message = require('./models/message');
const User    = require('./models/user');

module.exports = {
    getMessages: (cb) => {
        Message.find(function (err, msgs) {
            if (err) {
                // Not handled at this point
            }

            cb(msgs);
        });
    },
    saveMessage: (msg) => {
        const msgDb = new Message(msg);

        msgDb.save(err => {
            if (err) {
                // Not handled at this point
            }

            // Don't care if msgs were succesfully saved, we want it to be fast
        });
    },
    getUsers   : (cb) => {
        User.find(function (err, users) {
            if (err) {
                // Not handled at this point
            }

            cb(users);
        });
    },
    saveUser   : (user, cb) => {
        const userDb = new User(user);

        userDb.save(err => {
            if (err) {
                // Not handled at this point
            }

            cb(user);
        });
    }
};