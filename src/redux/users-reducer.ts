import { usersAPI } from './../api/users-api';
import { InferActionsTypes, BaseThunkType } from './redux-store';
import { UserType } from './../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { Dispatch } from 'react';
import { ApiResponseType } from '../api/api';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of user ids
  filter: {
    term: '',
    friend: null as null | boolean,
  },
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/USERS/FOLLOW': {
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

    case 'SN/USERS/UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
      };
    }

    case 'SN/USERS/SET_USERS': {
      return { ...state, users: action.users };
    }

    case 'SN/USERS/SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }

    case 'SN/USERS/TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }

    case 'SN/USERS/SET_FILTER': {
      return { ...state, filter: action.payload };
    }

    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: 'SN/USERS/FOLLOW',
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: 'SN/USERS/UNFOLLOW',
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: 'SN/USERS/SET_USERS',
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SN/USERS/SET_CURRENT_PAGE',
      currentPage,
    } as const),

  setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
      count: totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'SN/USERS/TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
};

export const requestUsers =
  (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
  async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));

    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);

    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.toggleIsFetching(false));
  };

const _followunfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<ApiResponseType>,
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
    await _followunfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    await _followunfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
  };

export default usersReducer;

// вариант типизации thunk
// type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
// ---
type ThunkType = BaseThunkType<ActionsTypes>;
type ActionsTypes = InferActionsTypes<typeof actions>;
export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
