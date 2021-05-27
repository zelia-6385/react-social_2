// import { createSelector } from 'reselect';

import { AppStateType } from './redux-store';

export const getUsers = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingInPropgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};

// export const getUsersSuper = createSelector(getUsers, getIsFetching, (users, isFetching) => {
//     return users.filter((u) => true);
// });
