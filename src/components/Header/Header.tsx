import React from 'react';
import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';

export type MapPropsType = {};

export const AppHeader: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const { Header } = Layout;

  return (
    <Header className="header">
      {/* <div className="logo" /> */}

      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <Link to="/developers">Developers</Link>
            </Menu.Item>
          </Menu>
        </Col>

        {isAuth ? (
          <>
            <Col span={1}>
              <Avatar
                style={{ backgroundColor: '#87d068', marginRight: 5 }}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={5} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
              {login} - <Button onClick={handleLogout}>log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to={'/login'}>LogIn</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
    // <header className={styles.header}>
    //   <img
    //     src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"
    //     alt="logo"
    //   />
    //   <div className={styles.login_block}>
    //     {props.isAuth ? (
    //       <div>
    //         {props.login} - <button onClick={props.logout}>log out</button>
    //       </div>
    //     ) : (
    //       <NavLink to={'/login'}>LogIn</NavLink>
    //     )}
    //   </div>
    // </header>
  );
};

// export default AppHeader;
