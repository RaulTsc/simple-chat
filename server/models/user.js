'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    id    : String,
    name  : String,
    avatar: String
});

module.exports = mongoose.model('User', userSchema);