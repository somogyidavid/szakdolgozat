import {
    FETCH_STATISTICS_FAILED,
    FETCH_STATISTICS_REQUEST,
    FETCH_STATISTICS_SUCCESS
} from '../../constants/StatisticsConstants';

const initialState = {
    isLoading: false,
    statistics: [],
    errors: []
};

const StatisticsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_STATISTICS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                errors: []
            };
        }
        case FETCH_STATISTICS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                statistics: [...state.statistics, payload.statistics],
                errors: []
            };
        }
        case FETCH_STATISTICS_FAILED: {
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

export default StatisticsReducer;