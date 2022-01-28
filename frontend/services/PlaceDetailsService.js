import {
    fetchPlaceDetailsRequest,
    fetchPlaceDetailsSuccess,
    fetchPlaceDetailsFailed
} from '../store/actions/PlaceDetailsActions';
import ENV from '../constants/env';

const axios = require('axios');

export const fetchPlaceDetails = (placeId) => {
    const placeDetailsUri = `https://maps.googleapis.com/maps/api/place/details/json?language=hu&place_id=${ placeId }&key=${ ENV().googleApiKey }`;

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