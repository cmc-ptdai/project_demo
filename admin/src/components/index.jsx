import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  AppstoreFilled,
  DropboxOutlined
} from '@ant-design/icons';
import './style.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import { getUser } from '../redux/action/userAction';
import { getProduct } from '../redux/action/productAction';
import { getOrder } from '../redux/action/orderAction';

import router from '../router'
import userApi from '../api/apiUser'
import productApi from '../api/apiProduct'
import orderApi from '../api/apiOrders'


const { Header, Content,  Sider } = Layout;
const { SubMenu } = Menu;

const Body = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapse] = useState(false)

  const fetchData = async () => {
    try {
      const listUser = await userApi.getAllUser()
      const listProduct = await productApi.getAllProduct()
      const listOrder = await orderApi.getAllOrders()
      dispatch(getOrder(listOrder))
      dispatch(getUser(listUser))
      dispatch(getProduct(listProduct))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle  = () => {
    setCollapse(!collapsed)
  }
  const handleClickMenu = e => {
  }

  return (
    <div className="manageProduct">
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />

            <Menu className="nav-item" theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} onClick={handleClickMenu}>
              <Menu.Item key="dashboard" icon={<AppstoreFilled style={{ fontSize: '18px'}}/>}>
                <Link  to='/'>
                  Dashboard
                </Link>
              </Menu.Item>

              <Menu.Item key="user" icon={<TeamOutlined style={{ fontSize: '18px'}}/>}>
                <Link  to='/users'>
                  Users
                </Link>
              </Menu.Item>

              <Menu.Item key="product" icon={<ShoppingCartOutlined style={{ fontSize: '18px'}}/>}>
                <Link  to='/orders'>
                  Orders
                </Link>
              </Menu.Item>

              <SubMenu key="sub2" icon={<DropboxOutlined style={{ fontSize: '18px'}}/>} title="Products">
                <Menu.Item key="rau">
                  <Link  to='/vegetable'>
                    Rau xanh
                  </Link>
                </Menu.Item>
                <Menu.Item key="cu">
                  <Link  to='/tubers'>
                    Củ
                  </Link>
                </Menu.Item>
                <Menu.Item key="qua">
                  <Link  to='/fruit'>
                    Quả
                  </Link>
                </Menu.Item>
                <Menu.Item key="nam">
                  <Link  to='/mushroom'>
                    Nấm
                  </Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="slides" icon={<TeamOutlined style={{ fontSize: '18px'}}/>}>
                <Link  to='/slides'>
                  Slides
                </Link>
              </Menu.Item>
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
                        <Component typeID={item.typeID}/>
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
