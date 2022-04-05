import {
    fetchStatisticsFailed,
    fetchStatisticsRequest,
    fetchStatisticsSuccess
} from '../store/actions/StatisticsActions';
import api from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHeader } from '../constants/constants';

export const getActivitiesForMonths = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchStatisticsRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.get('/activities/statistics/months', getHeader(token));

            dispatch(fetchStatisticsSuccess(response.data));
        } catch (err) {
            dispatch(fetchStatisticsFailed(err.response));
        }
    };
};

export const getActivitiesCountForSeasons = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchStatisticsRequest());

            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.get('/activities/statistics/seasons', getHeader(token));

            dispatch(fetchStatisticsSuccess(response.data));
        } catch (err) {
            dispatch(fetchStatisticsFailed(err.response));
        }
    };
};