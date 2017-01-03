// @flow

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {sendMessage} from '../../actions'

import io from 'socket.io-client';
const socket = io.connect();

import './ChatInput.css'

class ChatInput extends React.Component {
    input: Object

    constructor(props) {
        super(props);

        socket.on('chat message', (msg) => {
            this.props.dispatch(sendMessage(msg));
        });

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        if (!this.input.value.trim()) return;
        socket.emit('chat message', {
            text    : this.input.value.trim(),
            fromName: this.props.currentMember.name,
            fromId  : this.props.currentMember.id
        });
        this.input.value = '';
    }

    render() {
        return (
            <div className="inputWrapper">
                <form className="form" onSubmit={this.handleFormSubmit}>
                    <input className="input" ref={node => {
                        this.input = node
                    }}/>

                    <button className="button" type="submit">Send</button>
                </form>
            </div>
        );
    }
}

ChatInput.propTypes = {
    currentMember: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        currentMember: state.members.currentMember
    }
};

ChatInput = connect(
    mapStateToProps
)(ChatInput);

export default ChatInput;