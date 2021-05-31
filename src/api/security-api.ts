import { instance } from './api';

type GetCaptureUrlResponseType = {
  url: string;
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptureUrlResponseType>(`security/get-captcha-url`)
      .then((response) => response.data);
  },
};
