import { fetchSightsFailed, fetchSightsRequest, fetchSightsSuccess } from '../store/actions/SightsActions';
import * as Localization from 'expo-localization';
import api from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHeader } from '../constants/constants';

export const fetchSights = (location) => {
    return async (dispatch) => {
        try {
            dispatch(fetchSightsRequest());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.post('/activities/recommend/request', {
                latitude: location.latitude,
                longitude: location.longitude,
                radius: 3000,
                types: [{
                    title: 'Tourist Attraction',
                    type: 'tourist_attraction'
                }],
                language: Localization.locale
            }, getHeader(token));

            dispatch(fetchSightsSuccess(response.data.results));
        } catch (err) {
            dispatch(fetchSightsFailed(err.response));
        }
    };
};