import {
  GET_PRODUCT,
  DECREMENT_COUNT_PAY,
  DECREMENT_COUNT_PAY_PROFILE,
  DECREMENT_COUNT_PAY_BY_CART,
  INCREMENT_COUNT_PAY_BY_CART,
  ONCHANGE_NUMBER_INPUT_BY_CART,
  SET_EVALUATE
} from '../actionType'

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return state = action.payload

    case DECREMENT_COUNT_PAY: {
      const newArr = [...state]

      newArr.forEach(item => {
        if (item.id === action.payload.id) {
          item.countPay = item.countPay - 1
        }
      })
      return state = [...newArr]
    }

    case DECREMENT_COUNT_PAY_PROFILE: {
      const newArr = [...state]
      newArr.forEach(item => {
        if (item.id === action.payload.product.id) {
          item.countPay = item.countPay - action.payload.number
        }
      })
      console.log(newArr);
      return state = [...newArr]
    }

    case DECREMENT_COUNT_PAY_BY_CART: {
      const newArr = [...state]

      newArr.forEach(item => {
        if (item.id === action.payload) {
          item.countPay = item.countPay + 1
        }
      })
      return state = [...newArr]
    }

    case INCREMENT_COUNT_PAY_BY_CART: {
      const newArr = [...state]

      newArr.forEach(item => {
        if (item.id === action.payload) {
          item.countPay = item.countPay - 1
        }
      })
      console.log(newArr);
      return state = [...newArr]
    }

    case ONCHANGE_NUMBER_INPUT_BY_CART: {
      const newArr = [...state]
      newArr.forEach(item => {
        if (item.id === action.payload.id) {
          item.countPay = item.countPay + action.payload.numberCurrent
          item.countPay = item.countPay - Number(action.payload.value)
        }
      })
      return state = [...newArr]
    }

    case SET_EVALUATE: {
      const newArr = [...state]
      newArr.forEach(item => {
        if (item.id === action.payload.id) {
          item.evaluates.forEach(elem => {
            if (elem.id === action.payload.id) {
              elem.point = action.payload.evaluate
            }
          });
        }
      })
      return state = [...newArr]
    }
    default:
      return state
  };
}

export default productReducer
