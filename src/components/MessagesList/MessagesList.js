// @flow

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {getMessages} from '../../actions'

import './MessagesList.css'

class MessagesList extends React.Component {
    componentDidMount() {
        // Dispatch action to load all users
        this.props.dispatch(getMessages());
    }

    componentDidUpdate() {
        let chat = document.getElementsByClassName('chat')[0];
        chat.scrollTop = chat.scrollHeight;
    }

    render() {
        return (
            <ul className="chat">
                {this.props.messages.map(message =>
                    <p key={message.id}>{message.fromName}: <strong>{message.text}</strong></p>
                )}
            </ul>
        );
    }
}

MessagesList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    messages: state.messages.messages
});

MessagesList = connect(
    mapStateToProps
)(MessagesList);

export default MessagesList