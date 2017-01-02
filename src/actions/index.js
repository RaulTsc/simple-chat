let msgId = 0;

export const sendMessage = (text) => ({
    id  : msgId++,
    type: 'SEND_MSG',
    text
});

export const createUser = (user) => ({
    id    : user.id,
    type  : 'USER_CREATED',
    name  : user.name,
    avatar: user.avatar
});