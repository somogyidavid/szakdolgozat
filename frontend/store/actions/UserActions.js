import {
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    DELETE_USER_FAILED,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    EDIT_USER_FAILED,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    FETCH_USER_FAILED,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS
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

export const changePasswordRequest = () => {
    return {
        type: CHANGE_PASSWORD_REQUEST
    };
};

export const changePasswordSuccess = (user) => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: {
            user
        }
    };
};

export const changePasswordFailed = (errors) => {
    return {
        type: CHANGE_PASSWORD_FAILED,
        payload: {
            errors
        }
    };
};

export const deleteUserRequest = () => {
    return {
        type: DELETE_USER_REQUEST
    };
};

export const deleteUserSuccess = (user) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: {
            user
        }
    };
};

export const deleteUserFailed = (errors) => {
    return {
        type: DELETE_USER_FAILED,
        payload: {
            errors
        }
    };
};