// @flow

import messages from '../messages';
import {shouldDisplayMessage} from '../messages';

describe('state', () => {
    it('should be the same for invalid actions', () => {
        let newState = messages({
            messages  : [],
            mutedUsers: []
        }, {
            type: 'INVALID_ACTION'
        });

        expect(newState.messages.length).toBe(0);
        expect(newState.mutedUsers.length).toBe(0);
    });

    it('should add a message in the state when a SEND_MSG is dispatched', () => {
        let newState = messages({
            messages  : [],
            mutedUsers: []
        }, {
            type    : 'SEND_MSG',
            id      : 0,
            fromId  : '12345678',
            fromName: 'Raul Tomescu',
            text    : 'First message'
        });

        expect(newState.messages.length).toBe(1);
    });

    it('should mute a user when a MUTE_USER_MSGS is dispatched', () => {
        let newState = messages({
            messages  : [],
            mutedUsers: []
        }, {
            type  : 'MUTE_USER_MSGS',
            userId: '12345678'
        });

        expect(newState.mutedUsers.length).toBe(1);
    });

    it('should mute and then unmute a user when two MUTE_USER_MSGS actions are dispatched for the same userId', () => {
        let stateAfterFirstAction = messages({
            messages  : [],
            mutedUsers: []
        }, {
            type  : 'MUTE_USER_MSGS',
            userId: '12345678'
        });
        expect(stateAfterFirstAction.mutedUsers.length).toBe(1);

        let stateAfterSecondAction = messages(stateAfterFirstAction, {
            type  : 'MUTE_USER_MSGS',
            userId: '12345678'
        });
        expect(stateAfterSecondAction.mutedUsers.length).toBe(0);
    });

    it('should update msgs when a GET_MSGS_REQUEST_SUCCESS is dispatched', () => {
        let newState = messages({
            messages  : [],
            mutedUsers: []
        }, {
            type: 'GET_MSGS_REQUEST_SUCCESS',
            msgs: [
                {
                    fromId  : '12345678',
                    fromName: 'Raul Tomescu',
                    text    : 'First message'
                },
                {
                    fromId  : '12345678',
                    fromName: 'Raul Tomescu',
                    text    : 'Second message'
                }
            ]
        });

        expect(newState.messages.length).toBe(2);
    });
});

describe('shouldDisplayMessage', () => {
    it('should return false if id is in array', () => {
        expect(shouldDisplayMessage(['12345678', '8372871383'], '12345678')).toBe(false);
    });

    it('should return true if id is not in array', () => {
        expect(shouldDisplayMessage(['87654321', '8372871383'], '12345678')).toBe(true);
    });
});
