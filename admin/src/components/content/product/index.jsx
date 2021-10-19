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

  return (
    <>
      {
        statusFromAdd && <FormAddProduct editStatusFrom={editStatusFrom}/>
      }
      <div className="tableUser">
        <div className="tableUser__action">
          <div className="tableUser__action--search">
            <Input type="text" name="search" placeholder="Tim kiếm...." onChange={changeInputSearch} value={inputSearch}/>
            <i className="fas fa-search" onClick={searchProduct}></i>
          </div>
          <div className="tableUser__action--addUser">
            <Button
              type="primary"
              onClick={AddProduct}
            >Add Product</Button>
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
