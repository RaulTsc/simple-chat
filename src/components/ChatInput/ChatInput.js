// @flow

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {sendMessage} from '../../actions'

import io from 'socket.io-client';
const socket = io.connect();

import './ChatInput.css'

const mapStateToProps = (state) => {
    state.members = [
        {
            id    : '1',
            name  : 'Raul Tomescu',
            avatar: ''
        }
    ];
    return {
        members: state.members
    }
};


let ChatInput = ({dispatch, members}) => {
    let input;

    console.log(members);

    socket.on('chat message', (msg) => {
        dispatch(sendMessage(msg));
    });

    let handleFormSubmit = (e) => {
        e.preventDefault();

        if (!input.value.trim()) return;

        socket.emit('chat message', input.value.trim());

        input.value = '';
    };

    return (
        <div className="inputWrapper">
            <form className="form" onSubmit={handleFormSubmit}>
                <input className="input" ref={node => {
                    input = node
                }}/>

                <button className="button" type="submit">Send</button>
            </form>
        </div>
    )
};

ChatInput.propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape({
        id    : PropTypes.string.isRequired,
        name  : PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired).isRequired
};

ChatInput = connect(
    mapStateToProps
)(ChatInput);

export default ChatInput;