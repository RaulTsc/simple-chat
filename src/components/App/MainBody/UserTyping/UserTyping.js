// @flow

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import './UserTyping.css'

class UserTyping extends React.Component {
    render() {
        const styles = {
            isTypingParagraph: {
                textAlign: 'right',
                marginRight: '30px',
                height: '20px'
            }
        };

        let userIsTypingText;

        console.log('I was called!');

        switch(this.props.usersTyping.length) {
            case 0:
                // Do nothing
                break;

            case 1:
                userIsTypingText = <span>{this.props.usersTyping[0].userName} is typing...</span>;
                break;

            case 2:
                userIsTypingText = <span>{this.props.usersTyping[0].userName} & {this.props.usersTyping[1].userName} are typing...</span>;
                break;

            default:
                userIsTypingText = <span>{this.props.usersTyping[0].userName} & {this.props.usersTyping[1].userName} & {this.props.usersTyping.length - 2} others are typing...</span>;
                break;
        }

        return (
            <p style={styles.isTypingParagraph}>
                {this.props.usersTyping.length > 0 ? userIsTypingText : null}
            </p>
        );
    }
}

UserTyping.propTypes = {
    usersTyping: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        usersTyping: state.members.usersTyping
    }
};

UserTyping = connect(
    mapStateToProps
)(UserTyping);

export default UserTyping;