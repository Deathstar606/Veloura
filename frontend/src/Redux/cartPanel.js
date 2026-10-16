// src/redux/cartPanel.js
import * as ActionTypes from './ActionTypes';

const initialState = {
  isOpen: false
};

export const cartPanel = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_CART_PANEL:
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};
