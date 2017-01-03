'use strict';

const User = require('../models/user');

module.exports = (cb) => {
    User.find(function(err, users) {
        if (err) {
            // Not handled at this point
        }

        cb(users);
    });
};