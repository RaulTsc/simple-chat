const messages = (state = [], action) => {
    switch (action.type) {
        case 'SEND_MSG':
            state = [
                ...state,
                {
                    id  : action.id,
                    text: action.text
                }
            ];
            break;

        default:
        // Do nothing
    }

    return state;
};

export default messages