import { fetchLocationFailed, fetchLocationRequested, fetchLocationSuccess } from '../store/actions/LocationActions';
import { getHeader } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../helpers/api';

export const fetchLocation = (location) => {
    return async (dispatch) => {
        try {
            dispatch(fetchLocationRequested());
            const userData = await AsyncStorage.getItem('userData');
            const token = JSON.parse(userData)['token'];

            const addressResponse = await api.post('/locations/address', {
                latitude: location.lat,
                longitude: location.lng
            }, getHeader(token));

            const weatherResponse = await api.post('/locations/weather', {
                latitude: location.lat,
                longitude: location.lng
            }, getHeader(token));

            const weatherCategoryResponse = await api.post('/train/predict', {
                temp: weatherResponse.data.current.temp,
                feelsLike: weatherResponse.data.current.feels_like,
                humidity: weatherResponse.data.current.humidity,
                uvi: 4,
                clouds: weatherResponse.data.current.clouds,
                windSpeed: weatherResponse.data.current.windSpeed,
                weatherId: weatherResponse.data.current.weather[0].id
            }, getHeader(token));

            dispatch(fetchLocationSuccess(location, addressResponse.data, weatherResponse.data, weatherCategoryResponse.data));
        } catch (err) {
            dispatch(fetchLocationFailed(err.response));
        }
    };
};

export const getAddress = async (location) => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData)['token'];

    const response = await api.post('/locations/address', {
        latitude: location.lat,
        longitude: location.lng
    }, getHeader(token));

    return response.data;
};