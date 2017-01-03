'use strict';

const Message = require('../models/message');

module.exports = (cb) => {
    Message.find(function(err, msgs) {
        if (err) {
            // Not handled at this point
        }

        cb(msgs);
    });
};