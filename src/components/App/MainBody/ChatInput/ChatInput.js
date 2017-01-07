// @flow

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import SocketCommunicationHandler from '../../../../services/SocketCommunicationHandler';

import './ChatInput.css'

class ChatInput extends React.Component {
    input: Object

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onInputChange    = this.onInputChange.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        if (!this.input.value.trim()) return;

        SocketCommunicationHandler.emit('chat message', {
            text    : this.input.value.trim(),
            fromName: this.props.currentMember.name,
            fromId  : this.props.currentMember.id
        });

        SocketCommunicationHandler.emit('userIsNotTyping', {
            fromName: this.props.currentMember.name,
            fromId  : this.props.currentMember.id
        });

        this.input.value = '';
    }

    onInputChange(e) {
        e.preventDefault();

        if (e.target.value.trim() !== '') {
            SocketCommunicationHandler.emit('userIsTyping', {
                fromName: this.props.currentMember.name,
                fromId  : this.props.currentMember.id
            });
        } else {
            SocketCommunicationHandler.emit('userIsNotTyping', {
                fromName: this.props.currentMember.name,
                fromId  : this.props.currentMember.id
            });
        }
    }

    render() {
        return (
            <div className="inputWrapper">
                <form className="form" onSubmit={this.handleFormSubmit}>
                    <input onChange={this.onInputChange} className="input" ref={node => {
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