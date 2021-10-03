import { fetchLocationRequested, fetchLocationSuccess, fetchLocationFailed } from '../store/actions/LocationActions';
import ENV from '../constants/env';

const axios = require('axios');

export const fetchLocation = (location) => {
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${ location.lat },${ location.lng }&sensor=false&key=${ ENV().googleApiKey }`;

    return async (dispatch) => {
        try {
            dispatch(fetchLocationRequested());

            const response = await axios.get(uri);

            const address = {
                formattedAddress: response.data.results[0].formatted_address,
                city: response.data.results[0].address_components.filter(item => item.types.includes('locality'))[0].long_name
            };

            dispatch(fetchLocationSuccess(location, address));
        } catch (err) {
            console.log(err);
            dispatch(fetchLocationFailed(err));
        }
    };
};