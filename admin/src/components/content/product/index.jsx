import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button,  Input } from 'antd';
import FormAddProduct from './FormAddProduct'
import MyPagination from './MyPagination';
import './product.scss'

const Product = ({typeID}) => {
  const product = useSelector(store => store.productReducer)
  const [listProducts, setListProducts] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const [statusFromAdd, setEditStatusFrom] = useState(false)
  const [dataDf, setDataDf] = useState([])

  useEffect(() => {
    const newListProducts = product.filter(item => item.typeID === typeID)
    setListProducts(newListProducts)
    setDataDf(newListProducts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[product])

  const searchProduct = () => {
    if (inputSearch === "") {
      setListProducts(dataDf)
    } else {
      const arrSearch = listProducts.filter(item => (item.name.toLowerCase().indexOf(inputSearch) !== -1 ))
      setListProducts(arrSearch)
    }
  }

  const changeInputSearch = (e) => {
    setInputSearch(e.target.value)
  }
  const AddProduct = () => {
    setEditStatusFrom(true)
  }

  const editStatusFrom = (setToForm) => {
    setEditStatusFrom(setToForm)
  }

  const expiredProduct = () => {
    const newData = []
    const dateOffset = (24*60*60*1000) * 5;
    const myDate = new Date();
    const time = myDate.getTime();
    dataDf.forEach(item => {
      const endDate = new Date(item.endDate)
      const timeDate = time - endDate.getTime()
      if (timeDate < 0 && (dateOffset + timeDate) > 0) {
        newData.push(item);
      }
    })
    setListProducts(newData)

  }

  const sortProductEndDate = () => {
    const newData = []
    const myDate = new Date();
    const time = myDate.getTime();
    dataDf.forEach(item => {
      const endDate = new Date(item.endDate)
      const timeDate = time - endDate.getTime()
      if (timeDate > 0 ) {
        newData.push(item);
      }
    })
    setListProducts(newData)
  }

  return (
    <>
      {
        statusFromAdd && <FormAddProduct editStatusFrom={editStatusFrom}/>
      }
      <div className="tableUser">
        <div className="tableUser__action" style={{width: '90%'}}>
          <div className="tableUser__action--search" style={{width: '45%'}}>
            <Input type="text" name="search" placeholder="Tim kiếm...." onChange={changeInputSearch} value={inputSearch}/>
            <i className="fas fa-search" onClick={searchProduct}></i>
          </div>
          <div className="tableUser__action--addUser" style={{width: '55%'}}>
            <Button
              type="primary"
              onClick={AddProduct}
            >Add Product</Button>
            <Button
              type="primary"
              onClick={expiredProduct}
            >sản phẩm gần hết hạn</Button>
            <Button
              type="primary"
              onClick={sortProductEndDate}
            >sản phẩm đã hết hạn</Button>
          </div>
        </div>
      </div>
      <div className="listProduct">
        <MyPagination  listSort={listProducts}/>
      </div>
    </>
  )
}

export default Product;
