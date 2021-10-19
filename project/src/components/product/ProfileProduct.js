import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import productApi from '../../api/productApi'
import './ProfileProduct.scss'
import { Breadcrumb } from 'antd'
import {
  addCartByProfile as addCartByProfileAction,
  addCartByProfileNoUser as addCartByProfileNoUserAction
} from '../../redux/actions/userAction'
import {
  setEvaluate as setEvaluateAction
} from "./../../redux/actions/products";
import { Tabs, Rate, Modal, Button, notification } from 'antd';
import ShowComment from './commentProduct/index'

const { TabPane } = Tabs;
const openNotification = (item) => {
  notification.open({
    message: '',
    description:<span>Bạn đã thêm thành công một sản phẩm <b>{item.name}</b> vào giỏ hàng</span>,
    icon: <i className="fab fa-optin-monster" style={{fontSize: "40px", color: '#fe9705'}}></i>,
  });
};


const ProfileProduct = () => {
  const param = useParams()
  const dispatch = useDispatch()

  const user = useSelector(store => store.userReducer.user)
  const listProduct = useSelector(store => store.productReducer)
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const [product, setProduct] = useState(null)
  const [number, setNumber] = useState(1)

  const [evaluate, setEvaluate] = useState(0)
  const[evaluateDefault, setEvaluateDefault] = useState(0)

  const [isModalVisible, setIsModalVisible] = useState(false)


  const fetchProduct = async () => {
    try {
      const response = await productApi.getById(param.id)
      setProduct(response)
      if (response.evaluates.length >0) {
        getValueEvaluate('3')
      } else {
        getValueEvaluate('1')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  const increment = () => {
    if (number + 1 >=  product.countPay) {
      setNumber(product.countPay)
    } else {
      setNumber(number + 1)
    }
  }

  const decrement = () => {
    if (number - 1 <= 0 ) {
      setNumber(1)
    } else {
      setNumber(number - 1)
    }
  }

  const getNumberInput = e => {
    const { value } = e.target

    if(isNaN(value) || value === "" || value < 0) {
      setNumber(1)
      return
    }
    if (value > product.countPay) {
      setNumber(product.countPay)
    } else {
      setNumber(value)
    }
  }

  const buyProduct = async () => {
    const data = {
      product: product,
      number: number
    }
    if (user.id) {
      await dispatch(addCartByProfileAction(data))
    }
    dispatch(addCartByProfileNoUserAction(data))
    setNumber(1)
    openNotification(product)
  }
  const handleChange = (evaluate) => {
    setEvaluate(evaluate)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const value = {
      id: product.id,
      evaluate
    }
    dispatch(setEvaluateAction(value))
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getValueEvaluate = (key) => {
    let count = 0
    if (key === "3" && product) {
      product.evaluates.forEach(item => {
        count = count + item.point
      });
      const s = (count - (count % product.evaluates.length))  / product.evaluates.length;
      setEvaluateDefault(s)
    }
  }

  let outstanding = []
  if ( listProduct ) {
    const newArr = [...listProduct]
    newArr.sort((a, b) => {
      if (a.quantityPurchased > b.quantityPurchased) {
        return -1;
      } else {
        return 0
      }
    })
    const listOutstanding = []
    for (let index = 0; index < 9; index++) {
      listOutstanding.push(newArr[index])
    }
    outstanding = [...listOutstanding];
  }

  return (
    <>
      {
        product &&
        <div>
          <div className="row">
            <div className="col-12 directional">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">
                    trang chủ
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/products">
                    sản phẩm
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>{ product.name }</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="col-lg-3">
              <div className="box" >
                <div className="search__title">
                  <p>SẢN PHẨM NỔI BẬT</p>
                </div>
                <div className="search__content boxOutstanding">
                  {
                    listProduct.length > 0 && (
                      outstanding.map((item, index) => {
                        return (
                          <Link to={`/products/${item.id}` } key={index}>
                            <div className="item__outstanding">
                              <div className="item__outstanding__img">
                                <img src={item.img} alt="img"/>
                              </div>
                              <div className="item__outstanding__information">
                                <p className="item__outstanding__information-name">
                                  {item.name}
                                </p>
                                <p className="item__outstanding__information-price">
                                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                                </p>
                              </div>
                            </div>
                          </Link>
                        )
                      })
                    )
                  }

                </div>
              </div>
            </div>
            <div className="col-lg-9 profile">
              <div className="row">

                <div className="col-md-7">
                  <img src={product.img} alt="img"/>
                </div>

                <div className="col-md-5 profile__content">

                  <h2 className="title">{product.name}</h2>

                  <p className="status">Trạng Thái:
                    { product.countPay > 0 ? (
                      <span className="status--stocking"> <i className="fas fa-check"></i> Còn hàng</span>
                    ) : (
                      <span className="status--OutOfStock"> <i className="fas fa-times"></i> Hết hàng</span>
                    )}
                  </p>

                  <div className="price">
                    {
                      product.sale > 0 && (
                        <div className="price__sale">
                          <span className="price__sale-text">Giá gốc:</span>
                          <span className="price__sale-number">{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
                          <span className="price__sale-numberSale">(-{product.sale}%)</span>
                        </div>
                      )
                    }
                     <div className="price__sale">
                        <span className="price__sale-text">Chỉ còn:</span>
                      <span className="price__real ">
                        {(product.price - (product.price * product.sale / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                      </span>
                      </div>
                  </div>

                  <div className="nutrition">
                  <textarea
                    className="content-product"
                    readOnly
                    defaultValue={product.content}
                  />
                  </div>

                  <div className="profile__addCart">
                    <label>Số lượng: </label>

                    <div className="addNumber">
                      <button className="minus" onClick={decrement}>-</button>
                      <input type="text" value={number} onChange={getNumberInput} />
                      <button className="plus" onClick={increment}>+</button>
                    </div>

                    <button className={product.countPay > 0 ? "buy" : "disabledBuy"} onClick={buyProduct} disabled = {product.countPay > 0 ? false : true}>Mua hàng</button>

                  </div>
                  <p className="address">Địa chỉ: <span>18T1 The Godel An Khánh, An Khánh, Hoài Đức, Hà Nội</span></p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultActiveKey="1" type="card" onChange={getValueEvaluate}>
            <TabPane tab="Thông tin chung về sản phẩm" key="1">
              <textarea
                className="content-product"
                readOnly
                defaultValue={product.content}
              />
            </TabPane>
            <TabPane tab="Đánh giá" key="3">
              <h3>Đánh giá sản phẩm</h3>
              <div className="evaluate-content">
                <div className="evaluate-content-rate">
                  <span>
                    <Rate
                      allowHalf
                      disabled
                      tooltips={desc}
                      onChange={handleChange}
                      value={evaluateDefault}
                    />
                    {
                      evaluateDefault ?
                      <span className="ant-rate-text">{desc[evaluateDefault - 1]}</span>
                      : ''
                    }
                  </span>
                </div>
                <div className="evaluate-content-groupButton">
                  <span className={ user && (user.id === undefined ? "evaluateDisable" :  "evaluate" )}>
                    <button onClick={showModal} disabled={user && (user.id === undefined ? true : false)}>Đánh giá sản phẩm</button>
                    <span style={{display: user && (user.id === undefined ? 'block' : 'none')}}>( Đăng nhập để gửi đánh giá của bạn <Link to='/login'>Đăng nhập tại đây</Link>)</span>
                  </span>
                </div>
              </div>
              <div className="fromEvaluate">
                <Modal
                  visible={isModalVisible}
                  title="Đánh giá sản phẩm"
                  style = {{marginTop: "150px"}}
                  // onOk={handleOk}
                  // onCancel={handleCancel}
                  // footer={[
                  //   <Button key="back" onClick={handleCancel}>
                  //     Cancel
                  //   </Button>,
                  //   <Button key="submit" type="primary" onClick={handleOk}>
                  //     Gửi đánh giá
                  //   </Button>,
                  // ]}
                >
                  <span>Đánh giá của bạn về sản phẩm: </span>
                  <Rate
                      allowHalf
                      onChange={handleChange}
                      value={evaluate}
                    />
                  <div className="fromEvaluate__btn">
                    <Button key="cancel" danger  onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                      Gửi đánh giá
                    </Button>
                  </div>
                </Modal>
              </div>
            </TabPane>

            <TabPane tab="Bình luận" key="4">
               <ShowComment  data={product}/>
            </TabPane>
          </Tabs>
        </div>
      }
    </>
  )
}

export default ProfileProduct
