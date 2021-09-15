import {
  GET_USERS,
  EDIT_USER,
  DELETE_USER
} from '../actionType'

export const getUser = (payload) => {
  return {
    type: GET_USERS,
    payload
  }
}

export const editUser = (payload) => {
  return {
    type: EDIT_USER,
    payload
  }
}

export const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload
  }
}
