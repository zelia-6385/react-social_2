import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ResultCodeForCuptchureEnum } from './../api/api';
import { ResultCodesEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import { FormAction, stopSubmit } from 'redux-form';
import { Action } from 'redux';

let initialState = {
  userId: null as number | null,
  email: '' as string | null,
  login: '' as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'SH/AUTH/SET-USER-DATA': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'SH/AUTH/GET-CAPTCHA-URL-SUCCESS': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
  ) =>
    ({
      type: 'SH/AUTH/SET-USER-DATA',
      payload: {
        userId,
        email,
        login,
        isAuth,
      },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: 'SH/AUTH/GET-CAPTCHA-URL-SUCCESS',
      payload: {
        captchaUrl,
      },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.me();

  if (data.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
  async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCuptchureEnum.CaptureIsRequired) {
        dispatch(getCaptchaUrl());
      }

      let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaUrl();

  const captchaUrl = data.url;

  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch: any) => {
  let response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
