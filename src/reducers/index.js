// @flow

import {combineReducers} from 'redux'

import messages from './messages'
import members from './members'

const simpleChat = combineReducers({
    messages,
    members
});

export default simpleChat