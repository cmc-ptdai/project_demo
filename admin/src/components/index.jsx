import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  AppstoreFilled,
  DropboxOutlined
} from '@ant-design/icons';
import './style.scss';
import { getUser } from '../redux/action/userAction';
import userApi from '../api/apiUser'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import router from '../router'


const { Header, Content,  Sider } = Layout;
const { SubMenu } = Menu;

const Body = () => {
  const store = useSelector(store => store)
  const dispatch = useDispatch();
  const [collapsed, setCollapse] = useState(false)

  const fetchUser = async () => {
    try {
      const listUser = await userApi.getAllUser()
      dispatch(getUser(listUser))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const toggle  = () => {
    setCollapse(!collapsed)
  }
  const handleClickMenu = e => {
    console.log(e);
  }

  return (
    <div className="manageProduct">
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} onClick={handleClickMenu}>
            <Menu.Item key="dashboard" icon={<AppstoreFilled style={{ fontSize: '18px'}}/>}>
                <Link to='/'>
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item key="user" icon={<TeamOutlined style={{ fontSize: '18px'}}/>}>
                <Link to='/users'>
                  Users
                </Link>
              </Menu.Item>
              <Menu.Item key="product" icon={<ShoppingCartOutlined style={{ fontSize: '18px'}}/>}>
              <Link to='/products'>
                  Orders
                </Link>
              </Menu.Item>
              <SubMenu key="sub2" icon={<DropboxOutlined style={{ fontSize: '18px'}}/>} title="Products">
                <Menu.Item key="rau">Rau</Menu.Item>
                <Menu.Item key="cu">Củ</Menu.Item>
                <Menu.Item key="qua">Quả</Menu.Item>
                <Menu.Item key="nam">Nấm</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                {
                  router.map((item, index) => {
                    const {Component} = item
                    return (
                      <Route path={item.path} exact={item.exact} key={index}>
                        <Component typeID={item.type}/>
                      </Route>
                    )
                  })
                }
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default Body;
