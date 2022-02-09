import { fetchSightsRequest, fetchSightsSuccess, fetchSightsFailed } from '../store/actions/SightsActions';
import ENV from '../constants/env';
import * as Localization from 'expo-localization';

const axios = require('axios');

export const fetchSights = (location) => {
    const sightsUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${ location.latitude }%2C${ location.longitude }&radius=3000&language=${ Localization.locale }&type=tourist_attraction&key=${ ENV().googleApiKey }`;

    return async (dispatch) => {
        try {
            dispatch(fetchSightsRequest());
            const sightsResponse = await axios.get(sightsUri);
            dispatch(fetchSightsSuccess(sightsResponse.data.results));
        } catch (err) {
            dispatch(fetchSightsFailed(err));
        }
    };
};