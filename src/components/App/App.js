// @flow

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from './Header/Header'
import ChatMembers from './MainBody/MainBody';

import './App.css'

import SocketCommunicationHandler from '../../services/SocketCommunicationHandler';

class App extends Component {
    componentDidMount() {
        SocketCommunicationHandler.emit('userWentOnline', {
            userId: this.props.currentMember.id
        });
    }

    render() {
        return (
            <div className="App">
                <Header />
                <ChatMembers />
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
