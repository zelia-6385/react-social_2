import React from 'react';
// import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
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
