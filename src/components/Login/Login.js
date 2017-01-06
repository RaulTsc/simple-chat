// @flow

import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router';

import Header from '../Header/Header';
import auth from '../../services/auth';
import {createUser} from '../../actions';

import './Login.css'

let Login = ({dispatch}) => {
    const responseFacebook = (response) => {
        const user = {
            name  : response.name,
            id    : response.id,
            avatar: response.picture.data.url,
            email : response.email
        };

        auth.login(user);
        dispatch(createUser(user));

        browserHistory.push('/');
    };

    return (
        <div style={{textAlign: 'center'}}>
            <Header />
            <div className="loginButtonWrapper">
                <FacebookLogin
                    appId="371359853214253"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}/>
            </div>
        </div>
    )
};

Login = connect()(Login);

export default Login;