import { AppStateType, InferActionsTypes } from './redux-store';
import { PhotosType, UserType } from './../types/types';
import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of user ids
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
        // users: state.users.map((user) => {
        //     if (user.id === action.userId) {
        //         return { ...user, followed: true };
        //     }
        //     return user;
        // }),
      };
    }

    case 'UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
      };
    }

    case 'SET_USERS': {
      return { ...state, users: action.users };
    }

    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case 'SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }

    case 'TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }

    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: 'FOLLOW',
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: 'UNFOLLOW',
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      count: totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
};

// вариант типизации thunk
// type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
// ---
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.toggleIsFetching(false));
  };

const _followunfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes,
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let data = await apiMethod(userId);

  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    _followunfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    _followunfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
  };

export default usersReducer;
