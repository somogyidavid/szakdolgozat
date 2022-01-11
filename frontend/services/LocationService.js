import { fetchLocationRequested, fetchLocationSuccess, fetchLocationFailed } from '../store/actions/LocationActions';
import ENV from '../constants/env';

const axios = require('axios');

export const fetchLocation = (location) => {
    const addressUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${ location.lat },${ location.lng }&sensor=false&key=${ ENV().googleApiKey }`;
    const weatherUri = `https://api.openweathermap.org/data/2.5/onecall?lat=${ location.lat }&lon=${ location.lng }&units=metric&exclude=minutely&appid=${ ENV().openWeathersApiKey }`;


    return async (dispatch) => {
        try {
            dispatch(fetchLocationRequested());

            const addressResponse = await axios.get(addressUri);

            const address = {
                formattedAddress: addressResponse.data.results[0].formatted_address,
                city: addressResponse.data.results[0].address_components.filter(item => item.types.includes('locality'))[0].long_name
            };

            const weatherResponse = await axios.get(weatherUri);

            dispatch(fetchLocationSuccess(location, address, weatherResponse.data));
        } catch (err) {
            dispatch(fetchLocationFailed(err));
        }
    };
};

export const getAddress = async (location) => {
    const addressUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${ location.lat },${ location.lng }&sensor=false&key=${ ENV().googleApiKey }`;
    const response = await axios.get(addressUri);

    return {
        formattedAddress: response.data.results[0].formatted_address,
        city: response.data.results[0].address_components.filter(item => item.types.includes('locality'))[0].long_name
    };
};