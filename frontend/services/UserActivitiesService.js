import {
    fetchUserActivitiesRequest,
    fetchUserActivitiesSuccess,
    fetchUserActivitiesFailed,
    insertUserActivityRequest,
    insertUserActivitySuccess,
    insertUserActivityFailed
} from '../store/actions/UserActivitiesActions';
import moment from 'moment';

const axios = require('axios');

export const tempActivities = [{
    name: 'Gösser Club Panzió és Étterem',
    isAllDay: true,
    startingDate: moment('2022-01-30'),
    endingDate: moment('2022-01-30'),
    location: {
        city: 'Balassagyarmat',
        formattedAddress: 'Balassagyarmat, Teleki László utca 14',
        latitude: 48.0770013,
        longitude: 19.2942338
    },
    reminder: 60,
    timeType: 'minute',
    details: {}
}];

export const fetchUserActivities = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchUserActivitiesRequest());
            dispatch(fetchUserActivitiesSuccess(tempActivities));
        } catch (err) {
            dispatch(fetchUserActivitiesFailed(err));
        }
    };
};

export const insertUserActivity = (activity) => {
    return async (dispatch) => {
        try {
            dispatch(insertUserActivityRequest());
            tempActivities.push(activity);
            dispatch(insertUserActivitySuccess(activity));
        } catch (err) {
            dispatch(insertUserActivityFailed(err));
        }
    };
};