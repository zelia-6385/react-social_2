import { instance, GetItemsType, ApiResponseType } from './api';

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data) as Promise<ApiResponseType>;
  },
  follow(userId: number) {
    return instance.post<ApiResponseType>(`follow/${userId}`).then((response) => response.data);
  },
  // getProfile(userId: number) {
  //   console.warn('obsolete method. Please use profileAPI object');
  //   return profileAPI.getProfile(userId);
  // },
};
