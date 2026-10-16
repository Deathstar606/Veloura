import * as ActionTypes from './ActionTypes';

export const Vouchers = (state = { 
    isLoading: true,
    errMess: null,
    vouchers:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_VOUCHERS:
            return {...state, isLoading: false, errMess: null, vouchers: action.payload};

        case ActionTypes.VOUCHER_LOADING:
            return {...state, isLoading: true, errMess: null, vouchers: []}

        case ActionTypes.VOUCHER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked