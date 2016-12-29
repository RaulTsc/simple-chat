// @flow

import React, {Component} from 'react';

import './App.css';

class ChatMembers extends Component {
    render() {
        return (
            <div className="chatMembers">
                <ul>
                    <li>Member 1</li>
                    <li>Member 2</li>
                    <li>Member 3</li>
                </ul>
            </div>
        );
    }
}

class MainChat extends Component {
    render() {
        return (
            <div>
                <div className="chat"></div>

                <div className="inputWrapper">
                    <input type="text" className="input"/>
                    <button className="button">Submit</button>
                </div>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="header">
                    <h2>Simple Chat</h2>
                </div>

                <ChatMembers />

                <MainChat />
            </div>
        );
    }
}

export default App;
