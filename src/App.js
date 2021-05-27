import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

// import App from './App';
import store from './redux/redux-store';
// import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withSuspense } from './hoc/withSuspense';

// import { render } from '@testing-library/react';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
  catchAllUnhandleErrors = (promiseRejectionEvent) => {
    alert('some error occured');
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
            <Route path="/users" render={() => <UsersContainer pageTitle={'Самураи'} />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {
    initializeApp,
  }),
)(App);

// export default compose(
//     withRouter,
//     connect(mapStateToProps, {
//         initializeApp,
//     }),
// )(App);

// let SamuraiJSApp = (props) => {
//     return (
//         <HashRouter>
//             <Provider store={store}>
//                 <AppContainer />
//             </Provider>
//         </HashRouter>
//     );
// };

let SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SamuraiJSApp;
