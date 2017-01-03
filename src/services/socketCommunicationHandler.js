// @flow

import io from 'socket.io-client';
const socket = io.connect();

import {onlineUsers, sendMessage} from '../actions'

export default class SocketCommunicationHandler {
    static handleCommunication(store) {
        socket.on('handshake', (socketId) => {
            socket.emit('handshakeComplete', {
                socketId,
                userId: store.getState().members.currentMember.id
            })
        });

        socket.on('onlineUsers', function (data) {
            store.dispatch(onlineUsers(data));
        });

        socket.on('chat message', (msg) => {
            store.dispatch(sendMessage(msg));
        });
    }
}