import { ProfileType } from './../types/types';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '8e25139e-418c-4a7e-b3bb-d845fe96ea35',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
  getProfile(userId: number) {
    console.warn('obsolete method. Please use profileAPI object');
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },

  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId);
  },

  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },

  savePhoto(photoFile: any) {
    let formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCuptchureEnum {
  CaptureIsRequired = 10,
}

type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodesEnum | ResultCodeForCuptchureEnum;
  messages: Array<string>;
};

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((response) => response.data);
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((resp) => resp.data);
  },

  logout() {
    return instance.delete(`auth/login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
