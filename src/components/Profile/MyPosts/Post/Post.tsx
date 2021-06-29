import React from 'react';

import styles from './Post.module.css';

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.item}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdiwTYiTz_QaKctS1RstEbfxz8hYnlMTx5tQ&usqp=CAU"
        alt="avatar"
      />
      <div>
        <span>like</span> {props.likesCount}
      </div>
      {props.message}
    </div>
  );
};

export default Post;
