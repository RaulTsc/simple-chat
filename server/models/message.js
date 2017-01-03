'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
    text  : String,
    from  : String,
    userId: String
});

module.exports = mongoose.model('Message', messageSchema);