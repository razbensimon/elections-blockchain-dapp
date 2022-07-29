import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Layout as AntdLayout, Menu } from 'antd';

const { Header } = AntdLayout;

export const NavBar = React.memo(() => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(() => location.pathname.substring(1));
  useEffect(() => {
    setActiveTab(location.pathname.substring(1));
  }, [location.pathname]);

  return (
    <Header>
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
          }
        ]}
      />
    </Header>
  );
});
NavBar.displayName = 'NavBar';
