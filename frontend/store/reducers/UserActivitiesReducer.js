import {
    DELETE_USER_ACTIVITY_FAILED,
    DELETE_USER_ACTIVITY_REQUEST,
    DELETE_USER_ACTIVITY_SUCCESS,
    EDIT_USER_ACTIVITY_FAILED,
    EDIT_USER_ACTIVITY_REQUEST,
    EDIT_USER_ACTIVITY_SUCCESS,
    FETCH_USER_ACTIVITIES_FAILED,
    FETCH_USER_ACTIVITIES_REQUEST,
    FETCH_USER_ACTIVITIES_SUCCESS,
    INSERT_USER_ACTIVITY_FAILED,
    INSERT_USER_ACTIVITY_REQUEST,
    INSERT_USER_ACTIVITY_SUCCESS
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
        case EDIT_USER_ACTIVITY_REQUEST:
        case DELETE_USER_ACTIVITY_REQUEST:
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
        case EDIT_USER_ACTIVITY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                activities: state.activities.map((activity) => {
                    if (activity._id === payload.activity._id) {
                        return payload.activity;
                    }

                    return activity;
                }),
                errors: []
            };
        }
        case DELETE_USER_ACTIVITY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                activities: state.activities.filter(activity => activity._id !== payload.activity._id),
                errors: []
            };
        }
        case INSERT_USER_ACTIVITY_FAILED:
        case EDIT_USER_ACTIVITY_FAILED:
        case DELETE_USER_ACTIVITY_FAILED:
        case FETCH_USER_ACTIVITIES_FAILED: {
            return {
                ...state,
                isLoading: false,
                errors: [...state.errors, payload.errors]
            };
        }
        default:
            return state;
    }
};

export default UserActivitiesReducer;