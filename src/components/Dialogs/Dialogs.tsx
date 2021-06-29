import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import styles from './Dialogs.module.css';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { InitialStateType } from '../../redux/dialogs-reducer';

type PropsType = {
  dialogsPage: InitialStateType;
  sendMessage: (messageText: string) => void;
};

type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Dialogs: React.FC<PropsType> = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((elem) => (
    <DialogItem name={elem.name} id={elem.id} key={elem.id} />
  ));

  let messagesElements = state.messages.map((elem) => (
    <Message message={elem.message} key={elem.id} />
  ));

  const addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>{dialogsElements}</div>
      <div className={styles.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValueKeyType = Extract<keyof NewMessageFormValuesType, string>;
type MessageFormOwnProps = {};

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, MessageFormOwnProps> & MessageFormOwnProps
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMessageFormValueKeyType>(
          'Enter your message',
          'newMessageBody',
          [required, maxLength50],
          Textarea,
        )}
        {/* <Field
          component={Textarea}
          validate={[required, maxLength50]}
          name="newMessageBody"
          placeholder="Enter your messages"
        /> */}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm);

export default Dialogs;
