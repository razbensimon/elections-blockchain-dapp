import React from 'react';
import { Layout as AntdLayout } from 'antd';
import ContractValidator from '../contract-validator';
import { NavBar } from './nav-bar';

const { Content, Footer } = AntdLayout;

type Props = {
  children?: React.ReactNode;
  contractName: string;
};

export const Layout: React.FC<Props> = ({ children, contractName }) => {
  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <NavBar />
      <Content style={{ padding: 'calc(64px + 2em) 3em 1em 3em' }}>
        <ContractValidator contractName={contractName}>{children}</ContractValidator>
      </Content>
      <Footer style={{ textAlign: 'center', borderTop: '1px solid lightgray' }}>
        Raz Ben Simon - HIT Blockchain Course 2022, Semester B
      </Footer>
    </AntdLayout>
  );
};
