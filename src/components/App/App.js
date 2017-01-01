// @flow

import React, {Component} from 'react';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Header from '../Header/Header'
import MessagesListContainer from '../../containers/MessagesListContainer';
import ChatInput from '../ChatInput/ChatInput';
import ChatMembers from '../ChatMembers/ChatMembers';

import reducer from '../../reducers';

const store = createStore(reducer);

import './App.css'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Header />
                    <ChatMembers />
                    <MessagesListContainer />
                    <ChatInput />
                </div>
            </Provider>
        )
    }
}

export default App
