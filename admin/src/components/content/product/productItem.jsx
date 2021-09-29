import React, { useEffect, useState } from 'react';
import './productItem.scss'
import FormEditProduct from './FormEditProduct'

const ProductItem = () => {
  const [statusFrom, setStatusFrom] = useState(false)
  const data = {
      "id": 7,
      "name": "Táo đỏ Mỹ",
      "price": 115000,
      "sale": 20,
      "countPay": 93,
      "img": "https://bizweb.dktcdn.net/thumb/1024x1024/100/325/688/products/tao-do-my-red-delicious-size-36-44.jpg",
      "typeID": "qua",
      "species": "tuoi",
      "quantityPurchased": 18,
      "comments": [],
      "evaluates": [
        {
          "id": 1,
          "point": 1
        }
      ],
      "country": "viet Nam"
    }
    const editStatusFrom = (children) => {
      setStatusFrom(children)
    }
    const showFrom = () => {
      setStatusFrom(true)
      console.log(123123);
    }
  return (
    <>
      <div className="productItem">
        <div className="productItem__img">
          <img src={data.img} alt="" />
        </div>
        <div className="productItem__info">
          <div className="productItem__info__left">
            <p className="productItem__info__left--name">{data.name}</p>
            {
              data.sale > 0 &&  <p className="productItem__info__left--sale">{(data.price - (data.price * data.sale / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
            }
            <p className={data.sale > 0 ? "productItem__info__left--real price-sale" : "productItem__info__left--real"}>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
          </div>
          <div className="productItem__info__right">
            <button
              onClick={showFrom}
            ><i class="fas fa-eye"></i></button>
            <button><i class="fas fa-edit"></i></button>
          </div>
        </div>
      </div>
      {
        statusFrom && <FormEditProduct data={data} editStatusFrom={editStatusFrom} />
      }
      {/* from show thông tin */}
    </>
  )
}

export default ProductItem;
