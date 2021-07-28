import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Modal } from 'antd';
import { useDispatch } from 'react-redux'
import {Link , useHistory } from "react-router-dom"
import UserApi from '../../api/userApi'
import './style.scss';
import {
  pushCartLocalInCartUser as pushCartLocalInCartUserAction
} from '../../redux/actions/userAction'


const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [listUser, setListUser] = useState([])
  const [user, setUser] = useState({})
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchUser = async () => {
    const response = await UserApi.getUser()
    setListUser(response)
  }

  useEffect (() => {
    fetchUser();
  },[])

  const onFinish = (values) => {
    const user = listUser.filter(item => (item.userName === values.username && item.password === values.password))
    if (user.length > 0) {
      const cartLocal = JSON.parse(localStorage.getItem('cart'))
      if (cartLocal.length > 0) {
        setUser(user[0]);
        setVisible(true);
      } else {
        const passwordBase = btoa(user[0].id)
        localStorage.setItem('userID', passwordBase);
        history.push('/')
      }
    } else {
      alert("sai tài khoản hoặc mật khẩu")
    }
    //console.log('Success:', values);
  };

  const handleCancel = () => {
    setVisible(false);
    setUser({});
  };

  const noAddCartLocal = () => {
    const passwordBase = btoa(user.id)
    localStorage.setItem('userID', passwordBase);
    setUser({});
    setTimeout(() => {
      history.push('/')
    }, 500);
    setVisible(false);
  }

  const yesAddCartLocal = () => {
    const cartLocal = JSON.parse(localStorage.getItem('cart'));
    const newCartLocal = []
    const valueDispatch = {
      user: user,
      cartLocal: cartLocal,
    }
    dispatch(pushCartLocalInCartUserAction(valueDispatch))
    localStorage.setItem('cart', JSON.stringify(newCartLocal))
    const passwordBase = btoa(user.id)
    localStorage.setItem('userID', passwordBase);
    setTimeout(() => {
      history.push('/')
    }, 500);
    setVisible(false);
  }

  const onFinishPasswordRetrieval = (values) => {
    //console.log('Success:', values);
  };

  const onFinishFailedPasswordRetrieval = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="row">
        <div className="col-6 login__left">
          <p>Nếu bạn đã có tài khoản, đăng nhập tại đây</p>
          <Form
            name="login"
            {...layout}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button className="login__btn--login" type="primary" htmlType="submit">
                Đăng nhập
              </Button>
              <Link to='/singup'>
                <Button type="primary" danger htmlType="submit">
                  Đăng ký
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>

        <div className="col-6 login__right">
          <p>Bạn quên mật khẩu?</p>
          <Form
            name="password retrieval"
            initialValues={{ remember: true }}
            onFinish={onFinishPasswordRetrieval}
            onFinishFailed={onFinishFailedPasswordRetrieval}
          >
            <Form.Item
              label="Username"
              name="usernameRetrieval"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Lấy lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="login__modal">
        <Modal
          title="Thông báo"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>bạn đang có một số sản phẩm trong giỏ hàng đã thêm lúc chưa đăng nhập, bạn có muốn thêm sản phẩm đó vào giở hàng của mình không?</p>
        <div className="group__button__modal">
          <Button type="primary" danger onClick={noAddCartLocal}>
            không
          </Button>
          <Button type="primary" onClick={yesAddCartLocal}>
            Dồng ý
          </Button>
        </div>
        </Modal>
      </div>
    </div>
  )
}

export default Login;
