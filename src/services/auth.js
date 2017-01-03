// @flow

// Handles login logic
export default {
    loggedIn: () => {
        return !!localStorage.token;
    },

    login: (userInfo: Object) => {
        localStorage.token = userInfo.id;
        localStorage.currentMember = JSON.stringify(userInfo);
    }
};