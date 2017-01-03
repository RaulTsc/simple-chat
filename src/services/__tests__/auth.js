// @flow

import auth from '../auth';

describe('auth.loggedIn()', () => {
    it('should return false initially', () => {
        expect(auth.loggedIn()).toEqual(false);
    });

    it('should return true after calling .login()', () => {
        let mockUser = {
            id    : '12345678',
            name  : 'Mock User',
            avatar: 'someUrl'
        };
        auth.login(mockUser);
        expect(auth.loggedIn()).toEqual(true);
    });
});

describe('auth.login()', () => {
    it('should set a token on localStorage', () => {
        let mockUser = {
            id    : '12345678',
            name  : 'Mock User',
            avatar: 'someUrl'
        };
        auth.login(mockUser);
        expect(localStorage.token).toEqual(mockUser.id)
    });

    it(`should set the logged in user's info on localStorage`, () => {
        let mockUser = {
            id    : '12345678',
            name  : 'Mock User',
            avatar: 'someUrl'
        };
        auth.login(mockUser);

        let localStorageData = JSON.parse(localStorage.currentMember);

        expect(localStorageData.id).toEqual(mockUser.id);
        expect(localStorageData.name).toEqual(mockUser.name);
        expect(localStorageData.avatar).toEqual(mockUser.avatar);
    });
});
