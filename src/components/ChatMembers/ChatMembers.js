// @flow

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {getUsers, muteUser, muteUserMsgs} from '../../actions'
import './ChatMembers.css'

var Sidebar = require('react-sidebar').default;

var SidebarWrapper = React.createClass({
    getInitialState() {
        return {sidebarOpen: false, sidebarDocked: false};
    },

    onSetSidebarOpen: function (open) {
        this.setState({sidebarOpen: open});
    },

    componentWillMount: function () {
        var mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, sidebarDocked: mql.matches});
    },

    componentWillUnmount: function () {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    mediaQueryChanged: function () {
        this.setState({sidebarDocked: this.state.mql.matches});
    },

    muteToggle(user) {
        this.props.dispatch(muteUser(user));
        this.props.dispatch(muteUserMsgs(user.id));
    },

    render: function () {
        let sidebarContentStyle = {
            padding        : '16px',
            height         : '100%',
            backgroundColor: 'white',
            width          : '250px'
        };

        var sidebarContent = <div style={sidebarContentStyle}>
            <b style={{marginBottom: '20px'}}>Chat Members</b>

            <ul>
                {this.props.members.map(member => {
                        let boundFn = this.muteToggle.bind(this, member);

                        return (
                            <li className="chatMemberContainer" key={member.id}>
                                <div className="onlineIndicator"
                                     style={{visibility: member.isOnline ? 'visible' : 'hidden'}}></div>
                                <img alt="Avatar" src={member.avatar}/>
                                <p>{member.name}</p>
                                <button key={member.id} onClick={boundFn}
                                        style={{marginLeft: 'auto'}}>{member.isMuted ? 'Unmute' : 'Mute'}</button>
                            </li>
                        )
                    }
                )}
            </ul>
        </div>;

        return (
            <Sidebar sidebar={sidebarContent}
                     open={this.state.sidebarOpen}
                     docked={this.state.sidebarDocked}
                     onSetOpen={this.onSetSidebarOpen}>
            </Sidebar>
        );
    }
});

class ChatMembers extends React.Component {
    componentDidMount() {
        // Dispatch action to load all users
        this.props.dispatch(getUsers());
    }

    render() {
        // :( Sad. I know. Sidebar puts up a div overlay over the page and we need this
        // to make events pass through it
        setTimeout(() => {
            document.getElementsByClassName('App')[0].children[1].style.pointerEvents = 'none';
        }, 0);

        return (
            <SidebarWrapper style={{pointerEvents: 'none'}} members={this.props.members}
                            dispatch={this.props.dispatch}/>
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