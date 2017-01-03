// @flow

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../Header/Header'
import ChatMembers from '../ChatMembers/ChatMembers';
import MessagesList from '../MessagesList/MessagesList';
import ChatInput from '../ChatInput/ChatInput';

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
