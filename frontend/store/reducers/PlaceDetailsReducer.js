import {
    FETCH_PLACE_DETAILS_FAILED,
    FETCH_PLACE_DETAILS_REQUEST,
    FETCH_PLACE_DETAILS_SUCCESS
} from '../../constants/PlaceDetailsConstants';

const initialState = {
    isLoading: false,
    placeDetails: {},
    errors: []
};

const PlaceDetailsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_PLACE_DETAILS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case FETCH_PLACE_DETAILS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                placeDetails: payload.placeDetails,
                errors: []
            };
        }
        case FETCH_PLACE_DETAILS_FAILED: {
            return {
                ...state,
                isLoading: false,
                errors: payload.errors
            };
        }
        default:
            return state;
    }
};

export default PlaceDetailsReducer;