// @flow

import fetch from 'isomorphic-fetch';

let msgId = 0;

export const sendMessage = (msg) => ({
    id  : msgId++,
    type: 'SEND_MSG',
    text: msg.text,
    from: msg.from
});

// In case we want to display loading
const createUserRequest = (user) => {
    return {
        type: 'CREATE_USER_REQUEST',
        user
    }
};

const createUserSuccess = (user) => {
    return {
        type: 'CREATE_USER_REQUEST_SUCCESS',
        user
    }
};

export const createUser = (user) => {
    return (dispatch) => {
        dispatch(createUserRequest(user))

        console.log(user);

        return fetch(`http://localhost:9000/createUser`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body   : JSON.stringify(user)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                return dispatch(createUserSuccess(json))
            })
    }
};

// In case we want to display loading
const getUsersRequest = () => {
    return {
        type: 'GET_USERS_REQUEST'
    }
};

const getUsersSuccess = (users) => {
    return {
        type: 'GET_USERS_REQUEST_SUCCESS',
        users
    }
};

export const getUsers = () => {
    return (dispatch) => {
        dispatch(getUsersRequest());

        return fetch(`http://localhost:9000/users`)
            .then(response => response.json())
            .then(json => dispatch(getUsersSuccess(json)))
    }
};

export const onlineUsers = (data) => ({
    type : 'ONLINE_USERS',
    users: data
});
