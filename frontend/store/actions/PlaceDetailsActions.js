import {
    FETCH_PLACE_DETAILS_REQUEST,
    FETCH_PLACE_DETAILS_SUCCESS,
    FETCH_PLACE_DETAILS_FAILED
} from '../../constants/PlaceDetailsConstants';

export const fetchPlaceDetailsRequest = () => {
    return {
        type: FETCH_PLACE_DETAILS_REQUEST
    };
};

export const fetchPlaceDetailsSuccess = (placeDetails) => {
    return {
        type: FETCH_PLACE_DETAILS_SUCCESS,
        payload: {
            placeDetails
        }
    };
};

export const fetchPlaceDetailsFailed = (errors) => {
    return {
        type: FETCH_PLACE_DETAILS_FAILED,
        payload: {
            errors
        }
    };
};