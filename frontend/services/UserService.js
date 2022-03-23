import {
    changePasswordFailed,
    changePasswordRequest,
    changePasswordSuccess,
    deleteUserFailed,
    deleteUserRequest,
    deleteUserSuccess,
    editUserFailed,
    editUserRequest,
    editUserSuccess,
    fetchUserFailed,
    fetchUserRequest,
    fetchUserSuccess
} from '../store/actions/UserActions';
import api from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHeader } from '../constants/constants';
import { Toast } from 'native-base';
import i18n from 'i18n-js';
import { logout } from './AuthService';

export const fetchUser = (userId) => {
    return async (dispatch) => {
        try {
            dispatch(fetchUserRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.get(`/users/${ userId }`, getHeader(token));

            dispatch(fetchUserSuccess({
                email: response.data.email,
                name: response.data.name,
                age: response.data.age,
                description: response.data.description,
                interests: response.data.interests
            }));
        } catch (err) {
            dispatch(fetchUserFailed(err.response));
        }
    };
};

export const editUser = (editedUser) => {
    return async (dispatch) => {
        try {
            dispatch(editUserRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.put('/users/', {
                name: editedUser.name,
                age: editedUser.age,
                description: editedUser.description,
                interests: editedUser.interests
            }, getHeader(token));

            dispatch(editUserSuccess({
                email: response.data.email,
                name: response.data.name,
                age: response.data.age,
                description: response.data.description,
                interests: response.data.interests
            }));
        } catch (err) {
            dispatch(editUserFailed(err));
        }
    };
};

export const changePassword = (password, newPassword, newPasswordConfirm) => {
    return async (dispatch) => {
        try {
            dispatch(changePasswordRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.put('/users/changePassword', {
                password,
                newPassword,
                newPasswordConfirm
            }, getHeader(token));

            dispatch(changePasswordSuccess({
                email: response.data.email,
                name: response.data.name,
                age: response.data.age,
                description: response.data.description,
                interests: response.data.interests
            }));
            Toast.show({
                title: i18n.t('success'),
                description: 'Sikeres jelszó módosítás!',
                status: 'success',
                placement: 'bottom'
            });
        } catch (err) {
            dispatch(changePasswordFailed(err.response));
        }
    };
};

export const deleteUser = (password, passwordConfirm) => {
    return async (dispatch) => {
        try {
            dispatch(deleteUserRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.delete('/users/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`
                },
                data: {
                    password,
                    passwordConfirm
                }
            });

            dispatch(deleteUserSuccess({
                email: response.data.email,
                name: response.data.name,
                age: response.data.age,
                description: response.data.description,
                interests: response.data.interests
            }));
            await AsyncStorage.removeItem('firstLaunch');
            dispatch(logout());
        } catch (err) {
            dispatch(deleteUserFailed(err.response));
        }
    };
};