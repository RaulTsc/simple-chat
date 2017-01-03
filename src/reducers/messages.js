// @flow

const shouldDisplayMessage = (mutedUsers, userId) => {
    return mutedUsers.filter(x => x === userId).length === 0;
};

const messages = (state = {messages: [], mutedUsers: []}, action) => {
    switch (action.type) {
        case 'SEND_MSG':
            debugger;
            if (shouldDisplayMessage(state.mutedUsers, action.fromId)) {
                state = {
                    ...state,
                    messages: [
                        ...state.messages,
                        {
                            id      : action.id,
                            text    : action.text,
                            fromName: action.fromName
                        }
                    ]
                };
            }

            break;

        case 'MUTE_USER_MSGS':
            if (state.mutedUsers.indexOf(action.userId) === -1) {
                state.mutedUsers.push(action.userId);
            } else {
                state.mutedUsers = state.mutedUsers.splice(action.userId, 1);
            }

            break;

        case 'GET_MSGS_REQUEST_SUCCESS':
            state = {
                ...state,
                messages: action.msgs
            };

            break;

        default:
        // Do nothing
    }

    return state;
};

export default messages