import { stopSubmit } from 'redux-form';
import { usersAPI, profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'How are you?', likesCount: 23 },
        { id: 2, message: 'Fine!', likesCount: 0 },
    ],

    // newPostText: 'Samurai-road',
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {
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
                newPostText: '',
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
                },
            };
        }
        default:
            return state;
    }
};

export const addPost = (newPostText) => ({
    type: ADD_POST,
    newPostText,
});

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile,
});

export const setStatus = (status) => ({
    type: SET_STATUS,
    status,
});

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId,
});

export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos,
});

export const getUserProfile = (userId) => async (dispatch) => {
    let data = await usersAPI.getProfile(userId);

    dispatch(setUserProfile(data));
};

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);

    dispatch(setStatus(data.data));
};

export const updateStatus = (status) => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);

        if (data.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        alert(error);
    }
};

export const savePhoto = (file) => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const data = await profileAPI.saveProfile(profile);

    if (data.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        // нужно парсить для каждого поля текст ошибки
        // dispatch(stopSubmit('edit-frofile', { contacts: { facebook: data.data.messages[0] } }));
        dispatch(stopSubmit('edit-frofile', { _error: data.data.messages[0] }));
        return Promise.reject(data.data.messages[0]);
    }
};

export default profileReducer;
