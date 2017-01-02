// @flow

import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router';

import auth from '../../auth';
import {createUser} from '../../actions'

import './Login.css'

let Login = ({dispatch}) => {
    const responseFacebook = (response) => {
        const user = {
            name  : response.name,
            id    : response.id,
            avatar: response.picture.data.url
        };

        auth.login(user);
        dispatch(createUser(user));

        browserHistory.push('/');
    };

    return (
        <div className="loginButtonWrapper">
            <FacebookLogin
                appId="371359853214253"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}/>
        </div>
    )
};

Login = connect()(Login);

export default Login;