// import React from 'react';
import profileReducer, { actions } from './profile-reducer';

let state = {
  posts: [
    { id: 1, message: 'How are you?', likesCount: 23 },
    { id: 2, message: 'Fine!', likesCount: 0 },
  ],
  profile: null,
  status: '',
  newPostText: '',
};

it('message of new post should be Hello', () => {
  // 1. test data
  let action = actions.addPost('Hello');
  // 2.action
  let newState = profileReducer(state, action);

  // 3.expectation
  expect(newState.posts.length).toBe(3);
  expect(newState.posts[2].message).toBe('Hello');
});

it('lenght of posts should be incremented', () => {
  // 1. test data
  let action = actions.addPost('Hello');
  // 2.action
  let newState = profileReducer(state, action);

  // 3.expectation
  expect(newState.posts[2].message).toBe('Hello');
});

it('after delete length of messages should be decrement', () => {
  // 1. test data
  let action = actions.deletePost(1);
  // 2.action
  let newState = profileReducer(state, action);
  // 3.expectation
  expect(newState.posts.length).toBe(1);
});
