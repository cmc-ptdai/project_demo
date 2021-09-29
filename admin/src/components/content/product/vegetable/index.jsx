import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, Input } from 'antd';
//import './style.scss';
//import MyTable from './table'
//import FormAdd from './FromAddUser'
import ProductItem from '../productItem';

import '../product.scss'

const Vegetable = () => {
  const product = useSelector(store => store.productReducer)
  const [dataTable, setDataTable] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const [statusFromAdd, setEditStatusFromAdd] = useState(false)

  useEffect(() => {
    setDataTable(product)
  },[product])

  const searchProduct = () => {
    const arrSearch = product.filter(item => (item.name.toLowerCase().indexOf(inputSearch) !== -1 || item.email.toLowerCase().indexOf(inputSearch) !== -1 || item.address.toLowerCase().indexOf(inputSearch) !== -1 || item.userName.toLowerCase().indexOf(inputSearch) !== -1))
    setDataTable(arrSearch)
  }

  const changeInputSearch = (e) => {
    setInputSearch(e.target.value)
    const valueInput = e.target.value
    const arrSearch = product.filter(item => (item.name.toLowerCase().indexOf(valueInput) !== -1 || item.email.toLowerCase().indexOf(valueInput) !== -1 || item.address.toLowerCase().indexOf(valueInput) !== -1 || item.userName.toLowerCase().indexOf(valueInput) !== -1))
    setDataTable(arrSearch)
  }
  const productVegetable = () => {
    //setEditStatusFromAdd(true)
  }

  // const editStatusFromAdd = (setToForm) => {
  //   setEditStatusFromAdd(setToForm)
  // }

  return (
    <>
      {/* {
        statusFromAdd && <FormAdd editStatusFromAdd={editStatusFromAdd}/>
      } */}
      <div className="tableUser">
        <div className="tableUser__action">
          <div className="tableUser__action--search">
            <Input type="text" name="search" placeholder="Tim kiếm...." onChange={changeInputSearch} value={inputSearch}/>
            <i className="fas fa-search" onClick={searchProduct}></i>
          </div>
          <div className="tableUser__action--addUser">
            <Button
              type="primary"
              onClick={productVegetable}
            >Add User</Button>
          </div>
        </div>
      </div>
      <div className="listProduct">
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
      </div>
    </>
  )
}

export default Vegetable;
