import {
    FETCH_STATISTICS_REQUEST,
    FETCH_STATISTICS_SUCCESS,
    FETCH_STATISTICS_FAILED
} from '../../constants/StatisticsConstants';

export const fetchStatisticsRequest = () => {
    return {
        type: FETCH_STATISTICS_REQUEST
    };
};

export const fetchStatisticsSuccess = (statistics) => {
    return {
        type: FETCH_STATISTICS_SUCCESS,
        payload: {
            statistics
        }
    };
};

export const fetchStatisticsFailed = (errors) => {
    return {
        type: FETCH_STATISTICS_FAILED,
        payload: {
            errors
        }
    };
};