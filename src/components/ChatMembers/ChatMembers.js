// @flow

import React, {PropTypes} from 'react'

import './ChatMembers.css'

const ChatMembers = ({members}) => {
    console.log(members);

    return (
        <div className="chatMembers">
            <ul>
                {members.map(member =>
                    <p key={member.id}>{member.name}</p>
                )}
            </ul>
        </div>
    )
};

ChatMembers.propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape({
        id    : PropTypes.string.isRequired,
        name  : PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default ChatMembers;