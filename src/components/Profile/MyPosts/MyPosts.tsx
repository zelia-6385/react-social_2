import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { createField, GetStringKeys, Textarea } from '../../common/FormsControls/FormsControls';
import { PostType } from '../../../types/types';

const maxLength10 = maxLengthCreator(10);

type PropsType = {};

type AddPostFormValuesType = {
  newPostText: string;
};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (
  props,
) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>(
          'add post',
          'newPostText',
          [required, maxLength10],
          Textarea,
        )}
      </div>
      <button>Add post</button>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({
  form: 'ProfileaddNewPostForm',
})(AddNewPostForm);

export type MapMyPostsPropsType = {
  posts: Array<PostType>;
};

export type DispatchMyPostsPropsType = {
  addPost: (newPostText: string) => void;
};

const MyPosts: React.FC<MapMyPostsPropsType & DispatchMyPostsPropsType> = (props) => {
  console.log('RENDER');

  let postsElements = props.posts.map((elem) => (
    <Post message={elem.message} likesCount={elem.likesCount} key={elem.id} />
  ));

  const onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={styles.posts_block}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={styles.posts}>{postsElements}</div>
    </div>
  );
};

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
