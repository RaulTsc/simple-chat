// @flow

import members, {compare} from '../members';

describe('state', () => {
    it('should be unchanged when an invalid action is dispatched', () => {
        let newState = members(
            {
                currentMember: {},
                allMembers   : []
            },
            {
                type: 'INVALID_ACTION'
            }
        );

        expect(newState.allMembers.length).toBe(0);
        expect(newState.currentMember).toEqual({});
    });

    it('should update the current member when CREATE_USER_REQUEST is dispatched', () => {
        let mockUser = {
            id    : '12345678',
            name  : 'Mock User',
            avatar: 'someUrl'
        };
        let newState = members(
            {
                currentMember: {},
                allMembers   : []
            },
            {
                type: 'CREATE_USER_REQUEST',
                user: mockUser
            }
        );

        expect(newState.currentMember).toEqual(mockUser);
    });

    it('should update the user list when GET_USERS_REQUEST_SUCCESS is dispatched', () => {
        // mockUsers[0] is the currentMember so he is ALWAYS online
        let mockUsers = [
            {
                id      : '1',
                name    : 'Mock User',
                avatar  : 'someUrl',
                isOnline: false
            },
            {
                id      : '2',
                name    : 'Mock Uses',
                avatar  : 'someUrl',
                isOnline: false
            },
            {
                id      : '3',
                name    : 'Mock Usez',
                avatar  : 'someUrl',
                isOnline: true
            },
            {
                id      : '4',
                name    : 'Mock Uses',
                avatar  : 'someUrl',
                isOnline: true
            }
        ];

        let newState = members(
            {
                currentMember: mockUsers[0],
                allMembers   : []
            },
            {
                type : 'GET_USERS_REQUEST_SUCCESS',
                users: mockUsers
            }
        );

        expect(newState.allMembers.length).toBe(4);

        // They are properly ordered
        expect(newState.allMembers[0]).toEqual(mockUsers[0]);
        expect(newState.allMembers[1]).toEqual(mockUsers[3]);
        expect(newState.allMembers[2]).toEqual(mockUsers[2]);
        expect(newState.allMembers[3]).toEqual(mockUsers[1]);
    });

    it('should update the online users when ONLINE_USERS is dispatched', () => {
        let mockUsers = [
            {
                id      : '1',
                name    : 'Mock User',
                avatar  : 'someUrl',
                isOnline: false
            },
            {
                id      : '2',
                name    : 'Mock Uses',
                avatar  : 'someUrl',
                isOnline: false
            },
            {
                id      : '3',
                name    : 'Mock Usez',
                avatar  : 'someUrl',
                isOnline: true
            },
            {
                id      : '4',
                name    : 'Mock Uses',
                avatar  : 'someUrl',
                isOnline: true
            }
        ];

        let newState = members(
            {
                currentMember: mockUsers[0],
                allMembers   : mockUsers
            },
            {
                type : 'ONLINE_USERS',
                users: [
                    {
                        userId: '1'
                    },
                    {
                        userId: '4'
                    },
                ]
            }
        );

        expect(newState.allMembers[0]).toEqual(mockUsers[0]);
        expect(newState.allMembers[0].isOnline).toBe(true);

        expect(newState.allMembers[1]).toEqual(mockUsers[3]);
        expect(newState.allMembers[1].isOnline).toBe(true);

        expect(newState.allMembers[2]).toEqual(mockUsers[1]);
        expect(newState.allMembers[2].isOnline).toBe(false);

        expect(newState.allMembers[3]).toEqual(mockUsers[2]);
        expect(newState.allMembers[3].isOnline).toBe(false);
    });

    it('should update userIsTyping when USER_IS_TYPING is dispatched', () => {
        let prevState  = undefined;
        let mockAction = {
            type: 'USER_IS_TYPING',
            data: {
                userName: 'Raul Tomescu',
                userId  : '12345678'
            }
        };
        let newState   = members(prevState, mockAction);

        expect(newState.usersTyping.length).toBe(1);
        expect(newState.usersTyping[0]).toEqual(mockAction.data);
    });

    it('should update userIsTyping when USER_IS_NOT_TYPING is dispatched', () => {
        let prevState        = undefined;
        let mockActionTyping = {
            type: 'USER_IS_TYPING',
            data: {
                userName: 'Raul Tomescu',
                userId  : '12345678'
            }
        };
        let newState         = members(prevState, mockActionTyping);

        expect(newState.usersTyping.length).toBe(1);
        expect(newState.usersTyping[0]).toEqual(mockActionTyping.data);

        let mockActionNotTyping = {
            type: 'USER_IS_NOT_TYPING',
            data: {
                userName: 'Raul Tomescu',
                userId  : '12345678'
            }
        };
        let newNewState         = members(newState, mockActionNotTyping);

        expect(newNewState.usersTyping.length).toBe(0);
    });
});

describe('compare', () => {
    it('should correctly compare two names of users', () => {
        let result = compare(
            {
                id    : '12345678',
                name  : 'Raul Tomescu',
                avatar: 'someUrl'
            },
            {
                id    : '87654321',
                name  : 'Raul Popescu',
                avatar: 'someUrl'
            }
        );
        expect(result).toBe(1);

        result = compare(
            {
                id    : '87654321',
                name  : 'Raul Popescu',
                avatar: 'someUrl'
            },
            {
                id    : '12345678',
                name  : 'Raul Tomescu',
                avatar: 'someUrl'
            }
        );
        expect(result).toBe(-1);

        result = compare(
            {
                id    : '87654321',
                name  : 'Raul Popescu',
                avatar: 'someUrl'
            },
            {
                id    : '87654321',
                name  : 'Raul Popescu',
                avatar: 'someUrl'
            }
        );
        expect(result).toBe(0);
    });

    it('should mute users when a MUTE_USER is dispatched', () => {
        let mockUsers = [
            {
                id      : '1',
                name    : 'Mock User',
                avatar  : 'someUrl',
                isOnline: false,
                isMuted : false
            },
            {
                id      : '2',
                name    : 'Mock Uses',
                avatar  : 'someUrl',
                isOnline: false,
                isMuted : false
            }
        ];

        let newState = members(
            {
                currentMember: mockUsers[0],
                allMembers   : mockUsers
            },
            {
                type: 'MUTE_USER',
                user: mockUsers[0]
            }
        );
        expect(newState.allMembers[0].isMuted).toBe(true);

        newState = members(
            {
                currentMember: mockUsers[0],
                allMembers   : mockUsers
            },
            {
                type: 'MUTE_USER',
                user: mockUsers[0]
            }
        );
        expect(newState.allMembers[0].isMuted).toBe(false);
    });

    it('should update the currentMember on any action', () => {
        let mockUser = {
            id    : '12345678',
            name  : 'Mock User',
            avatar: 'someUrl'
        };

        localStorage.token         = mockUser.id;
        localStorage.currentMember = JSON.stringify(mockUser);

        let newState = members(
            {
                currentMember: {},
                allMembers   : []
            },
            {
                type: 'INVALID_ACTION'
            }
        );

        expect(newState.currentMember).toEqual(mockUser);
    });
});