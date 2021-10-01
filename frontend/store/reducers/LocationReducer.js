import {
    FETCH_LOCATION_REQUEST,
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_ERROR
} from '../../constants/LocationConstants';

const initialState = {
    isLoading: false,
    location: {
        lat: 47.497913,
        lng: 19.040236
    },
    errors: []
};

const LocationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_LOCATION_REQUEST: {
            return {
                ...state,
                errors: [],
                isLoading: true
            };
        }
        case FETCH_LOCATION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                location: payload.location,
                errors: []
            };
        }
        case FETCH_LOCATION_ERROR: {
            return {
                ...state,
                isLoading: false,
                errors: payload.errors
            };
        }
        default:
            return initialState;
    }

};

export default LocationReducer;