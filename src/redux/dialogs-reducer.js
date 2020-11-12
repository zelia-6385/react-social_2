const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Buy' },
        { id: 3, message: 'Welcome' },
    ],

    dialogs: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Sasha' },
        { id: 3, name: 'Victor' },
        { id: 4, name: 'Andrey' },
        { id: 5, name: 'Sveta' },
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }],
            };
        }
        default:
            return state;
    }
};

export const sendMessage = (newMessageBody) => ({
    type: SEND_MESSAGE,
    newMessageBody,
});

export default dialogsReducer;
