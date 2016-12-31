import {combineReducers} from 'redux'

import messages from './messages'

const simpleChat = combineReducers({
    messages
});

export default simpleChat