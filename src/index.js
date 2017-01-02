// @flow

import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';

import {browserHistory, Router, Route} from 'react-router'

import Login from './components/Login/Login'
import App from './components/App/App';

import {withExampleBasename, requireAuth, notLoggedIn} from './helpers';

import './index.css';

import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

import reducer from './reducers';
const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={withExampleBasename(browserHistory, __dirname)}>
            <Route path="/login" component={Login} onEnter={notLoggedIn}/>
            <Route path="*" component={App} onEnter={requireAuth}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

