import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILED,
    CHANGE_PASSWORD_REQUEST,
    DELETE_USER_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    DELETE_USER_SUCCESS,
    CHANGE_PASSWORD_FAILED, DELETE_USER_FAILED
} from '../../constants/UserConstants';

const initialState = {
    isLoading: false,
    user: {},
    errors: []
};

const UserReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_USER_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
        case DELETE_USER_REQUEST:
        case EDIT_USER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case EDIT_USER_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
        case DELETE_USER_SUCCESS:
        case FETCH_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: payload.user,
                errors: []
            };
        }
        case FETCH_USER_FAILED:
        case CHANGE_PASSWORD_FAILED:
        case DELETE_USER_FAILED:
        case EDIT_USER_FAILED: {
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

export default UserReducer;