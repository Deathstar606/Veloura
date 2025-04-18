import * as ActionTypes from './ActionTypes';

export const cart = (state = {
        isLoading: true,
        errMess: null,
        cart: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CARTS:
            return {...state, isLoading: false, errMess: null, cart: action.payload};

        case ActionTypes.ADD_CART:
            var car = action.payload;
            return {...state, isLoading: false, errMess: null, cart: [...state.cart, car]};

        case ActionTypes.CARTS_LOADING:
            return {...state, isLoading: true, errMess: null, cart: []};

        case ActionTypes.CARTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, cart: null};

        default:
            return state;
    }
}