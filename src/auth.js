// @flow

import {browserHistory} from 'react-router';

// Handles login logic
export default {
    loggedIn: () => {
        return !!localStorage.token;
    },

    login: (userInfo) => {
        // Make http register request

        localStorage.token = userInfo.id;

        browserHistory.push('/');
    },

    logout: () => {
        // Not implemented at this point :)
    }
};