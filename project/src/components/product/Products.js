import React, { useEffect, useState } from 'react'
import SearchProduct from './search/SearchProduct'
import productApi from '../../api/productApi'
import Sort from './sort/Sort'
import './products.scss'
import CardItem from './CardItem'
import { Link } from 'react-router-dom'

const Products = ({type}) => {
  const [products, setProducts] = useState([])
  const [listSort, setListSort] = useState([])

  const fetchProducts = async () => {
    const params = {
      type: ''
    }
    if(type !== '') {
      params.type = type
    }
    try {
      const response = await productApi.getAll(params)
      setProducts(response)
      setListSort(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const searchByPrice1 = value => {
    if (value.item.price1 === "") {
      const newArr = products.filter(item => item.price < value.item.price2)
      setListSort(newArr)
    } else if (value.item.price2 === "") {
      const newArr = products.filter(item => item.price > value.item.price1)
      setListSort(newArr)
    } else {
      const newArr = products.filter(item => (item.price > value.item.price1) && (item.price < value.item.price2) )
      setListSort(newArr)
    }
  }

  const sortProduct1 = key => {
    if (key === "1") {
      const newArr = [...listSort]
      newArr.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
      })
      setListSort(newArr)
    }
    if (key === '2') {
      const newArr = [...listSort]
      newArr.sort((a,b) => {
        if (a.price > b.price) {
          return -1;
        }
      })
      setListSort(newArr)
    }
    if (key === '3') {
      const newArr = [...listSort]
      newArr.sort((a,b) => {
        if (a.name < b.name) {
          return -1;
        }
      })
      setListSort(newArr)
    }
    if (key === '4') {
      const newArr = [...listSort]
      newArr.sort((a,b) => {
        if (a.name > b.name) {
          return -1;
        }
      })
      setListSort(newArr)
    }
  }

  return (
    <div className="products">
      <div className="col-12">
        <span><Link to="/">trang chủ</Link> <i className="fas fa-chevron-right"></i> <Link to="/products">sản phẩm</Link> </span>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <SearchProduct
            searchByPrice={searchByPrice1}
          />
        </div>
        <div className="col-lg-9">
          <div className="col-12 sort">
            <Sort sortProduct={sortProduct1}/>
          </div>
          <div className="row">
            {
              listSort.map((item, index) => {
                return (
                  <div className="col-sm-12 col-lg-4 item"  key={index}>
                    <CardItem item={item} />
                  </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
