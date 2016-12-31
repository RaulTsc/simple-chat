// @flow

import React from 'react';
import {connect} from 'react-redux';

import {sendMessage} from '../../actions'

import './ChatInput.css'

let ChatInput = ({dispatch}) => {
    let input;

    let handleFormSubmit = e => {
        e.preventDefault();

        if (!input.value.trim()) return;

        dispatch(sendMessage(input.value))
        input.value = ''
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

ChatInput = connect()(ChatInput);

export default ChatInput;