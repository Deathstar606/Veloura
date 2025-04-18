import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    errMess: null
};

export const Auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
            };
        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', action.user.token);
            localStorage.setItem('user', JSON.stringify(action.user));
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                user: action.user
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };
        default:
            return state
    }
}