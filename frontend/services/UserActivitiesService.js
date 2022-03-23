import {
    deleteUserActivityFailed,
    deleteUserActivityRequest,
    deleteUserActivitySuccess,
    editUserActivityFailed,
    editUserActivityRequest,
    editUserActivitySuccess,
    fetchUserActivitiesFailed,
    fetchUserActivitiesRequest,
    fetchUserActivitiesSuccess,
    insertUserActivityFailed,
    insertUserActivityRequest,
    insertUserActivitySuccess
} from '../store/actions/UserActivitiesActions';
import api from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHeader } from '../constants/constants';
import { Toast } from 'native-base';
import i18n from 'i18n-js';

export const fetchUserActivities = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchUserActivitiesRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.get('/activities', getHeader(token));

            dispatch(fetchUserActivitiesSuccess(response.data));
        } catch (err) {
            dispatch(fetchUserActivitiesFailed(err));
        }
    };
};

export const insertUserActivity = (activity) => {
    return async (dispatch) => {
        try {
            dispatch(insertUserActivityRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.post('/activities/create', activity, getHeader(token));

            dispatch(insertUserActivitySuccess(response.data));
            Toast.show({
                title: i18n.t('success'),
                description: 'A program bekerült a naptáradba!',
                status: 'success',
                placement: 'bottom'
            });
        } catch (err) {
            dispatch(insertUserActivityFailed(err.response));
        }
    };
};

export const editUserActivity = (activity) => {
    return async (dispatch) => {
        try {
            dispatch(editUserActivityRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.put(`/activities/${ activity._id }`, activity, getHeader(token));

            dispatch(editUserActivitySuccess(response.data));
            Toast.show({
                title: i18n.t('success'),
                description: 'Sikeres módosítás!',
                status: 'success',
                placement: 'bottom'
            });
        } catch (err) {
            dispatch(editUserActivityFailed(err.response));
        }
    };
};

export const deleteUserActivity = (activity) => {
    return async (dispatch) => {
        try {
            dispatch(deleteUserActivityRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.delete(`/activities/${ activity._id }`, getHeader(token));

            dispatch(deleteUserActivitySuccess(response.data));
            Toast.show({
                title: i18n.t('success'),
                description: 'Sikeres törlés!',
                status: 'success',
                placement: 'bottom'
            });
        } catch (err) {
            dispatch(deleteUserActivityFailed(err.response));
        }
    };
};