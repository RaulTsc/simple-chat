'use strict';

const User = require('../models/user');

module.exports = (user) => {
    const userDb = new User(user);

    userDb.save(err => {
        if (err) return err;

        console.log('User was saved');
        // Do nothing on success; we don't care if the save was successful at this point, we just hope :)
    });

    return user;
};