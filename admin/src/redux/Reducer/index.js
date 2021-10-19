import { combineReducers } from 'redux'
import productReducer from './productReducer'
import userReducer from './userReducer'
import orderReducer from "./orderReducer"

const rootReduce = combineReducers({
  productReducer,
  userReducer,
  orderReducer
})

export default rootReduce
