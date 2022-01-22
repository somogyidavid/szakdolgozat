import {
    FETCH_ACTIVITIES_REQUEST,
    FETCH_ACTIVITIES_SUCCESS,
    FETCH_ACTIVITIES_FAILED
} from '../../constants/ActivitiesConstants';

const initialState = {
    isLoading: false,
    activities: [],
    errors: []
};

const ActivitiesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_ACTIVITIES_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case FETCH_ACTIVITIES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                activities: payload.activities,
                errors: []
            };
        }
        case FETCH_ACTIVITIES_FAILED: {
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

export default ActivitiesReducer;