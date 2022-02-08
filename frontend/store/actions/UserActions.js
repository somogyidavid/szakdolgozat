import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILED
} from '../../constants/UserConstants';

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    };
};

export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: {
            user
        }
    };
};

export const fetchUserFailed = (errors) => {
    return {
        type: FETCH_USER_FAILED,
        payload: {
            errors
        }
    };
};

export const editUserRequest = () => {
    return {
        type: EDIT_USER_REQUEST
    };
};

export const editUserSuccess = (user) => {
    return {
        type: EDIT_USER_SUCCESS,
        payload: {
            user
        }
    };
};

export const editUserFailed = (errors) => {
    return {
        type: EDIT_USER_FAILED,
        payload: {
            errors
        }
    };
};