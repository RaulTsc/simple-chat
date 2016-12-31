// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import {browserHistory, Router, Route} from 'react-router'

import Login from './components/Login/Login'
import App from './components/App/App';

import {withExampleBasename, requireAuth, notLoggedIn} from './helpers';

import './index.css';

ReactDOM.render(
    <Router history={withExampleBasename(browserHistory, __dirname)}>
        <Route path="/login" component={Login} onEnter={notLoggedIn}/>
        <Route path="*" component={App} onEnter={requireAuth}/>
    </Router>,
    document.getElementById('root')
);

