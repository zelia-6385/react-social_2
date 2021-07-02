import { useSelector } from 'react-redux';

import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

import { getIsFetching } from '../../redux/user-selectors';

type UsersPagePropsType = {
  pageTitle: string;
};

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};

export default UsersPage;
