import { connect } from 'react-redux';
import { follow, unfollow, requestUsers } from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {
    getPageSize,
    getUsers,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInPropgress,
} from '../../redux/user-selectors';

class UsersContainer extends React.Component {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//         isAuth: state.auth.isAuth,
//     };
// };

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInPropgress(state),
    };
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },

//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },

//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },

//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         },
//     };
// };

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        requestUsers,
    }),
    // withAuthRedirect,
)(UsersContainer);

// props.setUsers([
//     {
//         id: 1,
//         photoUrl:
//             'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg',
//         followed: false,
//         fullName: 'Dmitry',
//         status: 'I am a boss',
//         location: { city: 'Minsk', country: 'Belarus' },
//     },
//     {
//         id: 2,
//         photoUrl:
//             'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg',
//         followed: true,
//         fullName: 'Yury',
//         status: 'I am a boss too',
//         location: { city: 'Moscow', country: 'Russia' },
//     },
//     {
//         id: 3,
//         photoUrl:
//             'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg',
//         followed: false,
//         fullName: 'Sasha',
//         status: 'I am a boss too',
//         location: { city: 'Kiev', country: 'Ukrain' },
//     },
// ]);
