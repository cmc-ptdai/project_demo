import React, { useState } from 'react'
import './style.scss'
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'antd';
import { getUser as getUserAction }  from '../../redux/actions/userAction'

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const myStore = useSelector(store => store.userReducer.user)
  const [keyActive, setKeyActive] = useState('')
  const onActive = (key) => {
    setKeyActive(key)
  }

  const logout = () => {
    const user = {
      cart: [],
    }
    localStorage.removeItem('userID')
    dispatch(getUserAction(user))
    history.push('/')
    setKeyActive('')
  }
  return (
    <div className="header">
      <div className="header__content">
        <Row>
          <Col span={5} offset={1} className="login">
            {
              myStore && (
                myStore.id ? (
                  <div className="login__imgUser">
                    {
                      myStore.img ? <img src={myStore.img} alt="abc"/> : <i className="fas fa-user" />
                    }
                    <div className="login__listchose">
                      <ul>
                        <Link to='/login'>
                          <li onClick={() => onActive(1)}
                            style={{backgroundColor: keyActive === 1 ? '#ccc' : ''}}
                          >
                            <i className="fas fa-user-tie"/>thông tin cá nhân
                          </li>
                        </Link>

                        <Link to='/login'>
                          <li onClick={() => onActive(2)} style={{backgroundColor: keyActive === 2 ? '#ccc' : ''}}>
                            <i className="fas fa-cart-plus"/>đơn hàng
                          </li>
                        </Link>

                        <Link to='#'>
                          <li onClick={() => logout()}>
                            <i className="fas fa-sign-out-alt"/>logout
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                ) : <Link to='/login'>Đăng Nhập</Link>
              )
            }
          </Col>
          <Col span={12} className="logo">
            <p>Logo</p>
          </Col>
          <Col span={5} className="cart">
            <Link to="/cart">
              <i className="fab fa-opencart">
                {
                  myStore && (<span>{myStore.cart.length}</span>)
                }
              </i>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header;
