// @flow

import fetch from 'isomorphic-fetch';

let msgId = 0;

export const sendMessage = (msg: Object) => ({
    id      : msgId++,
    type    : 'SEND_MSG',
    text    : msg.text,
    fromName: msg.fromName,
    fromId  : msg.fromId
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

export const createUser = (user: Object) => {
    return (dispatch: Function) => {
        dispatch(createUserRequest(user))

        return fetch(`/createUser`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body   : JSON.stringify(user)
        })
            .then(response => response.json())
            .then(json => {
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
    return (dispatch: Function) => {
        dispatch(getUsersRequest());

        return fetch(`/users`)
            .then(response => response.json())
            .then(json => dispatch(getUsersSuccess(json)))
    }
};

// In case we want to display loading
const getMessagesRequest = () => {
    return {
        type: 'GET_MSGS_REQUEST'
    }
};

const getMessagesSuccess = (msgs) => {
    return {
        type: 'GET_MSGS_REQUEST_SUCCESS',
        msgs
    }
};

export const getMessages = () => {
    return (dispatch: Function) => {
        dispatch(getMessagesRequest());

        return fetch(`/messages`)
            .then(response => response.json())
            .then(json => dispatch(getMessagesSuccess(json)))
    }
};

export const onlineUsers = (data: Object) => ({
    type : 'ONLINE_USERS',
    users: data
});

export const muteUser = (user: Object) => ({
    type: 'MUTE_USER',
    user
});

export const muteUserMsgs = (userId: String) => ({
    type: 'MUTE_USER_MSGS',
    userId
});