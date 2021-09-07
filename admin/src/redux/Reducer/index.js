import { combineReducers } from 'redux'
import productReducer from './productReducer'
import userReducer from './userReducer'

const rootReduce = combineReducers({
  productReducer,
  userReducer
})

export default rootReduce
