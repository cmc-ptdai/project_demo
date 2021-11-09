import productApi from '../../api/productApi'
import commentApi from '../../api/apiComment'
import EvaluateApi from '../../api/apiEvaluates';

import {
  GET_PRODUCT,
  COMMENT_PRODUCT,
  REPLY_COMMENT_PRODUCT,
  SET_EVALUATE,
  DELETE_ITEM_BY_PAY_CART,
  DELETE_COMMENT,
  DELETE_COMMENT_REPLY
} from '../actionType'

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return state = action.payload

    case SET_EVALUATE: {
      EvaluateApi.editEvaluates(action.payload.id, action.payload)
      return state
    }

    case DELETE_ITEM_BY_PAY_CART: {
      const newArr = [...state]
      newArr.forEach(item => {
        action.payload.forEach( (elem) => {
          if (item.id === elem.id) {
            const newCount = Number(item.countPay) - Number(elem.count)
            const newQuantityPurchased = Number(item.quantityPurchased) + Number(elem.count)
            const newElem = {
              ...item,
              countPay: newCount,
              quantityPurchased: newQuantityPurchased
            }
            productApi.updateProduct(item.id, newElem)
          }
        })
      })
      return state
    }

    case REPLY_COMMENT_PRODUCT: {
      commentApi.editApiComments(action.payload.dataProduct, action.payload.newData)
      return state
    }

    case COMMENT_PRODUCT: {
      commentApi.editApiComments(action.payload.dataProduct, action.payload.newData)
      return state
    }

    case DELETE_COMMENT: {
      commentApi.editApiComments(action.payload.id, action.payload)
      return state
    }

    case DELETE_COMMENT_REPLY: {
      commentApi.editApiComments(action.payload.id, action.payload)
      return state
    }

    default:
      return state
  };
}

export default productReducer
