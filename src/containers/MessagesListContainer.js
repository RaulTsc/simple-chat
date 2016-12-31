// @flow

import {connect} from 'react-redux'
import MessagesList from '../components/MessagesList/MessagesList'

const mapStateToProps = (state) => ({
    messages: state.messages
});

const MessagesListContainer = connect(
    mapStateToProps
)(MessagesList);

export default MessagesListContainer;