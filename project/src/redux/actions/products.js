import {
  GET_PRODUCT,
  // DECREMENT_COUNT_PAY,
  // DECREMENT_COUNT_PAY_PROFILE,
  // DECREMENT_COUNT_PAY_BY_CART,
  // INCREMENT_COUNT_PAY_BY_CART,
  // ONCHANGE_NUMBER_INPUT_BY_CART,
  SET_EVALUATE,
  DELETE_ITEM_BY_PAY_CART,
  COMMENT_PRODUCT,
  REPLY_COMMENT_PRODUCT
} from '../actionType'

export const getProduct = (payload) => {
  return {
    type: GET_PRODUCT,
    payload
  }
}

// export const decrementCountPay = (payload) => {
//   return {
//     type: DECREMENT_COUNT_PAY,
//     payload
//   }
// }

// export const decrementCountPayProfile = (payload) => {
//   return {
//     type: DECREMENT_COUNT_PAY_PROFILE,
//     payload
//   }
// }

// export const decrementCountPayByCart = (payload) => {
//   return {
//     type: DECREMENT_COUNT_PAY_BY_CART,
//     payload
//   }
// }

// export const incrementCountPayByCart = (payload) => {
//   return {
//     type: INCREMENT_COUNT_PAY_BY_CART,
//     payload
//   }
// }

// export const onchangeInputPayByCart = (payload) => {
//   return {
//     type: ONCHANGE_NUMBER_INPUT_BY_CART,
//     payload
//   }
// }

export const setEvaluate = (payload) => {
  return {
    type: SET_EVALUATE,
    payload
  }
}

export const deleteItemByPayCart = (payload) => {
  return {
    type: DELETE_ITEM_BY_PAY_CART,
    payload
  }
}


export const commentProduct = (payload) => {
  return {
    type: COMMENT_PRODUCT,
    payload
  }
}

export const replyCommentProduct = (payload) => {
  return {
    type: REPLY_COMMENT_PRODUCT,
    payload
  }
}
