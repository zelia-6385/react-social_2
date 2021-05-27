import React from 'react';
import { UserType } from '../../types/types';
// import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

const Users: React.FC<PropsType> = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  ...props
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
