import React from 'react';
import { Layout as AntdLayout, Menu } from 'antd';

const { Header, Content, Footer } = AntdLayout;

export const Layout: React.FC = () => (
  <AntdLayout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(2).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`
          };
        })}
      />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Raz Ben Simon - HIT Blockchain Course 2022, Semester B</Footer>
  </AntdLayout>
);
