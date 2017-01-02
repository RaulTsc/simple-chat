// @flow

import {connect} from 'react-redux'
import ChatMembers from '../components/ChatMembers/ChatMembers'

const mapStateToProps = (state) => {
    return {
        members: state.members.allMembers
    }
};

const MessagesListContainer = connect(
    mapStateToProps
)(ChatMembers);

export default MessagesListContainer;