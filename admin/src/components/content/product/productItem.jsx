import React, { useState } from 'react';
import './productItem.scss'
import { useDispatch } from 'react-redux';
import FormEditProduct from './FormEditProduct'
import { deleteProduct as deleteProductAction ,getProduct } from '../../../redux/action/productAction'
import ApiProduct from '../../../api/apiProduct'

const ProductItem = ({data}) => {
  const dispatch = useDispatch()
  const [statusFrom, setStatusFrom] = useState(false)

  const editStatusFrom = (children) => {
    setStatusFrom(children)
  }
  const showFromEdit = () => {
    setStatusFrom(true)
  }
  const deleteProduct = () => {
    dispatch(deleteProductAction(data.id))
    setTimeout( async () => {
      try {
        const listProduct = await ApiProduct.getAllProduct()
        dispatch(getProduct(listProduct))
      } catch (error) {
        console.log(error);
      }
    }, 500);
  }

  return (
    <>
      <div className="productItem">
        {
          data.sale > 0 &&
          (
            <div className="productItem__sale">
              {data.sale}%
            </div>
          )
        }
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
               onClick={showFromEdit}
            >
              <i className="fas fa-edit"></i>
            </button>

            <button
              onClick={deleteProduct}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
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
