import {
    fetchActivitiesRequest,
    fetchActivitiesSuccess,
    fetchActivitiesFailed
} from '../store/actions/ActivitiesActions';
import ENV from '../constants/env';

const axios = require('axios');

export const fetchActivities = (location, types, radius = 1500, keyword = '', maxPrice = 4, minPrice = 0, openNow = true) => {
    const activitiesUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${ location.latitude }%2C${ location.longitude }&radius=${ radius }&type=${ types }&key=${ ENV().googleApiKey }`;

    return async (dispatch) => {
        try {
            dispatch(fetchActivitiesRequest());
            const activitiesResponse = await axios.get(activitiesUri);
            dispatch(fetchActivitiesSuccess(activitiesResponse.data.results));
        } catch (err) {
            dispatch(fetchActivitiesFailed(err));
        }
    };
};