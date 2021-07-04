import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getCurrentPage,
  getFollowingInPropgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/user-selectors';
import { FilterType, follow, requestUsers, unfollow } from '../../redux/users-reducer';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import UsersSearchForm from './UsersSearchForm';
import * as queryString from 'query-string';

type QueryParamsType = { term?: string; page?: string; friend?: string };

const Users: React.FC = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInPropgress);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // забираем данные из адресной строки
    const { search } = history.location;
    const parsed = queryString.parse(search) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);

    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term };

    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null };
        break;
      case 'true':
        actualFilter = { ...actualFilter, friend: true };
        break;
      case 'false':
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    if (!!parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false,
      };

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // зависимости в deps добавились автоматически. Это по-прежнему эмуляция componentDidMount. Пришлось отключить правило Eslint

  useEffect(() => {
    // вариант с автоматической конкатенацией строки
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    // этим методом отправляем данные в адресную строку
    history.push({
      pathname: 'developers',
      // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
      search: queryString.stringify(query),
    });
  }, [filter, currentPage, history]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const handleFollow = (userId: number) => {
    dispatch(follow(userId));
  };
  const handleUnfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
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
            followingInProgress={followingInProgress}
            follow={handleFollow}
            unfollow={handleUnfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
