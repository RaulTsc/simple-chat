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
            let onlineMembers  = action.users.filter(user => user.isOnline === true);
            let offlineMembers = action.users.filter(user => user.isOnline === false);

            onlineMembers  = onlineMembers.sort(compare);
            offlineMembers = offlineMembers.sort(compare);

            let allMembers = onlineMembers.concat(offlineMembers).map(member => {
                member.isMuted = false;

                return member;
            });

            state = {
                ...state,
                allMembers: allMembers
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

            let onlineMembersOnlineUsers  = newAllMembers.filter(user => user.isOnline === true);
            let offlineMembersOnlineUsers = newAllMembers.filter(user => user.isOnline === false);

            onlineMembersOnlineUsers  = onlineMembersOnlineUsers.sort(compare);
            offlineMembersOnlineUsers = offlineMembersOnlineUsers.sort(compare);

            let allMembersOnlineUsers = onlineMembersOnlineUsers.concat(offlineMembersOnlineUsers).map(member => {
                member.isMuted = false;

                return member;
            });

            state = {
                ...state,
                allMembers: allMembersOnlineUsers
            };

            break;

        case 'MUTE_USER':
            let newAllMembersMuteUser = [];

            state.allMembers.forEach(member => {
                if (action.user.id === member.id) {
                    member.isMuted = !member.isMuted;
                }
                newAllMembersMuteUser.push(member);
            });

            state = {
                ...state,
                allMembers: newAllMembersMuteUser
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