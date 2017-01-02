// @flow

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {getUsers, muteUser, muteUserMsgs} from '../../actions'
import './ChatMembers.css'

class ChatMembers extends React.Component {
    componentDidMount() {
        // Dispatch action to load all users
        this.props.dispatch(getUsers());
    }

    muteToggle(user) {
        this.props.dispatch(muteUser(user));
        this.props.dispatch(muteUserMsgs(user.id));
    }

    render() {
        return (
            <div className="chatMembers">
                <ul>
                    {this.props.members.map(member => {
                            let boundFn = this.muteToggle.bind(this, member);

                            return (
                                <li className="chatMemberContainer" key={member.id}>
                                    <div className="onlineIndicator"
                                         style={{visibility: member.isOnline ? 'visible' : 'hidden'}}></div>
                                    <img alt="Avatar" src={member.avatar}/>
                                    <p>{member.name}</p>
                                    <button key={member.id} onClick={boundFn} style={{marginLeft: 'auto'}}>{member.isMuted ? 'Unmute' : 'Mute'}</button>
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
        );
    }
}

ChatMembers.propTypes = {
    members : PropTypes.arrayOf(PropTypes.shape({
        id    : PropTypes.string.isRequired,
        name  : PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired).isRequired,
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        members: state.members.allMembers
    }
};

ChatMembers = connect(
    mapStateToProps
)(ChatMembers);

export default ChatMembers;