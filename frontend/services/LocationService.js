import { fetchLocationRequested, fetchLocationSuccess, fetchLocationFailed } from '../store/actions/LocationActions';

export const fetchLocation = (location) => {
    return async (dispatch) => {
        try {
            dispatch(fetchLocationRequested());
            dispatch(fetchLocationSuccess(location));
        } catch (err) {
            const { data } = err.response;
            dispatch(fetchLocationFailed(data));
        }
    };
};