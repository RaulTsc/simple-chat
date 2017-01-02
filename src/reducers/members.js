// @flow

function compare(a, b) {
    var splitA = a.name.split(" ");
    var splitB = b.name.split(" ");
    var lastA  = splitA[splitA.length - 1];
    var lastB  = splitB[splitB.length - 1];

    if (lastA < lastB) return -1;
    if (lastA > lastB) return 1;
    return 0;
}

const members = (state = {currentMember: {}, allMembers: []}, action) => {
    let onlineMembers;
    let offlineMembers;

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
            onlineMembers  = action.users.filter(user => user.isOnline === true);
            offlineMembers = action.users.filter(user => user.isOnline === false);

            onlineMembers = onlineMembers.sort(compare);
            offlineMembers = offlineMembers.sort(compare);

            state = {
                ...state,
                allMembers: onlineMembers.concat(offlineMembers)
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

            let onlineMembers  = newAllMembers.filter(user => user.isOnline === true);
            let offlineMembers = newAllMembers.filter(user => user.isOnline === false);

            onlineMembers = onlineMembers.sort(compare);
            offlineMembers = offlineMembers.sort(compare);

            state = {
                ...state,
                allMembers: onlineMembers.concat(offlineMembers)
            };

            break;

        default:
        // Do nothing
    }

    if (localStorage.token) {
        state.currentMember = JSON.parse(localStorage.currentMember)
    }

    return state;
};

export default members