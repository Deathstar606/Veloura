import * as ActionTypes from './ActionTypes';

export const Sunglass = (state = { 
    isLoading: true,
    errMess: null,
    sunglass:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SUNGLASSES:
            return {...state, isLoading: false, errMess: null, sunglass: action.payload};

        case ActionTypes.SUNGLASSES_LOADING:
            return {...state, isLoading: true, errMess: null, sunglass: []}

        case ActionTypes.SUNGLASSES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};