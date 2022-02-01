import {
    FETCH_USER_ACTIVITIES_REQUEST,
    FETCH_USER_ACTIVITIES_SUCCESS,
    FETCH_USER_ACTIVITIES_FAILED,
    INSERT_USER_ACTIVITY_REQUEST,
    INSERT_USER_ACTIVITY_SUCCESS,
    INSERT_USER_ACTIVITY_FAILED
} from '../../constants/UserActivitiesConstants';
import activityItem from '../../components/ui/ActivityItem';

export const fetchUserActivitiesRequest = () => {
    return {
        type: FETCH_USER_ACTIVITIES_REQUEST
    };
};

export const fetchUserActivitiesSuccess = (activities) => {
    return {
        type: FETCH_USER_ACTIVITIES_SUCCESS,
        payload: {
            activities
        }
    };
};

export const fetchUserActivitiesFailed = (errors) => {
    return {
        type: FETCH_USER_ACTIVITIES_FAILED,
        payload: {
            errors
        }
    };
};

export const insertUserActivityRequest = () => {
    return {
        type: INSERT_USER_ACTIVITY_REQUEST
    };
};

export const insertUserActivitySuccess = (activity) => {
    return {
        type: INSERT_USER_ACTIVITY_SUCCESS,
        payload: {
            activity
        }
    };
};

export const insertUserActivityFailed = (errors) => {
    return {
        type: INSERT_USER_ACTIVITY_FAILED,
        payload: {
            errors
        }
    };
};