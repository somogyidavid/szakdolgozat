import {
    FETCH_LOCATION_REQUEST,
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_ERROR
} from '../../constants/LocationConstants';

export const fetchLocationRequested = () => {
    return {
        type: FETCH_LOCATION_REQUEST
    };
};

export const fetchLocationSuccess = (location) => {
    return {
        type: FETCH_LOCATION_SUCCESS,
        payload: {
            location
        }
    };
};

export const fetchLocationFailed = (errors) => {
    return {
        type: FETCH_LOCATION_ERROR,
        payload: {
            errors
        }
    };
};