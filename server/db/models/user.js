'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    id    : String,
    name  : String,
    avatar: String,
    email : String
});

userSchema.pre("save", true, function (next, done) {
    mongoose.models["User"].findOne({email: this.email}, function (err, user) {
        if (err) {
            done(err);
        } else if (user) {
            this.invalidate("email", "Email must be unique");
            done(new Error("Email must be unique"));
        } else {
            done();
        }
    }.bind(this));
    next();
});

module.exports = mongoose.model('User', userSchema);