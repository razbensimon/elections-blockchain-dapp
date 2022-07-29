import React from 'react';
import { Layout as AntdLayout, Menu } from 'antd';
import Welcome from '../welcome/welcome';
import ContractValidator from '../contract-validator';

const { Header, Content, Footer } = AntdLayout;

type Props = {
  children?: React.ReactNode;
  contract: string;
};

export const Layout: React.FC<Props> = ({ children, contract }) => (
  <AntdLayout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: 1,
            label: `Admin`
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
