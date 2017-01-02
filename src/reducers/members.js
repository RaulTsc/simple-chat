// @flow

const members = (state = {currentMember:{}, allMembers:[]}, action) => {
    switch (action.type) {
        case 'USER_CREATED':
            const newMember = {
                id    : action.id,
                name  : action.name,
                avatar: action.avatar
            };

            state = {
                currentMember: newMember,
                allMembers   : [
                    ...state.allMembers,
                    newMember
                ]
            };

            console.log(state);

            break;

        default:
        // Do nothing
    }

    return state;
};

export default members