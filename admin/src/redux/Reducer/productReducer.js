import productApi from '../../api/apiProduct'

import {
  GET_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from '../actionType'

const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT: {
      state = action.payload
      return state
    }
    default:
      return state
  };
}

export default userReducer
