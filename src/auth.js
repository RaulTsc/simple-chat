// @flow

// Handles login logic
export default {
    loggedIn: () => {
        return !!localStorage.token;
    },

    login: (userInfo: Object) => {
        // Make http register request

        localStorage.token = userInfo.id;
        localStorage.currentMember = JSON.stringify(userInfo);
    },

    logout: () => {
        // Not implemented at this point :)
    }
};