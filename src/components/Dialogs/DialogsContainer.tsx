// import React from 'react';
import { connect } from 'react-redux';

import { actions } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import React from 'react';

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const { sendMessage } = actions;

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    sendMessage,
  }),
  withAuthRedirect,
)(Dialogs);
