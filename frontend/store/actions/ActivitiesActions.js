import {
    FETCH_ACTIVITIES_FAILED,
    FETCH_ACTIVITIES_REQUEST,
    FETCH_ACTIVITIES_SUCCESS
} from '../../constants/ActivitiesConstants';

export const fetchActivitiesRequest = () => {
    return {
        type: FETCH_ACTIVITIES_REQUEST
    };
};

export const fetchActivitiesSuccess = (activities) => {
    return {
        type: FETCH_ACTIVITIES_SUCCESS,
        payload: {
            activities
        }
    };
};

export const fetchActivitiesFailed = (errors) => {
    return {
        type: FETCH_ACTIVITIES_FAILED,
        payload: {
            errors
        }
    };
};