import {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailed,
    editUserRequest,
    editUserSuccess,
    editUserFailed
} from '../store/actions/UserActions';
import api from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHeader } from '../constants/constants';

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

            const response = await api.put(`/users/${ editedUser.userId }`, {
                name: editedUser.name,
                age: editedUser.age,
                interests: editedUser.interests
            }, getHeader(token));

            dispatch(editUserSuccess({
                email: response.data.email,
                name: response.data.name,
                age: response.data.age,
                interests: response.data.interests
            }));
        } catch (err) {
            dispatch(editUserFailed(err));
        }
    };
};