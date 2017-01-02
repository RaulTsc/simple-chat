'use strict';

const fs = require('fs');

module.exports = () => {
    return JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));
};