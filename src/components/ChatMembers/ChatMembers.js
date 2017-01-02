// @flow

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {getUsers} from '../../actions'
import './ChatMembers.css'

class ChatMembers extends React.Component {
    componentDidMount() {
        // Dispatch action to load all users
        this.props.dispatch(getUsers());
    }

    render() {
        return (
            <div className="chatMembers">
                <ul>
                    {this.props.members.map(member =>
                        <li className="chatMemberContainer" key={member.id}>
                            <img alt="Avatar" src={member.avatar}/>
                            <p>{member.name}</p>
                        </li>
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