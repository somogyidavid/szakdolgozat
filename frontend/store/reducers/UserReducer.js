import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILED
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
        case EDIT_USER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case EDIT_USER_SUCCESS:
        case FETCH_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: payload.user,
                errors: []
            };
        }
        case FETCH_USER_FAILED:
        case EDIT_USER_FAILED: {
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

export default UserReducer;