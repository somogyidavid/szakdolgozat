import {
    AUTHENTICATE_ERROR,
    AUTHENTICATE_REQUEST,
    AUTHENTICATE_SUCCESS,
    DID_TRY_AUTO_LOGIN,
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS
} from '../../constants/AuthConstants';

export const setDidTryAutoLogin = () => {
    return {
        type: DID_TRY_AUTO_LOGIN
    };
};

export const authenticateRequested = () => {
    return {
        type: AUTHENTICATE_REQUEST
    };
};

export const authenticateSuccess = (userId, token) => {
    return {
        type: AUTHENTICATE_SUCCESS,
        payload: {
            userId,
            token
        }
    };
};

export const authenticateFailed = (errors) => {
    return {
        type: AUTHENTICATE_ERROR,
        payload: {
            errors
        }
    };
};

export const signupRequest = () => {
    return {
        type: SIGNUP_REQUEST
    };
};

export const signupSuccess = (email, password) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: {
            email,
            password
        }
    };
};

export const signupFailed = (errors) => {
    return {
        type: SIGNUP_ERROR,
        payload: {
            errors
        }
    };
};

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

export const loginSuccess = (email, password) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            email,
            password
        }
    };
};

export const loginFailed = (errors) => {
    return {
        type: LOGIN_ERROR,
        payload: {
            errors
        }
    };
};

export const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

export const logoutFailed = (errors) => {
    return {
        type: LOGOUT_ERROR,
        payload: {
            errors
        }
    };
};