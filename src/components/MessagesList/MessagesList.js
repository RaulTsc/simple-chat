// @flow

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import './MessagesList.css'

let MessagesList = ({messages}) => (
    <ul className="chat">
        {messages.map(message =>
            <p key={message.id}>{message.from}: {message.text}</p>
        )}
    </ul>
);

MessagesList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired
    }).isRequired).isRequired
};

const mapStateToProps = (state) => ({
    messages: state.messages
});

MessagesList = connect(
    mapStateToProps
)(MessagesList);

export default MessagesList