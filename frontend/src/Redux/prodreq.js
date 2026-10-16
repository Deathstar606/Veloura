import * as ActionTypes from './ActionTypes';

export const ProdReq = (state = { 
    isLoading: true,
    errMess: null,
    prodreq:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PRODREQ:
            return {...state, isLoading: false, errMess: null, prodreq: action.payload};

        case ActionTypes.PRODREQ_LOADING:
            return {...state, isLoading: true, errMess: null, prodreq: []}

        case ActionTypes.PRODREQ_LOADING:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked