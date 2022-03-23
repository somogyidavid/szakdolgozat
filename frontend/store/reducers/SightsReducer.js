import { FETCH_SIGHTS_FAILED, FETCH_SIGHTS_REQUEST, FETCH_SIGHTS_SUCCESS } from '../../constants/SightsConstants';

const initialState = {
    isLoading: false,
    sights: [],
    errors: []
};

const SightsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_SIGHTS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case FETCH_SIGHTS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                sights: payload.sights,
                errors: []
            };
        }
        case FETCH_SIGHTS_FAILED: {
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

export default SightsReducer;