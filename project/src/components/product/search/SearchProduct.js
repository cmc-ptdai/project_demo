import React from 'react'
import './style.scss'

const SearchProduct = (props) => {
  const countrys = ['canada', 'Hoa kỳ', 'Việt Nam', 'Úc']
  const typeProduct = [
    {
      type: 'rau',
      name: 'Rau xanh',
    },{
      type: 'cu',
      name: 'Các loại củ',
    },{
      type: 'qua',
      name: 'Hoá quả tươi',
    },{
      type: 'nam',
      name: 'Các loại nấm',
    }
  ]
  const prices = [
    {
      price1: 0,
      price2: 100000
    },
    {
      price1: 100000,
      price2: 200000
    },
    {
      price1: 200000,
      price2: 300000
    },
    {
      price1: 300000,
      price2: 500000
    },
    {
      price1: 500000,
      price2: 1000000
    },
    {
      price1: 1000000,
      price2: 9999999999999
    }
  ]
  const searchByPrice = (item) => {
    props.searchByPrice(item)
  }
  return (
    <div className="search">
      <div className="box">
        <div className="search__title">
          <p>Loại sản phẩm</p>
        </div>
        <div className="search__content">
          <ul>
            {
              typeProduct.map((item, index) => {
                return (
                  <li key={index}>
                    {item.name}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className= "box" >
        <div className="search__title">
          <p>GIÁ SẢN PHẨM</p>
        </div>
        <div className="search__content">
          <ul>
            {
              prices.map((item, index) => {
                return (
                  <li key={index} onClick={() => searchByPrice({item})}>
                    <p>
                      {item.price1 === 0 ? 'Dưới ' : item.price1 === 1000000 ? 'Trên' : item.price1 + ' -> '}
                      {item.price2 === 9999999999999 ? ' 1000000' : item.price2}
                    </p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className= "box" >
        <div className="search__title">
          <p>quốc gia</p>
        </div>
        <div className="search__content">
          <ul>
            {
              countrys.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchProduct
