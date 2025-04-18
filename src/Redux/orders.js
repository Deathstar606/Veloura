import * as ActionTypes from './ActionTypes';

export const Orders = (state = { errMess: null, orders: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ORDERS:
      return { ...state, errMess: null, orders: action.payload };

    case ActionTypes.ORDERS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_ORDER:
      var order = action.payload;
      return { ...state, orders: state.orders.concat(order) };

    default:
      return state;
  }
};
