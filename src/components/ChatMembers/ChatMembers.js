// @flow

import React, {Component} from 'react';

import './ChatMembers.css'

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
        )
    }
}

export default ChatMembers;