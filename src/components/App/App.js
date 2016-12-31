// @flow

import React, {Component} from 'react';

import './App.css'

import MessagesListContainer from '../../containers/MessagesListContainer';
import ChatInput from '../ChatInput/ChatInput';
import ChatMembers from '../ChatMembers/ChatMembers';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <h2>Simple Chat</h2>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <ChatMembers />
                <MessagesListContainer />
                <ChatInput />
            </div>
        )
    }
}

export default App
