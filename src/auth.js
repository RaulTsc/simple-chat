// @flow

// Handles login logic
export default {
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