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

        let userIsTyping = <span>{this.props.userIsTyping.userData.name} is typing...</span>;

        return (
            <p style={styles.isTypingParagraph}>
                {this.props.userIsTyping.isTyping ? userIsTyping : null}
            </p>
        );
    }
}

UserTyping.propTypes = {
    userIsTyping: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userIsTyping: state.members.userIsTyping
    }
};

UserTyping = connect(
    mapStateToProps
)(UserTyping);

export default UserTyping;