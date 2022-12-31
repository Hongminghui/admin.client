/*
 * @Date: 2022-12-05 22:13:08
 * @LastEditTime: 2022-12-31 20:20:09
 * @Description:
 */
import React, { lazy, useEffect, useState, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, NavLink } from 'react-router-dom';

import { Layout, Menu, theme } from 'antd';

import menuConfig from '../../config/menuConfig.json';

const { Header, Content, Sider } = Layout;

const lazyLoad = (moduleName) => {
  const Module = lazy(() => import(`.${moduleName}`).catch(() => '../NotFound'));
  return <Module />;
};

const authMenuList = [
  { id: 'portfolioAnalysis', pId: '0', label: '组合分析', key: 3 },
  { id: 'dataCenter', pId: '0', label: '数据中心', key: 2 },
  { id: 'systemManager', pId: '0', label: '系统管理', key: 1 },
  { id: 'userManager', pId: 'systemManager', label: '用户列表', key: 101, href: '/systemManager/userManager' },
  { id: 'authManager', pId: 'systemManager', label: '功能权限', key: 102, href: '/systemManager/authManager' },
  { id: 'roleManager', pId: 'systemManager', label: '角色管理', key: 103, href: '/systemManager/roleManager' },
];

const menuList = menuConfig.map((item) => {
  const { children } = item;
  const menuChildren = children.map((node) => {
    let { key, label, href } = node;
    return {
      key,
      label: <NavLink to={href}>{label}</NavLink>,
    };
  });
  return {
    ...item,
    children: menuChildren,
  };
});

const routeList = [];
menuConfig.forEach((item) => {
  const { children } = item;
  children.forEach((node) => {
    routeList.push((
      <Route
        key={node.key}
        path={node.href}
        element={lazyLoad(node.href)}
      />
    ));
  });
});

export default function Home() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 为什么navigate一定要在useEffect里用，如果放外面可能会一直跳转
  useEffect(() => {
    const menuObj = authMenuList.find((item) => item.href === pathname);
    if (!menuObj) {
      navigate('/systemManager/userList');
    }
  }, []);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            lineHeight: '32px',
            borderBottom: '1px solid #000',
            textAlign: 'center',
          }}
        >
          小马哥-学生管理系统
        </div>
        <Menu theme="dark" defaultSelectedKeys={[101]} mode="inline" items={menuList} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              padding: 12,
              minHeight: 360,
              background: colorBgContainer,
              marginTop: '20px',
              height: 'calc(100vh - 100px)',
            }}
          >
            <Suspense fallback={<div className="init-loading" alt="加载中..." />}>
              <Routes>
                {routeList}
              </Routes>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
