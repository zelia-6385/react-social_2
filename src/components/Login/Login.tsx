import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Input, createField, GetStringKeys } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { login } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from '../common/FormsControls/FormControls.module.css';
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
      {/* <div>
                <Field
                    placeholder={'Email'}
                    name={'email'}
                    validate={[required]}
                    component={Input}
                />
            </div> */}
      {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {
        type: 'password',
      })}
      {createField<LoginFormValuesTypeKeys>(
        undefined,
        'rememberMe',
        null,
        Input,
        { type: 'checkbox' },
        'remember me',
      )}
      {/* <div>
                <Field
                    placeholder={'Password'}
                    name={'password'}
                    validate={[required]}
                    component={Input}
                    type={'password'}
                />
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'} /> запомнить
                пользователя
            </div> */}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input)}
      {error && <div className={styles.form_summary_error}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login',
})(LoginForm);

type MapStatePropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};

type MapDiapatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

// type LoginFormValuesTypeKeys = keyof LoginFormValuesType;
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: React.FC<MapStatePropsType & MapDiapatchPropsType> = (props) => {
  const onSubmit = ({ email, password, rememberMe, captcha }: LoginFormValuesType) => {
    props.login(email, password, rememberMe, captcha);
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
  login,
})(Login);
