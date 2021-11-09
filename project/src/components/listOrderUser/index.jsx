import React, { useState } from 'react';
import ListOrder from './ListOrderUser'
import { useSelector } from 'react-redux'
// import apiOrder from '../../api/order'


const Orders = () => {

  const user = useSelector(store => store.userReducer.user)

  //const [ordersApi , setOrdersApi] = useState([])

  const [ showTab, setShowTab] = useState("pending")
  function changeTab(a) {
    setShowTab(a)
  };

  // useEffect(() => {
  //   fetchOrder()
  // }, [])

  // const fetchOrder = async () => {
  //     const listOrder = await apiOrder.getOder()
  //     setOrdersApi(listOrder)
  // }

  return (
    <>
      <div className="group-btn">
        <button
          className={showTab === "pending" ? "group-btn-active" : '' }
          onClick={() => changeTab("pending")}
        >
          Đang chờ xử lý
        </button>
        <button
          className={showTab === "delivery" ? "group-btn-active" : '' }
          onClick={() => changeTab("delivery")}
        >
          Đang giao hàng
        </button>
        <button
          className={showTab === "delivered" ? "group-btn-active" : '' }
          onClick={() => changeTab("delivered")}
        >
          Đã giao hàng
        </button>
        <button
          className={showTab === "cancelled" ? "group-btn-active" : '' }
          onClick={() => changeTab("cancelled")}
        >
          Đã huỷ
        </button>
      </div>
      <div className="content-tab">
        {
          showTab === "pending" &&
          <ListOrder
            key="1"
            listOrderUser1={user.order}
            // listOrder={ordersApi}
            statusProps="pending"
          />
        }
        {
          showTab === "delivery" &&
          <ListOrder
            key="2"
            listOrderUser1={user.order}
            // listOrder={ordersApi}
            statusProps="delivery"
          />
        }
        {
          showTab === "delivered" &&
          <ListOrder
            key="3"
            listOrderUser1={user.order}
            // listOrder={ordersApi}
            statusProps="delivered"
          />
        }
        {
          showTab === "cancelled" &&
          <ListOrder
            key="4"
            listOrderUser1={user.order}
            // listOrder={ordersApi}
            statusProps="cancelled"
          />
        }

      </div>
    </>
  )
}

export default Orders;
