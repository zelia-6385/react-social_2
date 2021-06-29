import { InferActionsTypes, BaseThunkType } from './redux-store';
import { PostType, PhotosType, ProfileType } from './../types/types';
import { stopSubmit, FormAction } from 'redux-form';
import { profileAPI } from '../api/profile-api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: 'How are you?', likesCount: 23 },
    { id: 2, message: 'Fine!', likesCount: 0 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileType,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPost: (newPostText: string) =>
    ({
      type: ADD_POST,
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: SET_USER_PROFILE,
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: SET_STATUS,
      status,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: DELETE_POST,
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: SAVE_PHOTO_SUCCESS,
      photos,
    } as const),
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.getProfile(userId);

    dispatch(actions.setUserProfile(data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.getStatus(userId);

    dispatch(actions.setStatus(data));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      let data = await profileAPI.updateStatus(status);

      if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }
    } catch (error) {
      alert(error);
    }
  };

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    console.log(data);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(stopSubmit('edit-frofile', { _error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
    }
  };

export default profileReducer;
