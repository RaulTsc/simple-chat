'use strict';

const fs = require('fs');

const userNotExists = (users, user) => {
    return users.filter(x => x.id === user.id).length === 0;
};

module.exports = (user) => {
    let users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

    if (userNotExists(users, user)) {
        users.push(user);
    }

    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(users));

    return user;
};