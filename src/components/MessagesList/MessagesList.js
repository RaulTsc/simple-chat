// @flow

import React, {PropTypes} from 'react'

import './MessagesList.css'

const MessagesList = ({messages}) => (
    <ul className="chat">
        {messages.map(message =>
            <p key={message.id}>{message.text}</p>
        )}
    </ul>
);

MessagesList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default MessagesList