import * as ActionTypes from './ActionTypes';

export const Feats = (state = { 
    isLoading: true,
    errMess: null,
    feats:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEATS:
            return {...state, isLoading: false, errMess: null, feats: action.payload};

        case ActionTypes.FEATS_LOADING:
            return {...state, isLoading: true, errMess: null, feats: []}

        case ActionTypes.FEATS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

//sevarel things needed to be checked