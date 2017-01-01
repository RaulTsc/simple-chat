// @flow

// React-router stuff
import useBasename from 'history/lib/useBasename'

// Handles login logic
export const auth = {
    loggedIn: () => {
        return !!localStorage.token;
    },

    login: (userInfo) => {
        // Make http register request

        localStorage.token = userInfo.id;
    },

    logout: () => {
        // Not implemented at this point :)
    }
};

// Redirect to /login when trying to access anything and not logged in
export const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state   : {nextPathname: nextState.location.pathname}
        })
    }
};

// Redirect to / when trying to access /login and is already logged in
export const notLoggedIn = (nextState, replace) => {
    if (auth.loggedIn()) {
        replace({
            pathname: '/',
            state   : {nextPathname: nextState.location.pathname}
        })
    }
};

// React-router stuff
export const withExampleBasename = (history) => {
    return useBasename(() => history)({basename: ``})
};