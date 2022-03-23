import {
    authenticateFailed,
    authenticateRequested,
    authenticateSuccess,
    loginFailed,
    loginRequest,
    loginSuccess,
    logoutFailed,
    logoutRequest,
    logoutSuccess,
    setDidTryAutoLogin as setDidTryAutoLoginAction,
    signupFailed,
    signupRequest,
    signupSuccess,
} from '../store/actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { expirationTime, getHeader } from '../constants/constants';
import api from '../helpers/api';
import { fetchUserFailed, fetchUserRequest, fetchUserSuccess } from '../store/actions/UserActions';

let timer;

export const setDidTryAutoLogin = () => {
    return (dispatch) => {
        dispatch(setDidTryAutoLoginAction());
    };
};

export const authenticate = (userId, token, expiryTime) => {
    return async (dispatch) => {
        try {
            dispatch(authenticateRequested());
            dispatch(setLogoutTimer(expiryTime));
            dispatch(authenticateSuccess(userId, token));
        } catch (err) {
            dispatch(authenticateFailed(err));
        } finally {
            try {
                dispatch(fetchUserRequest());
                const response = await api.get(`/users/${ userId }`, getHeader(token));
                dispatch(fetchUserSuccess(response.data));
            } catch (err) {
                dispatch(fetchUserFailed(err.response));
            }
        }
    };
};

export const signup = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(signupRequest());

            const response = await api.post('/auth/register', {
                email: email,
                password: password
            });

            dispatch(signupSuccess(email, password));
            dispatch(authenticate(response.data.user._id, response.data.token, expirationTime.value * 1000));

            const expirationDate = new Date(new Date().getTime() + +expirationTime.value * 1000);
            await saveDataToStorage(response.data.token, response.data.user._id, expirationDate);
        } catch (err) {
            dispatch(signupFailed(err));
        }
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest());

            const response = await api.post('/auth/login', {
                email: email,
                password: password
            });

            dispatch(loginSuccess(email, password));
            dispatch(authenticate(response.data.user._id, response.data.token, expirationTime.value * 1000));

            const expirationDate = new Date(new Date().getTime() + +expirationTime.value * 1000);
            await saveDataToStorage(response.data.token, response.data.user._id, expirationDate);
        } catch (err) {
            dispatch(loginFailed(err.response));
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        try {
            dispatch(logoutRequest());
            clearLogoutTimer();
            AsyncStorage.removeItem('userData');
            dispatch(logoutSuccess());
        } catch (err) {
            dispatch(logoutFailed(err));
        }
    };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = (expirationTime) => {
    return (dispatch) => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

const saveDataToStorage = async (token, userId, expirationDate) => {
    await AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
};