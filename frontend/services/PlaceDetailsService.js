import {
    fetchPlaceDetailsFailed,
    fetchPlaceDetailsRequest,
    fetchPlaceDetailsSuccess
} from '../store/actions/PlaceDetailsActions';
import ENV from '../constants/env';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../helpers/api';
import { getHeader } from '../constants/constants';

export const fetchPlaceDetails = (placeId) => {

    return async (dispatch) => {
        try {
            dispatch(fetchPlaceDetailsRequest());

            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const response = await api.post('/activities/places/details', {
                placeId: placeId,
                language: Localization.locale
            }, getHeader(token));

            console.log(response.data);

            dispatch(fetchPlaceDetailsSuccess(response.data.result));
        } catch (err) {
            dispatch(fetchPlaceDetailsFailed(err));
        }
    };
};