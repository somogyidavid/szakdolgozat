import {
    FETCH_USER_ACTIVITIES_REQUEST,
    FETCH_USER_ACTIVITIES_SUCCESS,
    FETCH_USER_ACTIVITIES_FAILED,
    INSERT_USER_ACTIVITY_REQUEST,
    INSERT_USER_ACTIVITY_SUCCESS,
    INSERT_USER_ACTIVITY_FAILED
} from '../../constants/UserActivitiesConstants';

const initialState = {
    isLoading: false,
    activities: [],
    errors: []
};

const UserActivitiesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case INSERT_USER_ACTIVITY_REQUEST:
        case FETCH_USER_ACTIVITIES_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case FETCH_USER_ACTIVITIES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                activities: payload.activities,
                errors: []
            };
        }
        case INSERT_USER_ACTIVITY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                activities: [...state.activities, payload.activity],
                errors: []
            };
        }
        case INSERT_USER_ACTIVITY_FAILED:
        case FETCH_USER_ACTIVITIES_FAILED: {
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

export default UserActivitiesReducer;