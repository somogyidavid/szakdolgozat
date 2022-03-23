import {
    fetchActivitiesFailed,
    fetchActivitiesRequest,
    fetchActivitiesSuccess
} from '../store/actions/ActivitiesActions';
import api from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { getHeader } from '../constants/constants';

export const fetchActivities = (location, types, radius = 1500, keyword = '', maxPrice = 4, minPrice = 0, openNow = true) => {
    return async (dispatch) => {
        try {
            dispatch(fetchActivitiesRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];
            const language = Localization.locale;

            const response = await api.post('/activities/recommend/request', {
                latitude: location.latitude,
                longitude: location.longitude,
                types,
                radius,
                language,
                keyword,
                maxPrice,
                minPrice,
                openNow
            }, getHeader(token));

            dispatch(fetchActivitiesSuccess(response.data.results));
        } catch (err) {
            dispatch(fetchActivitiesFailed(err.response));
        }
    };
};