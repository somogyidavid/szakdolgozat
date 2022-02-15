import { Injectable } from '@nestjs/common';
import { LocationDto } from './dto/LocationDto';
import axios from 'axios';

@Injectable()
export class LocationsService {
    async getWeather(locationDto: LocationDto): Promise<Object> {
        const { latitude, longitude } = locationDto;
        const weatherUri = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${process.env.OPEN_WEATHER_API_KEY}`;

        const response = await axios.get(weatherUri);

        return response.data;
    }

    async getAddress(locationDto: LocationDto): Promise<Object> {
        const { latitude, longitude } = locationDto;
        const addressUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${process.env.GOOGLE_API_KEY}`;

        const response = await axios.get(addressUri);

        return {
            formattedAddress: response.data.results[0].formatted_address,
            city: response.data.results[0].address_components.filter(item => item.types.includes('locality'))[0].long_name
        };
    }
}
