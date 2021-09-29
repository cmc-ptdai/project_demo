import {
  GET_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT
} from '../actionType'


export const getProduct = (payload) => {
  return {
    type: GET_PRODUCT,
    payload
  }
}

export const editProduct = (payload) => {
  return {
    type: EDIT_PRODUCT,
    payload
  }
}

export const deleteProduct = (payload) => {
  return {
    type: DELETE_PRODUCT,
    payload
  }
}

export const addProduct = (payload) => {
  return {
    type: ADD_PRODUCT,
    payload
  }
}
