import {
    AUTH_START,
    AUTH_SUCCESS, 
    AUTH_LOGOUT,
    AUTH_ERROR,
    AUTH_CLEAR_ERROR
} from '../actions/actionTypes'

const initialState = {
    loading: false,
    isLogin: false, 
    token: null,
    error: null
}

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case AUTH_START:
            return {
                ...state,
                loading: true,
                isLogin: action.isLogin
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                loading: false
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }
        case AUTH_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }    
        case AUTH_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }    
        default: 
            return state
    }
}