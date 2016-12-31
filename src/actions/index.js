let msgId = 0;

export const sendMessage = (text) => ({
    id  : msgId++,
    type: 'SEND_MSG',
    text
});