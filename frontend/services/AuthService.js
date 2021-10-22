import {
    authenticateRequested,
    authenticateSuccess,
    authenticateFailed,
    signupRequest,
    signupSuccess,
    signupFailed,
    loginRequest,
    loginSuccess,
    loginFailed,
    logoutRequest,
    logoutSuccess,
    logoutFailed,
    setDidTryAutoLogin as setDidTryAutoLoginAction
} from '../store/actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../constants/env';

const axios = require('axios');

let timer;

export const setDidTryAutoLogin = () => {
    return (dispatch) => {
        dispatch(setDidTryAutoLoginAction());
    };
};

export const authenticate = (userId, token, expiryTime) => {
    return (dispatch) => {
        try {
            dispatch(authenticateRequested());
            dispatch(setLogoutTimer(expiryTime));
            dispatch(authenticateSuccess(userId, token));
        } catch (err) {
            dispatch(authenticateFailed(err));
        }
    };
};

export const signup = (email, password) => {
    const signupUri = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ env().firebaseApiKey }`;

    return async (dispatch) => {
        try {
            dispatch(signupRequest());
            const response = await axios({
                url: signupUri,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
            dispatch(signupSuccess(email, password));
            dispatch(authenticate(response.data.localId, response.data.idToken, parseInt(response.data.expiresIn * 1000)));

            const expirationDate = new Date(new Date().getTime() + +response.data.expiresIn * 1000);
            await saveDataToStorage(response.data.idToken, response.data.localId, expirationDate);
        } catch (err) {
            dispatch(signupFailed(err));
        }
    };
};

export const login = (email, password) => {
    const signInUri = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ env().firebaseApiKey }`;

    return async (dispatch) => {
        try {
            dispatch(loginRequest());
            const response = await axios({
                method: 'POST',
                url: signInUri,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

            dispatch(loginSuccess(email, password));
            dispatch(authenticate(response.data.localId, response.data.idToken, parseInt(response.data.expiresIn * 1000)));

            const expirationDate = new Date(new Date().getTime() + +response.data.expiresIn * 1000);
            await saveDataToStorage(response.data.idToken, response.data.localId, expirationDate);
        } catch (err) {
            dispatch(loginFailed(err));
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