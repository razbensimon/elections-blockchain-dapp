import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout as AntdLayout, Menu } from 'antd';
import Welcome from '../welcome/welcome';
import ContractValidator from '../contract-validator';

const { Header, Content, Footer } = AntdLayout;

type Props = {
  children?: React.ReactNode;
  contract: string;
};

export const Layout: React.FC<Props> = ({ children, contract }) => {
  const [activeTab, setActiveTab] = useState<string>('voter');

  return (
    <AntdLayout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeTab]}
          items={[
            {
              key: 'voter',
              label: (
                <NavLink to="voter">
                  {({ isActive }) => {
                    isActive && setActiveTab('voter');
                    return 'Voter';
                  }}
                </NavLink>
              )
            },
            {
              key: 'admin',
              label: (
                <NavLink to="admin">
                  {({ isActive }) => {
                    isActive && setActiveTab('admin');
                    return 'Admin';
                  }}
                </NavLink>
              )
            }
          ]}
        />
      </Header>
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
