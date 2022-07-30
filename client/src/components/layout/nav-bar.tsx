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
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex' }}>
      <div
        className="logo"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          width: '120px',
          margin: '16px 24px 16px 0',
          flex: 'none',
          alignSelf: 'center',
          textAlign: 'center'
        }}>
        Elections
      </div>
      <Menu
        style={{ flex: 1 }}
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
            label: <MyAddress />,
            disabled: true
          }
        ]}
      />
    </Header>
  );
});
NavBar.displayName = 'NavBar';
