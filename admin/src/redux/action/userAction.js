import {
  GET_USERS
} from '../actionType'

export const getUser = (payload) => {
  return {
    type: GET_USERS,
    payload
  }
}
