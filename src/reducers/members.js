// @flow

const members = (state = {currentMember: {}, allMembers: []}, action) => {
    switch (action.type) {
        case 'CREATE_USER_REQUEST':
            state = {
                ...state,
                currentMember: {
                    id    : action.user.id,
                    name  : action.user.name,
                    avatar: action.user.avatar
                }
            };
            break;

        case 'GET_USERS_REQUEST_SUCCESS':
            state = {
                ...state,
                allMembers: action.users
            };
            break;

        case 'ONLINE_USERS':
            let newAllMembers = [];

            state.allMembers.forEach(member => {
                member.isOnline = false;

                action.users.forEach(user => {
                    if (member.id === user.userId) {
                        member.isOnline = true;
                    }
                });

                newAllMembers.push(member);
            });

            state = {
                ...state,
                allMembers: newAllMembers
            };

            break;

        default:
        // Do nothing
    }

    if (localStorage.token) {
        state.currentMember = JSON.parse(localStorage.currentMember);
    }

    return state;
};

export default members