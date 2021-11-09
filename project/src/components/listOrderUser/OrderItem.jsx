import React, { useEffect, useState} from 'react';
import './style.scss'
import { Button, Popconfirm } from 'antd'
import orderApi from '../../api/order';

const OrderItem = ({dataOrder, status, changeOrder}) => {

  const [listOrder, setListOrder] = useState(null)

  useEffect(() => {
    fetchOrder()
  }, [])
  const fetchOrder = async () => {
    const newList = await orderApi.getOder()
    setListOrder(newList)
  }

  const cancelOrder = (id) => {
    for (let index = 0; index < listOrder.length; index++) {
      if (listOrder[index].id === id) {
        listOrder[index].status = 'cancelled'
        orderApi.editOrder(listOrder[index].id, listOrder[index])
      }
    }
    changeOrder(id)
  }
  const cancel = () => {

  }
  return (
    <>
      <div className="Order">
        {
          dataOrder && dataOrder.listProduct.map((item, index) => {
            return (
              <div className="Order-item" key={index}>
                <div className="Order-item-img">
                  <img src={item.img} alt="" />
                </div>
                <div className="Order-item-name">
                  <p>{item.name}</p>
                </div>
                <div className="Order-item-count">
                  <p>x {item.count}</p>
                </div>
                <div className="Order-item-sale">
                  <p>{item.sale} %</p>
                </div>
                <div className="Order-item-price">
                  <p>{((item.price * item.count) - (((item.price * item.count)*item.sale)/100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
                </div>
              </div>
            )
          })
        }
        <div className="Order-footer">
          <p><span><i className="fad fa-usd-circle" /></span> Số tiền phải trả: <span>{dataOrder.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span></p>
          {
            status === 'pending' && (
              <Popconfirm
                title="Bạn muốn huỷ đơn hàng này chứ?"
                onConfirm={cancel}
                onCancel={() => cancelOrder(dataOrder.id)}
                okText="Giữ lại"
                cancelText="Huỷ đơn"
              >
                <Button type="primary">Huỷ đơn</Button>
              </Popconfirm>
            )
          }
        </div>
      </div>
    </>
  )
}

export default OrderItem;
