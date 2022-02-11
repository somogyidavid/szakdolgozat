import {
    AUTHENTICATE_REQUEST,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_ERROR,
    DID_TRY_AUTO_LOGIN,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR, FIRST_LAUNCH
} from '../../constants/AuthConstants';

const initialState = {
    isLoading: false,
    token: null,
    userId: null,
    email: null,
    password: null,
    didTryAutoLogin: false,
    errors: []
};

const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATE_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case AUTHENTICATE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                userId: payload.userId,
                token: payload.token,
                didTryAutoLogin: true,
                errors: []
            };
        }
        case AUTHENTICATE_ERROR: {
            return {
                ...state,
                isLoading: false,
                errors: [...state.errors, payload.errors]
            };
        }
        case SIGNUP_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                email: payload.email,
                password: payload.password,
                didTryAutoLogin: true,
                errors: []
            };
        }
        case SIGNUP_ERROR: {
            return {
                ...state,
                isLoading: false,
                errors: [...state.errors, payload.errors]
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                email: payload.email,
                password: payload.password,
                didTryAutoLogin: true,
                errors: []
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                isLoading: false,
                errors: [...state.errors, payload.errors]
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...initialState,
                isLoading: false,
                errors: []
            };
        }
        case LOGOUT_ERROR: {
            return {
                ...state,
                isLoading: false,
                errors: [...state.errors, payload.errors]
            };
        }
        case DID_TRY_AUTO_LOGIN: {
            return {
                ...state,
                didTryAutoLogin: true
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;