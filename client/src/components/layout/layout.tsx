import React from 'react';
import { Layout as AntdLayout } from 'antd';
import Welcome from '../welcome/welcome';
import ContractValidator from '../contract-validator';
import { NavBar } from './nav-bar';

const { Content, Footer } = AntdLayout;

type Props = {
  children?: React.ReactNode;
  contract: string;
};

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
