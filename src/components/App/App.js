// @flow

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../Header/Header'
import ChatMembers from '../ChatMembers/ChatMembers';
import MessagesList from '../MessagesList/MessagesList';
import ChatInput from '../ChatInput/ChatInput';
import {onlineUsers} from '../../actions'

import io from 'socket.io-client';
const socket = io.connect();

import './App.css'

class App extends Component {
    constructor(props) {
        super(props);

        socket.on('handshake', (socketId) => {
            socket.emit('handshakeComplete', {
                socketId,
                userId: this.props.currentMember.id
            })
        });

        socket.on('onlineUsers', function (data) {
            this.props.dispatch(onlineUsers(data))
        }.bind(this));
    }

    render() {
        return (
            <div className="App">
                <Header />
                <ChatMembers />
                <MessagesList />
                <ChatInput />
            </div>
        )
    }
}

App.propTypes = {
    currentMember: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        currentMember: state.members.currentMember
    }
};

App = connect(
    mapStateToProps
)(App);

export default App
