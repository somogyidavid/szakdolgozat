import { FETCH_SIGHTS_REQUEST, FETCH_SIGHTS_SUCCESS, FETCH_SIGHTS_FAILED } from '../../constants/SightsConstants';

export const fetchSightsRequest = () => {
    return {
        type: FETCH_SIGHTS_REQUEST
    };
};

export const fetchSightsSuccess = (sights) => {
    return {
        type: FETCH_SIGHTS_SUCCESS,
        payload: {
            sights
        }
    };
};

export const fetchSightsFailed = (errors) => {
    return {
        type: FETCH_SIGHTS_FAILED,
        payload: {
            errors
        }
    };
};