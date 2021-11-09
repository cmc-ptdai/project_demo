import React, { useEffect, useState } from 'react';
import './style.scss';
import OrderItem from './OrderItem';
import { useSelector } from 'react-redux'
import apiOrder from '../../api/order'
//import MyPaginationOrder from './MyPaginationOrder'

const ListOrderUser = ({statusProps}) => {
  const [ordersApi , setOrdersApi] = useState([]);
  const [statusChange , setStatusChange] = useState(null);

  const listOrderUser = useSelector(store => store.userReducer.user.order)

  useEffect(() => {
    fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusChange])

  const changeOrder = (id) => {
    setStatusChange(id);
  }

  const fetchOrder = async () => {
      const listOrder = await apiOrder.getOder()
      if (listOrder.length > 0 && listOrderUser.length > 0) {
        let newOrder = [];
        listOrder.forEach(item => {
          listOrderUser.forEach(elem => {
            if (item.id === elem && item.status === statusProps) {
              newOrder.push(item);
            }
          })
        })
        setOrdersApi(newOrder);
      }
  }

  return (
    <>
    {
      ordersApi.length > 0 && ordersApi.map((item,index) => {
        return <OrderItem dataOrder={item} key={index} status={statusProps} changeOrder={changeOrder}/>
      })
      //ordersApi.length > 0 && (<MyPaginationOrder listSort={ordersApi}/>)
    }
    </>
  )
}

export default ListOrderUser;
