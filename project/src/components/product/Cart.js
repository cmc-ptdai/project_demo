
import React, { useState, useEffect } from 'react'
import { Table, Button, Form, Input, Modal } from 'antd';
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  incrementProject as incrementProjectAction,
  decrementProject as decrementProjectAction,
  deleteItemCart as deleteItemCartAction,
  numberInputProject as numberInputProjectAction,
  deleteListItemCart as deleteListItemCartAction,
  payCart as payCartAction,
  payCartNoUser as payCartNoUserAction,
  addOrder as addOrderAction,
  addOrderNoUser as addOrderNoUserAction,
  incrementProjectNoUser as incrementProjectNoUserAction,
  decrementProjectNoUser as decrementProjectNoUserAction,
  numberInputProjectNoUser as numberInputProjectNoUserAction,
  deleteItemCartNoUser as deleteItemCartNoUserAction,
  deleteListItemCartNoUser as deleteListItemCartNoUserAction,
} from '../../redux/actions/userAction'
import {
  // incrementCountPayByCart as incrementCountPayByCartAction,
  // onchangeInputPayByCart as onchangeInputPayByCartAction
  deleteItemByPayCart as deleteItemByPayCartAction
} from './../../redux/actions/products'
import userApi from '../../api/userApi'

const Cart = () => {
  const dispatch = useDispatch()

  const [form] = Form.useForm();

  const user = useSelector(store => store.userReducer.user)
  const dataProducts =  useSelector(store => store.userReducer.user.cart)
  const [products, setProducts] = useState(dataProducts)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [totalMoney, setTotalMoney] = useState(0)



  useEffect(() => {
    if(user.id) {
      fetchApi()
    } else {
      setProducts(dataProducts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'img',
      render: text => {
        return (
          <div className = "cart__box-img">
            <img src={text} alt=""/>
          </div>
        )
      }
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      render: text => {
        return (
          <div className = "cart__box-text">
            <p>{text}</p>
          </div>
        )
      }
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      render: text => {
        return (
          <div className = "cart__box-text">
            <p>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
          </div>
        )
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      render: (text, record) => {
        return (
          <div className = "cart__box-count">
            <button
              className="cart__box-text--minus"
              onClick={() => decrement(record.id)}
              disabled = {record.count === 1  ? true : false}
            >-</button>
              {/* <input
                type="text" value={record.count}
                id={record.id}
                onChange={getNumberInput}
                // onClick={getValue}
              /> */}
              <input type="text" value={text} onChange={getNumberInput} id={record.id}/>
            <button
              className="cart__box-text--plus"
              onClick={() => increment(record.id)}
              disabled = {record.count > record.countPay  ? true : false}
            >+</button>
          </div>
        )
      }
    },
    {
      title: 'ĐVT',
      dataIndex: 'dvt',
      render: text => {
        return (
          <div>
            {text}
          </div>
        )
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhtien',
      render: (text, record) => {
        return (
          <div className = "cart__box-text">
            <p>{(record.price * record.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
          </div>
        )
      }
    },
    {
      title: 'Xoá',
      dataIndex: 'delete',
      render: (text, record) => {
        return (
          <div className = "cart__box--delete">
            <Button
              danger
              onClick={() => deleteItem(record.id)}
            >
              Xoá
            </Button>
            <div id={`${record.id}delete`}></div>
          </div>
        )
      }
    },
  ];

  const onSelectChange = async (selectedRowKeys) => {
    await setSelectedRowKeys(selectedRowKeys);
    let price = 0
    selectedRowKeys.forEach(item => {
      const index = dataProducts.findIndex(elem => elem.id === item)
      price = price + (dataProducts[index].count * dataProducts[index].price)
    })
    setTotalMoney(price)

    dataProducts.forEach(item => {
      const index = selectedRowKeys.findIndex(elem => elem === item.id)
      const buttonDelete = document.getElementById(`${item.id}delete`)
      if (index !== -1) {
        buttonDelete.classList.add("overlay");
      } else {
        buttonDelete.classList.remove("overlay");
      }
    })


  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const fetchApi = async () => {
    try {
      const response = await userApi.getUserById(user.id)
      setProducts(response.cart)
    } catch (error) {
      console.log(error);
    }
  }

  const getNumberInput = (event) => {
    const { value, id } = event.target
    //const index = listProduct.findIndex(item => item.id === Number(event.target.id))
    // let a = 0
    // if ( event.target.value === "" || isNaN(event.target.value)) {
    //   setNumber(1)
    // }else {
    //   a = event.target.value
    //   if (event.target.value > listProduct[index].countPay) {
    //     a = listProduct[index].countPay
    //   }
    //   setNumber(a)
    // }
    const [...newData] = products
     const abc =   newData.map(item => {
      if (item.id === Number(id)) {
        return {
          ...item,
          count: Number(value)
        }
      }
      return item
    })
    // let price = 0
    // selectedRowKeys.forEach(item => {
    //   const index = dataProducts.findIndex(elem => elem.id === item)
    //   price = price + (dataProducts[index].count * dataProducts[index].price)
    // })
    // setTotalMoney(price)
    setProducts(abc)
    const newNumber = {
      value: value,
      id: Number(id)
    }

    setTimeout(() => {
      if (user.id) {
        dispatch(dispatch(numberInputProjectAction(newNumber)))
       } else {
         dispatch(numberInputProjectNoUserAction(newNumber))
       }
    }, 100);
    // dispatch(onchangeInputPayByCartAction(newNumber))
  }

  const sumOfMoney = () => {
    let price = 0
    selectedRowKeys.forEach(item => {
      const index = dataProducts.findIndex(elem => elem.id === item)
      price = price + (dataProducts[index].count * dataProducts[index].price)
    })
    setTotalMoney(price)
  }

  const increment = (id) => {
     if (user.id) {
      dispatch(incrementProjectAction(id))
     } else {
       dispatch(incrementProjectNoUserAction(id))
     }
     sumOfMoney()
  }

  const decrement = (id) => {
    if (user.id) {
      dispatch(decrementProjectAction(id))
     } else {
       dispatch(decrementProjectNoUserAction(id))
     }
    sumOfMoney()
  }

  const deleteItem = (id) => {
    if (user.id) {
      dispatch(deleteItemCartAction(id))
     } else {
       dispatch(deleteItemCartNoUserAction(id))
     }
  }

  const deleteListItem = () => {
    // const newArr = []
    // selectedRowKeys.forEach(item => {
    //   newArr.push(listProduct[item - 1].id)
    // })
    console.log(selectedRowKeys);
    setLoading(true)

    if (user.id) {
      dispatch(deleteListItemCartAction(selectedRowKeys))
     } else {
       dispatch(deleteListItemCartNoUserAction(selectedRowKeys))
     }
    // setTimeout(() => {
      setSelectedRowKeys([])
    //   setLoading(false)
    // }, 500);
  };

  //pay cart no user
  const onFinish = values => {
    if (values.username !== undefined && values.phone !== undefined && values.email !== undefined && values.address !== undefined) {
      const listPayCart = []
      selectedRowKeys.forEach(item => {
        products.forEach(elem => {
          if(item === elem.id) {
            listPayCart.push(elem)
          }
        })
      })
      const ojb = {
        listId : selectedRowKeys,
        profile: values
      }
      dispatch(payCartNoUserAction(ojb))
      dispatch(addOrderNoUserAction(ojb))
      dispatch(deleteItemByPayCartAction(listPayCart))
      setSelectedRowKeys([])
      onReset()
    }
  };

  // pay cart user
  const PayCart = () => {
    if (user.id) {
      const listPayCart = []
      selectedRowKeys.forEach(item => {
        products.forEach(elem => {
          if(item === elem.id) {
            listPayCart.push(elem)
          }
        })
      })

      dispatch(payCartAction(selectedRowKeys))
      dispatch(addOrderAction(selectedRowKeys))
      dispatch(deleteItemByPayCartAction(listPayCart))
      setSelectedRowKeys([])
      setTotalMoney(0)
      setTimeout(() => {
        dispatch(deleteListItemCartAction(selectedRowKeys))
      }, 500)
    } else {
      setVisible(true)
    }
  };

  const onReset = () => {
    form.resetFields();
    setVisible(false)
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="cart">
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={products}
      />
      <h2>Tổng tiền: <span>{totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> VND</h2>
      <div className="cart__button">
        <Button
          type="primary"
          danger
          onClick={deleteListItem}
          disabled={!hasSelected}
          loading={loading} >
          Xoá
        </Button>

        <Button
          className="cart__button--pay"
          type="primary"
          onClick={PayCart}
          disabled={!hasSelected}
          loading={loading}
          >
          Tiến hành thanh Toán
        </Button>
      </div>
      <div className="cart__mymodel">
        <div className="cart__mymodal__body">
          <Modal
            visible={visible}
            title="Điền thông tin"
            // onOk={handleOk}
            // onCancel={handleCancel}
            className="modalCart"
          >
            <Form
              name="basic"
              form={form}
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
            >
              <label>Họ tên:</label>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' },
                  ({ getFieldValue }) => ({
                    validator(rule, value = "") {
                      const re = /^[a-zA-Z]+$/;
                      if (value.length > 0 && !re.test(value)) {
                        return Promise.reject("Minimum 10 characters");
                      } else {
                        return Promise.resolve();
                      }
                    }
                  })
                ]}
              >
                <Input />
              </Form.Item>
              <label>Số điện thoại:</label>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' },
                  ({ getFieldValue }) => ({
                    validator(rule, value = "") {
                      const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                      if (value.length > 0 && !re.test(value)) {
                        return Promise.reject("Minimum 10 characters");
                      } else {
                        return Promise.resolve();
                      }
                    }
                  })
                ]}
              >
                <Input />
              </Form.Item>
              <label>Email:</label>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' },
                  ({ getFieldValue }) => ({
                    validator(rule, value = "") {
                      //eslint-disable-next-line
                      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                      if (value.length > 0 && !re.test(value)) {
                        return Promise.reject("email chưa đúng đinh dạng");
                      } else {
                        return Promise.resolve();
                      }
                    }
                  })
                ]}
              >
                <Input />
              </Form.Item>
              <label>Địa chỉ:</label>
              <Form.Item
                name="address"
                rules={[{ required: true, message: 'Please input your address!' },
                  ({ getFieldValue }) => ({
                    validator(rule, value = "") {
                      if (value.length > 0 && value.length < 10) {
                        return Promise.reject("Minimum 10 characters");
                      } else {
                        return Promise.resolve();
                      }
                    }
                  })
                ]}
              >
                <Input />
              </Form.Item>
                <Form.Item  className="groupButton">
                  <Button className="btnSubmit" type="primary" danger onClick={onReset}>
                    Huỷ
                  </Button>
                  <Button className="btnSubmit" type="primary" htmlType="submit" >
                    Đặt hàng
                  </Button>
                </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Cart
