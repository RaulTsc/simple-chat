// @flow

import React, {Component} from 'react';

import Header from '../Header/Header'
import MessagesList from '../MessagesList/MessagesList';
import ChatInput from '../ChatInput/ChatInput';
import ChatMembers from '../ChatMembers/ChatMembers';

import './App.css'

class App extends Component {
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

export default App
