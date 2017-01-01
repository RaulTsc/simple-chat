// @flow

import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

import {auth} from '../../helpers';

import './Login.css'

class Login extends Component {
    responseFacebook(response) {
        auth.login({
            name  : response.name,
            id    : response.id,
            avatar: response.picture.data.url
        });
    }

    render() {
        return (
            <div className="loginButtonWrapper">
                <FacebookLogin
                    appId="371359853214253"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={this.responseFacebook}/>
            </div>
        )
    }
}

export default Login;