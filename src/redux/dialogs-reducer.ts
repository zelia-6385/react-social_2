import { InferActionsTypes } from './redux-store';
const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
  id: number;
  name: string;
};

type MessageType = {
  id: number;
  message: string;
};

let initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Buy' },
    { id: 3, message: 'Welcome' },
  ] as Array<MessageType>,

  dialogs: [
    { id: 1, name: 'Dima' },
    { id: 2, name: 'Sasha' },
    { id: 3, name: 'Victor' },
    { id: 4, name: 'Andrey' },
    { id: 5, name: 'Sveta' },
  ] as Array<DialogType>,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: state.dialogs.length++, message: body }],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: SEND_MESSAGE,
      newMessageBody,
    } as const),
};

export default dialogsReducer;
