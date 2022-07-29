import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Layout as AntdLayout, Menu } from 'antd';
import MyAddress from './my-address';

const { Header } = AntdLayout;

export const NavBar = React.memo(() => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(() => location.pathname.substring(1));
  useEffect(() => {
    setActiveTab(location.pathname.substring(1));
  }, [location.pathname]);

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[activeTab]}
        items={[
          {
            key: 'voter',
            label: <NavLink to="voter">Voter</NavLink>
          },
          {
            key: 'admin',
            label: <NavLink to="admin">Admin</NavLink>
          },
          {
            key: 'address',
            label: <MyAddress />
          }
        ]}
      />
    </Header>
  );
});
NavBar.displayName = 'NavBar';
