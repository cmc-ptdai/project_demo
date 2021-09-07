//import userApi from '../../api/apiUser'

import {
  GET_USERS,
} from '../actionType'

const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      state = action.payload
      return state
    }
    default:
      return state
  };
}

export default userReducer;
