'use strict';

const User = require('../models/user');

module.exports = (cb) => {
    User.find(function(err, users) {
        if (err) cb(err);

        cb(users);
    });
};