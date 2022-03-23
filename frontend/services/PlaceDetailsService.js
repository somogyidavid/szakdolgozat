import {
    fetchPlaceDetailsFailed,
    fetchPlaceDetailsRequest,
    fetchPlaceDetailsSuccess
} from '../store/actions/PlaceDetailsActions';
import ENV from '../constants/env';
import * as Localization from 'expo-localization';

const axios = require('axios');

export const fetchPlaceDetails = (placeId) => {
    const placeDetailsUri = `https://maps.googleapis.com/maps/api/place/details/json?language=${ Localization.locale }&place_id=${ placeId }&key=${ ENV().googleApiKey }`;

    return async (dispatch) => {
        try {
            dispatch(fetchPlaceDetailsRequest());
            const placeDetailsResponse = await axios.get(placeDetailsUri);
            dispatch(fetchPlaceDetailsSuccess(placeDetailsResponse.data.result));
        } catch (err) {
            dispatch(fetchPlaceDetailsFailed(err));
        }
    };
};