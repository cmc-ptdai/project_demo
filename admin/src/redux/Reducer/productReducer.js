import productApi from '../../api/apiProduct'

import {
  GET_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from '../actionType'

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT: {
      state = action.payload
      return state
    }
    case ADD_PRODUCT: {
      const newData = {
        ...action.payload,
        countPay: Number(action.payload.countPay),
        // evaluates: [],
        // comments: [], tim kiếm bằng id mới tạo của user
        quantityPurchased: 0
      }
      productApi.addProducts(newData)
      return state
    }
    case DELETE_PRODUCT: {
      productApi.deleteProducts(action.payload)
      return state
    }
    case EDIT_PRODUCT: {
      const newData = {
        ...action.payload,
        countPay: Number(action.payload.countPay),
      }
      productApi.editProducts(action.payload.id, newData)
      return state
    }
    default:
      return state
  };
}

export default productReducer
