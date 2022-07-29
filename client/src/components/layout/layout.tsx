import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Layout as AntdLayout, Menu } from 'antd';
import Welcome from '../welcome/welcome';
import ContractValidator from '../contract-validator';

const { Header, Content, Footer } = AntdLayout;

type Props = {
  children?: React.ReactNode;
  contract: string;
};

const NavBar = React.memo(() => {
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

export const Layout: React.FC<Props> = ({ children, contract }) => {
  return (
    <AntdLayout className="layout">
      <NavBar />
      <Content style={{ padding: '1em 3em' }}>
        <Welcome />
        <div className="site-layout-content">
          <ContractValidator contract={contract}>{children}</ContractValidator>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', borderTop: '1px solid lightgray' }}>
        Raz Ben Simon - HIT Blockchain Course 2022, Semester B
      </Footer>
    </AntdLayout>
  );
};
