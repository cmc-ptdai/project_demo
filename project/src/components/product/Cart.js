import React, { useState, useRef,useEffect } from 'react'
import { Table, Button, Form, Input, Modal } from 'antd';
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import {incrementProject as incrementProjectAction,
  decrementProject as decrementProjectAction,
  deleteItemCart as deleteItemCartAction,
  numberInputProject as numberInputProjectAction,
  deleteListItemCart as deleteListItemCartAction,
  payCart as payCartAction,
  deleteItemPayCart as deleteItemPayCartAction,
  payCartNoUser as payCartNoUserAction
} from '../../redux/actions/userAction'
import {
  decrementCountPayByCart as decrementCountPayByCartAction,
  incrementCountPayByCart as incrementCountPayByCartAction,
  onchangeInputPayByCart as onchangeInputPayByCartAction
} from './../../redux/actions/products'

const Cart = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const user = useSelector(store => store.userReducer.user)

  const listProduct = useSelector(store => store.productReducer)
  const products =  useSelector(store => store.userReducer.user.cart)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(1)
  const handleInput = useRef(number)
  const [visible, setVisible] = useState(false)

  let totalMoney = 0
  products.forEach(item => {
    totalMoney = totalMoney  + (item.price * item.count)
  });

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
            <p>{text} VND</p>
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
              <input
                type="text" value={text}
                id={record.id}
                onChange={numberInput}
                onClick={laygiatri}
              />
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
      render: (text, record) => {
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
            <p>{record.price * record.count} VND</p>
          </div>
        )
      }
    },
    {
      title: 'Xoá',
      dataIndex: 'delete',
      render: (text, record) => {
        return (
          <>
             <Button danger onClick={() => deleteItem(record.id)}>Xoá</Button>
          </>
        )
      }
    },
  ];
  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const laygiatri = (event) => {
    setNumber(event.target.value)
  }

  useEffect(() => {
    if ( handleInput.current === "") {
      handleInput.current = 0
    }else {
      handleInput.current = number
    }
  },[number])

  const numberInput = (event) => {
    const index = listProduct.findIndex(item => item.id === Number(event.target.id))
    let a = 0
    if ( event.target.value === "" || isNaN(event.target.value)) {
      setNumber(0)
    }else {
      a = event.target.value
      if (event.target.value > listProduct[index].countPay) {
        a = listProduct[index].countPay
      }
      setNumber(a)
    }

    const newNumber = {
      value: a,
      numberCurrent: Number(number),
      id: Number(event.target.id)
    }
    dispatch(numberInputProjectAction(newNumber))
    dispatch(onchangeInputPayByCartAction(newNumber))
  }

  const increment = (id) => {
    dispatch(incrementProjectAction(id))
    dispatch(incrementCountPayByCartAction(id))
  }

  const decrement = (id) => {
    dispatch(decrementProjectAction(id))
    dispatch(decrementCountPayByCartAction(id))
  }

  const deleteItem = (id) => {
    dispatch(deleteItemCartAction(id))
  }

  const deleteListItem = () => {
    const newArr = []
    selectedRowKeys.forEach(item => {
      newArr.push(listProduct[item - 1].id)
    })
    setLoading(true)
    dispatch(deleteListItemCartAction(newArr))
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 500);
  };

  const onFinish = values => {
    console.log(values);
    if (values.username !== undefined && values.phone !== undefined && values.email !== undefined && values.address !== undefined) {
      const newArr = []
      selectedRowKeys.forEach(item => {
        newArr.push(listProduct[item -1].id)
      })
      const ojb = {
        listId : newArr,
        profile: values
      }
      dispatch(payCartNoUserAction(ojb))
      setTimeout(() => {
        deleteListItem()
      }, 500);
      onReset()
    }
  };

  const onFinishFailed = errorInfo => {
  };

  const showModal = () => {
    if (user.id) {
      const newArr = []
      selectedRowKeys.forEach(item => {
        newArr.push(listProduct[item -1].id)
      })
      dispatch(payCartAction(newArr))
      setTimeout(() => {
        dispatch(deleteItemPayCartAction(newArr))
      }, 500)
    } else {
      setVisible(true)
    }
  };

  const handleOk = () => {
    setVisible(false)
  };

  const handleCancel = () => {
    setVisible(false)
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
      <h2>Tổng tiền: <span>{totalMoney}</span> VND</h2>
      <div className="cart__button">
        <Button
          type="primary"
          onClick={deleteListItem}
          disabled={!hasSelected}
          loading={loading} >
          Xoá
        </Button>

        <Button
          className="cart__button--pay"
          type="primary"
          onClick={showModal}
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
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              name="basic"
              form={form}
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
