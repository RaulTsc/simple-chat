// @flow

import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

import './Login.css'

const componentClicked = () => {};
const responseFacebook = (response) => {
    console.log(response);
};

class Login extends Component {
    render() {
        return (
            <div className="loginButtonWrapper">
                <FacebookLogin
                    appId="371359853214253"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook} />
            </div>
        )
    }
}

export default Login;