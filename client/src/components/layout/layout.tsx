import React from 'react';
import { Layout as AntdLayout } from 'antd';
import ContractValidator from '../contract-validator';
import { NavBar } from './nav-bar';

const { Content, Footer } = AntdLayout;

type Props = {
  children?: React.ReactNode;
  contract: string;
};

export const Layout: React.FC<Props> = ({ children, contract }) => {
  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <NavBar />
      <Content style={{ padding: '1em 3em' }}>
        <ContractValidator contract={contract}>{children}</ContractValidator>
      </Content>
      <Footer style={{ textAlign: 'center', borderTop: '1px solid lightgray' }}>
        Raz Ben Simon - HIT Blockchain Course 2022, Semester B
      </Footer>
    </AntdLayout>
  );
};
