// @flow

import io from 'socket.io-client';
const socket = io.connect();

import {onlineUsers, sendMessage} from '../actions'

export default class SocketCommunicationHandler {
    static handleCommunication(store) {
        socket.on('onlineUsers', function (data) {
            store.dispatch(onlineUsers(data));
        });

        socket.on('chat message', (msg) => {
            store.dispatch(sendMessage(msg));
        });
    }

    static emit(channel, data) {
        socket.emit(channel, data);
    }
}