'use strict';

const Message = require('../models/message');

module.exports = (msg) => {
    const msgDb = new Message(msg);

    msgDb.save(err => {
        if (err) return err;

        // Don't care if msgs were succesfully saved, we want it to be fast
    });
};