import React, {useState} from 'react';
import './orders.scss'
import Pending from './Pending'
// import { useDispatch, useSelector } from 'react-redux';
// import orderApi from '../../../api/apiOrders'
// import { getOrder } from '../../../redux/action/orderAction'
// import { Button } from 'antd/lib/radio';

const Orders = () => {
  const [ showTab, setShowTab] = useState("pending")
  function changeTab(a) {
    setShowTab(a)
  };

  return (
    <>
      <div className="group-btn">
        <button
          className={showTab === "pending" ? "group-btn-active" : '' }
          onClick={() => changeTab("pending")}
        >
          Pending
        </button>
        <button
          className={showTab === "delivered" ? "group-btn-active" : '' }
          onClick={() => changeTab("delivered")}
        >
          Delivered
        </button>
        <button
          className={showTab === "cancelled" ? "group-btn-active" : '' }
          onClick={() => changeTab("cancelled")}
        >
          Cancelled
        </button>
      </div>
      <div className="content-tab">
        {
          showTab === "pending" && <Pending statusProps="pending"/>
        }
        {
          showTab === "delivered" && <Pending statusProps="delivered"/>
        }
        {
          showTab === "cancelled" && <Pending statusProps="cancelled"/>
        }
      </div>
    </>
  )
}

export default Orders
