// import React from 'react';
import { actions } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';

import MyPosts, { DispatchMyPostsPropsType, MapMyPostsPropsType } from './MyPosts';
import { AppStateType } from '../../../redux/redux-store';

const { addPost } = actions;

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<MapMyPostsPropsType, DispatchMyPostsPropsType, {}, AppStateType>(
  mapStateToProps,
  {
    addPost,
  },
)(MyPosts);

export default MyPostsContainer;
