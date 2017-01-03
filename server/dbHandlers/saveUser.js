'use strict';

const User = require('../models/user');

module.exports = (user, cb) => {
    const userDb = new User(user);

    userDb.save(err => {
        if (err) cb(err);

        cb(user);
    });
};