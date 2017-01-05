'use strict';

const chai    = require('chai');
const expect  = chai.expect;    // Using Expect style
const request = require('supertest');

let USERS_IN_DB = [
    {
        id    : '12345678',
        name  : 'Mock User 1',
        avatar: 'someUrl'
    },
    {
        id    : '876543221',
        name  : 'Mock User 2',
        avatar: 'someUrl'
    }
];
let mockUser3   = {
    name  : 'Mock User 3',
    avatar: 'someUrl'
};

let MSGS_IN_DB = [
    {
        text    : 'Mock Msg 1',
        fromId  : '12345678',
        fromName: 'Mock User 1'
    },
    {
        text    : 'Mock Msg 2',
        fromId  : '87654321',
        fromName: 'Mock User 2'
    },
    {
        text    : 'Mock Msg 3',
        fromId  : '87654321',
        fromName: 'Mock User 2'
    }
];

const dbHandlerMock = {
    getMessages: (cb) => {
        cb(MSGS_IN_DB);
    },
    saveMessage: (msg) => {
        // Don't need this for testing
    },
    getUsers   : (cb) => {
        cb(USERS_IN_DB);
    },
    saveUser   : (user, cb) => {
        USERS_IN_DB.push(user);
        cb(user);
    }
};

const app = require('../app')(dbHandlerMock);
app.set('onlineUsers', []);

describe('GET /users', function () {
    it('should respond with the users in the db and all should be offline', (done) => {
        request(app)
            .get('/users')
            .end(function (err, res) {
                let expectedUsers = USERS_IN_DB.map(user => {
                    user.isOnline = false;
                    return user;
                });

                expect(res.body).to.deep.equal(expectedUsers);
                done();
            });
    });

    it('should respond with the users in the db and user with id 12345678 should be online', (done) => {
        app.set('onlineUsers', [{socketId: '1234abcde', userId: '12345678'}]);

        request(app)
            .get('/users')
            .end(function (err, res) {
                let expectedUsers = USERS_IN_DB.map(user => {
                    if (user.id === '12345678') {
                        user.isOnline = true;
                    } else {
                        user.isOnline = false;
                    }

                    return user;
                });

                expect(res.body).to.deep.equal(expectedUsers);
                done();
            });
    });
});

describe('POST /createUser', () => {
    it('should insert an user in the database', (done) => {
        request(app)
            .post('/createUser')
            .send(mockUser3)
            .end(function (err, res) {
                expect(res.body).to.deep.equal(mockUser3);

                request(app)
                    .get('/users')
                    .end(function (err, res) {
                        expect(res.body.length).to.equal(3);
                        done();
                    });
            });
    });
});

describe('GET /users', function () {
    it('should return all the messages in the database', (done) => {
        request(app)
            .get('/messages')
            .end(function (err, res) {
                expect(res.body).to.deep.equal(MSGS_IN_DB);
                done();
            });
    });
});
