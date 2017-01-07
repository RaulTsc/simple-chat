// @flow

import io from 'socket.io-client';
const socket = io.connect();

import {onlineUsers, sendMessage, userIsTyping, userIsNotTyping} from '../actions'

export default class SocketCommunicationHandler {
    static handleCommunication(store) {
        socket.on('onlineUsers', (data) => {
            store.dispatch(onlineUsers(data));
        });

        socket.on('chat message', (msg) => {
            store.dispatch(sendMessage(msg));
        });

        socket.on('userIsTyping', (data) => {
            store.dispatch(userIsTyping(data));
        });

        socket.on('userIsNotTyping', (data) => {
            store.dispatch(userIsNotTyping(data));
        });
    }

    static emit(channel, data) {
        socket.emit(channel, data);
    }
}