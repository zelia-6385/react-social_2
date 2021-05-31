import { instance, ResultCodesEnum, ResultCodeForCuptchureEnum, ApiResponseType } from './api';

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

export const authAPI = {
  me() {
    return instance
      .get<ApiResponseType<MeResponseDataType>>(`auth/me`)
      .then((response) => response.data);
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance
      .post<ApiResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCuptchureEnum>>(
        `auth/login`,
        {
          email,
          password,
          rememberMe,
          captcha,
        },
      )
      .then((resp) => resp.data);
  },

  logout() {
    return instance.delete(`auth/login`);
  },
};
