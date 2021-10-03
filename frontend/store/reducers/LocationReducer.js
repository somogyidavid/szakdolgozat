import {
    FETCH_LOCATION_REQUEST,
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_ERROR
} from '../../constants/LocationConstants';

const initialState = {
    isLoading: false,
    location: {
        lat: 47.4979,
        lng: 19.0402
    },
    address: {
        formattedAddress: 'Budapest, Hősök tere, 1146',
        city: 'Budapest'
    },
    weather: {
        'lat': 47.4979,
        'lon': 19.0402,
        'timezone': 'Europe/Budapest',
        'timezone_offset': 7200,
        'current': {
            'dt': 1633289619,
            'sunrise': 1633236324,
            'sunset': 1633278007,
            'temp': 16.11,
            'feels_like': 15.58,
            'pressure': 1018,
            'humidity': 69,
            'dew_point': 10.43,
            'uvi': 0,
            'clouds': 0,
            'visibility': 10000,
            'wind_speed': 2.57,
            'wind_deg': 110,
            'weather': [
                {
                    'id': 500,
                    'main': 'Rain',
                    'description': 'light rain',
                    'icon': '10n'
                }
            ],
            'rain': {
                '1h': 0.47
            }
        },
        'hourly': [
            {
                'dt': 1633287600,
                'temp': 16.5,
                'feels_like': 15.85,
                'pressure': 1018,
                'humidity': 63,
                'dew_point': 9.44,
                'uvi': 0,
                'clouds': 2,
                'visibility': 10000,
                'wind_speed': 3.55,
                'wind_deg': 142,
                'wind_gust': 11.7,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633291200,
                'temp': 16.11,
                'feels_like': 15.58,
                'pressure': 1018,
                'humidity': 69,
                'dew_point': 10.43,
                'uvi': 0,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.33,
                'wind_deg': 142,
                'wind_gust': 11.99,
                'weather': [
                    {
                        'id': 500,
                        'main': 'Rain',
                        'description': 'light rain',
                        'icon': '10n'
                    }
                ],
                'pop': 0.2,
                'rain': {
                    '1h': 0.56
                }
            },
            {
                'dt': 1633294800,
                'temp': 16.25,
                'feels_like': 15.58,
                'pressure': 1018,
                'humidity': 63,
                'dew_point': 9.2,
                'uvi': 0,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 3.06,
                'wind_deg': 145,
                'wind_gust': 11.33,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633298400,
                'temp': 16.15,
                'feels_like': 15.34,
                'pressure': 1018,
                'humidity': 58,
                'dew_point': 7.89,
                'uvi': 0,
                'clouds': 2,
                'visibility': 10000,
                'wind_speed': 2.79,
                'wind_deg': 145,
                'wind_gust': 10.39,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633302000,
                'temp': 15.85,
                'feels_like': 14.9,
                'pressure': 1019,
                'humidity': 54,
                'dew_point': 6.57,
                'uvi': 0,
                'clouds': 4,
                'visibility': 10000,
                'wind_speed': 2.46,
                'wind_deg': 133,
                'wind_gust': 7.95,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633305600,
                'temp': 15.39,
                'feels_like': 14.26,
                'pressure': 1020,
                'humidity': 49,
                'dew_point': 4.74,
                'uvi': 0,
                'clouds': 5,
                'visibility': 10000,
                'wind_speed': 2.63,
                'wind_deg': 128,
                'wind_gust': 6.17,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633309200,
                'temp': 14.66,
                'feels_like': 13.33,
                'pressure': 1020,
                'humidity': 44,
                'dew_point': 2.52,
                'uvi': 0,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 2.42,
                'wind_deg': 130,
                'wind_gust': 6.21,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633312800,
                'temp': 14.2,
                'feels_like': 12.85,
                'pressure': 1019,
                'humidity': 45,
                'dew_point': 2.21,
                'uvi': 0,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 2.61,
                'wind_deg': 120,
                'wind_gust': 5.87,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633316400,
                'temp': 13.78,
                'feels_like': 12.39,
                'pressure': 1019,
                'humidity': 45,
                'dew_point': 1.79,
                'uvi': 0,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 2.7,
                'wind_deg': 119,
                'wind_gust': 6.18,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633320000,
                'temp': 13.4,
                'feels_like': 11.97,
                'pressure': 1019,
                'humidity': 45,
                'dew_point': 1.55,
                'uvi': 0,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 2.66,
                'wind_deg': 119,
                'wind_gust': 6.24,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633323600,
                'temp': 13.09,
                'feels_like': 11.63,
                'pressure': 1020,
                'humidity': 45,
                'dew_point': 1.33,
                'uvi': 0,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 2.48,
                'wind_deg': 118,
                'wind_gust': 6.01,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633327200,
                'temp': 13.6,
                'feels_like': 12.16,
                'pressure': 1020,
                'humidity': 44,
                'dew_point': 1.26,
                'uvi': 0.2,
                'clouds': 2,
                'visibility': 10000,
                'wind_speed': 2.89,
                'wind_deg': 118,
                'wind_gust': 5.68,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633330800,
                'temp': 14.74,
                'feels_like': 13.34,
                'pressure': 1020,
                'humidity': 41,
                'dew_point': 1.4,
                'uvi': 0.69,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.17,
                'wind_deg': 119,
                'wind_gust': 4.95,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633334400,
                'temp': 16.29,
                'feels_like': 14.97,
                'pressure': 1020,
                'humidity': 38,
                'dew_point': 1.89,
                'uvi': 1.49,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.22,
                'wind_deg': 125,
                'wind_gust': 4.93,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633338000,
                'temp': 18.31,
                'feels_like': 17.11,
                'pressure': 1020,
                'humidity': 35,
                'dew_point': 2.52,
                'uvi': 2.41,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.26,
                'wind_deg': 130,
                'wind_gust': 5.01,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633341600,
                'temp': 20.43,
                'feels_like': 19.39,
                'pressure': 1019,
                'humidity': 33,
                'dew_point': 3.57,
                'uvi': 3.05,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.75,
                'wind_deg': 138,
                'wind_gust': 5.64,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633345200,
                'temp': 22.15,
                'feels_like': 21.28,
                'pressure': 1019,
                'humidity': 33,
                'dew_point': 4.87,
                'uvi': 3.19,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.65,
                'wind_deg': 155,
                'wind_gust': 5.59,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633348800,
                'temp': 23.46,
                'feels_like': 22.75,
                'pressure': 1018,
                'humidity': 34,
                'dew_point': 6.5,
                'uvi': 2.75,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.83,
                'wind_deg': 175,
                'wind_gust': 6.2,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633352400,
                'temp': 24.25,
                'feels_like': 23.67,
                'pressure': 1018,
                'humidity': 36,
                'dew_point': 7.9,
                'uvi': 1.94,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.87,
                'wind_deg': 175,
                'wind_gust': 6.6,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633356000,
                'temp': 24.54,
                'feels_like': 24.02,
                'pressure': 1017,
                'humidity': 37,
                'dew_point': 8.54,
                'uvi': 1.04,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.9,
                'wind_deg': 171,
                'wind_gust': 6.34,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633359600,
                'temp': 24.17,
                'feels_like': 23.63,
                'pressure': 1017,
                'humidity': 38,
                'dew_point': 8.76,
                'uvi': 0.39,
                'clouds': 3,
                'visibility': 10000,
                'wind_speed': 3.29,
                'wind_deg': 161,
                'wind_gust': 5.5,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633363200,
                'temp': 22.59,
                'feels_like': 21.98,
                'pressure': 1017,
                'humidity': 41,
                'dew_point': 8.62,
                'uvi': 0,
                'clouds': 4,
                'visibility': 10000,
                'wind_speed': 2.68,
                'wind_deg': 141,
                'wind_gust': 5.89,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633366800,
                'temp': 21.32,
                'feels_like': 20.66,
                'pressure': 1018,
                'humidity': 44,
                'dew_point': 8.31,
                'uvi': 0,
                'clouds': 4,
                'visibility': 10000,
                'wind_speed': 2.51,
                'wind_deg': 132,
                'wind_gust': 6.74,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633370400,
                'temp': 20.41,
                'feels_like': 19.66,
                'pressure': 1018,
                'humidity': 44,
                'dew_point': 7.58,
                'uvi': 0,
                'clouds': 8,
                'visibility': 10000,
                'wind_speed': 2.41,
                'wind_deg': 135,
                'wind_gust': 7.01,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633374000,
                'temp': 19.64,
                'feels_like': 18.81,
                'pressure': 1018,
                'humidity': 44,
                'dew_point': 6.99,
                'uvi': 0,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 2.13,
                'wind_deg': 133,
                'wind_gust': 6.27,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633377600,
                'temp': 18.94,
                'feels_like': 18.06,
                'pressure': 1018,
                'humidity': 45,
                'dew_point': 6.6,
                'uvi': 0,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 2.03,
                'wind_deg': 135,
                'wind_gust': 6.47,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633381200,
                'temp': 18.49,
                'feels_like': 17.57,
                'pressure': 1019,
                'humidity': 45,
                'dew_point': 6.18,
                'uvi': 0,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 2.04,
                'wind_deg': 127,
                'wind_gust': 6.71,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633384800,
                'temp': 17.99,
                'feels_like': 17.02,
                'pressure': 1018,
                'humidity': 45,
                'dew_point': 5.76,
                'uvi': 0,
                'clouds': 10,
                'visibility': 10000,
                'wind_speed': 1.94,
                'wind_deg': 122,
                'wind_gust': 5.95,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633388400,
                'temp': 17.56,
                'feels_like': 16.55,
                'pressure': 1018,
                'humidity': 45,
                'dew_point': 5.46,
                'uvi': 0,
                'clouds': 18,
                'visibility': 10000,
                'wind_speed': 2.02,
                'wind_deg': 118,
                'wind_gust': 4.73,
                'weather': [
                    {
                        'id': 801,
                        'main': 'Clouds',
                        'description': 'few clouds',
                        'icon': '02n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633392000,
                'temp': 17.17,
                'feels_like': 16.14,
                'pressure': 1019,
                'humidity': 46,
                'dew_point': 5.2,
                'uvi': 0,
                'clouds': 16,
                'visibility': 10000,
                'wind_speed': 2.17,
                'wind_deg': 116,
                'wind_gust': 4.5,
                'weather': [
                    {
                        'id': 801,
                        'main': 'Clouds',
                        'description': 'few clouds',
                        'icon': '02n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633395600,
                'temp': 16.65,
                'feels_like': 15.57,
                'pressure': 1018,
                'humidity': 46,
                'dew_point': 4.88,
                'uvi': 0,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 2.28,
                'wind_deg': 114,
                'wind_gust': 5.08,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633399200,
                'temp': 16.18,
                'feels_like': 15.05,
                'pressure': 1018,
                'humidity': 46,
                'dew_point': 4.39,
                'uvi': 0,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 2.22,
                'wind_deg': 116,
                'wind_gust': 5.02,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633402800,
                'temp': 15.77,
                'feels_like': 14.6,
                'pressure': 1019,
                'humidity': 46,
                'dew_point': 3.89,
                'uvi': 0,
                'clouds': 3,
                'visibility': 10000,
                'wind_speed': 2.15,
                'wind_deg': 115,
                'wind_gust': 4.9,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633406400,
                'temp': 15.43,
                'feels_like': 14.23,
                'pressure': 1019,
                'humidity': 46,
                'dew_point': 3.62,
                'uvi': 0,
                'clouds': 5,
                'visibility': 10000,
                'wind_speed': 2.12,
                'wind_deg': 113,
                'wind_gust': 4.84,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633410000,
                'temp': 15.07,
                'feels_like': 13.83,
                'pressure': 1019,
                'humidity': 46,
                'dew_point': 3.47,
                'uvi': 0,
                'clouds': 5,
                'visibility': 10000,
                'wind_speed': 2.39,
                'wind_deg': 109,
                'wind_gust': 5.8,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633413600,
                'temp': 15.65,
                'feels_like': 14.42,
                'pressure': 1019,
                'humidity': 44,
                'dew_point': 3.21,
                'uvi': 0.19,
                'clouds': 4,
                'visibility': 10000,
                'wind_speed': 3.16,
                'wind_deg': 115,
                'wind_gust': 7.37,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633417200,
                'temp': 16.79,
                'feels_like': 15.57,
                'pressure': 1019,
                'humidity': 40,
                'dew_point': 3.05,
                'uvi': 0.66,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 3.6,
                'wind_deg': 124,
                'wind_gust': 7.27,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633420800,
                'temp': 18.27,
                'feels_like': 17.12,
                'pressure': 1018,
                'humidity': 37,
                'dew_point': 3.16,
                'uvi': 1.44,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 4.27,
                'wind_deg': 129,
                'wind_gust': 7.84,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633424400,
                'temp': 20.31,
                'feels_like': 19.28,
                'pressure': 1018,
                'humidity': 34,
                'dew_point': 3.51,
                'uvi': 2.32,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 4.99,
                'wind_deg': 137,
                'wind_gust': 8.32,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633428000,
                'temp': 21.87,
                'feels_like': 20.92,
                'pressure': 1017,
                'humidity': 31,
                'dew_point': 3.91,
                'uvi': 2.95,
                'clouds': 0,
                'visibility': 10000,
                'wind_speed': 5.62,
                'wind_deg': 142,
                'wind_gust': 8.49,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633431600,
                'temp': 23.1,
                'feels_like': 22.22,
                'pressure': 1016,
                'humidity': 29,
                'dew_point': 4.07,
                'uvi': 3.1,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 6.03,
                'wind_deg': 144,
                'wind_gust': 8.65,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633435200,
                'temp': 24.11,
                'feels_like': 23.28,
                'pressure': 1016,
                'humidity': 27,
                'dew_point': 3.99,
                'uvi': 2.67,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 6.02,
                'wind_deg': 146,
                'wind_gust': 8.74,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633438800,
                'temp': 24.71,
                'feels_like': 23.92,
                'pressure': 1015,
                'humidity': 26,
                'dew_point': 3.9,
                'uvi': 1.85,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 5.87,
                'wind_deg': 148,
                'wind_gust': 8.57,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633442400,
                'temp': 24.81,
                'feels_like': 24.03,
                'pressure': 1015,
                'humidity': 26,
                'dew_point': 3.92,
                'uvi': 0.99,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 5.64,
                'wind_deg': 149,
                'wind_gust': 8.73,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633446000,
                'temp': 24.17,
                'feels_like': 23.37,
                'pressure': 1015,
                'humidity': 28,
                'dew_point': 4.24,
                'uvi': 0.36,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 5.38,
                'wind_deg': 146,
                'wind_gust': 8.89,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633449600,
                'temp': 22.58,
                'feels_like': 21.7,
                'pressure': 1015,
                'humidity': 31,
                'dew_point': 4.64,
                'uvi': 0,
                'clouds': 1,
                'visibility': 10000,
                'wind_speed': 5.93,
                'wind_deg': 146,
                'wind_gust': 9.82,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633453200,
                'temp': 21.28,
                'feels_like': 20.38,
                'pressure': 1015,
                'humidity': 35,
                'dew_point': 4.82,
                'uvi': 0,
                'clouds': 2,
                'visibility': 10000,
                'wind_speed': 5.3,
                'wind_deg': 144,
                'wind_gust': 10.75,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            },
            {
                'dt': 1633456800,
                'temp': 20.42,
                'feels_like': 19.46,
                'pressure': 1016,
                'humidity': 36,
                'dew_point': 4.87,
                'uvi': 0,
                'clouds': 4,
                'visibility': 10000,
                'wind_speed': 5.08,
                'wind_deg': 139,
                'wind_gust': 11.51,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01n'
                    }
                ],
                'pop': 0
            }
        ],
        'daily': [
            {
                'dt': 1633255200,
                'sunrise': 1633236324,
                'sunset': 1633278007,
                'moonrise': 1633221180,
                'moonset': 1633275060,
                'moon_phase': 0.89,
                'temp': {
                    'day': 18.71,
                    'min': 11.26,
                    'max': 21.95,
                    'night': 16.25,
                    'eve': 19.55,
                    'morn': 11.54
                },
                'feels_like': {
                    'day': 17.52,
                    'night': 15.58,
                    'eve': 18.71,
                    'morn': 10.11
                },
                'pressure': 1020,
                'humidity': 34,
                'dew_point': 2.48,
                'wind_speed': 5.34,
                'wind_deg': 159,
                'wind_gust': 11.99,
                'weather': [
                    {
                        'id': 500,
                        'main': 'Rain',
                        'description': 'light rain',
                        'icon': '10d'
                    }
                ],
                'clouds': 7,
                'pop': 0.2,
                'rain': 0.56,
                'uvi': 3.09
            },
            {
                'dt': 1633341600,
                'sunrise': 1633322806,
                'sunset': 1633364286,
                'moonrise': 1633312140,
                'moonset': 1633362780,
                'moon_phase': 0.92,
                'temp': {
                    'day': 20.43,
                    'min': 13.09,
                    'max': 24.54,
                    'night': 18.49,
                    'eve': 22.59,
                    'morn': 13.4
                },
                'feels_like': {
                    'day': 19.39,
                    'night': 17.57,
                    'eve': 21.98,
                    'morn': 11.97
                },
                'pressure': 1019,
                'humidity': 33,
                'dew_point': 3.57,
                'wind_speed': 3.9,
                'wind_deg': 171,
                'wind_gust': 10.39,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'clouds': 0,
                'pop': 0,
                'uvi': 3.19
            },
            {
                'dt': 1633428000,
                'sunrise': 1633409289,
                'sunset': 1633450566,
                'moonrise': 1633403160,
                'moonset': 1633450440,
                'moon_phase': 0.96,
                'temp': {
                    'day': 21.87,
                    'min': 15.07,
                    'max': 24.81,
                    'night': 18.37,
                    'eve': 22.58,
                    'morn': 15.43
                },
                'feels_like': {
                    'day': 20.92,
                    'night': 17.31,
                    'eve': 21.7,
                    'morn': 14.23
                },
                'pressure': 1017,
                'humidity': 31,
                'dew_point': 3.91,
                'wind_speed': 6.03,
                'wind_deg': 144,
                'wind_gust': 12.64,
                'weather': [
                    {
                        'id': 800,
                        'main': 'Clear',
                        'description': 'clear sky',
                        'icon': '01d'
                    }
                ],
                'clouds': 0,
                'pop': 0,
                'uvi': 3.1
            },
            {
                'dt': 1633514400,
                'sunrise': 1633495772,
                'sunset': 1633536846,
                'moonrise': 1633494300,
                'moonset': 1633538040,
                'moon_phase': 0,
                'temp': {
                    'day': 12.12,
                    'min': 12.01,
                    'max': 17.94,
                    'night': 12.2,
                    'eve': 12.24,
                    'morn': 15.52
                },
                'feels_like': {
                    'day': 11.69,
                    'night': 11.88,
                    'eve': 11.82,
                    'morn': 14.35
                },
                'pressure': 1018,
                'humidity': 88,
                'dew_point': 10,
                'wind_speed': 5.37,
                'wind_deg': 139,
                'wind_gust': 12.25,
                'weather': [
                    {
                        'id': 501,
                        'main': 'Rain',
                        'description': 'moderate rain',
                        'icon': '10d'
                    }
                ],
                'clouds': 100,
                'pop': 1,
                'rain': 23.82,
                'uvi': 0.5
            },
            {
                'dt': 1633600800,
                'sunrise': 1633582256,
                'sunset': 1633623127,
                'moonrise': 1633585560,
                'moonset': 1633625760,
                'moon_phase': 0.04,
                'temp': {
                    'day': 12.59,
                    'min': 12.34,
                    'max': 13.37,
                    'night': 13.37,
                    'eve': 13.08,
                    'morn': 12.51
                },
                'feels_like': {
                    'day': 12.23,
                    'night': 12.56,
                    'eve': 12.48,
                    'morn': 12.24
                },
                'pressure': 1020,
                'humidity': 89,
                'dew_point': 10.51,
                'wind_speed': 3.98,
                'wind_deg': 45,
                'wind_gust': 9.87,
                'weather': [
                    {
                        'id': 501,
                        'main': 'Rain',
                        'description': 'moderate rain',
                        'icon': '10d'
                    }
                ],
                'clouds': 100,
                'pop': 1,
                'rain': 14.84,
                'uvi': 0.51
            },
            {
                'dt': 1633687200,
                'sunrise': 1633668739,
                'sunset': 1633709408,
                'moonrise': 1633676940,
                'moonset': 1633713660,
                'moon_phase': 0.07,
                'temp': {
                    'day': 11.38,
                    'min': 10.56,
                    'max': 12.65,
                    'night': 10.71,
                    'eve': 10.65,
                    'morn': 11.48
                },
                'feels_like': {
                    'day': 10.74,
                    'night': 10.11,
                    'eve': 10.07,
                    'morn': 10.9
                },
                'pressure': 1022,
                'humidity': 83,
                'dew_point': 8.3,
                'wind_speed': 5.92,
                'wind_deg': 71,
                'wind_gust': 10.9,
                'weather': [
                    {
                        'id': 501,
                        'main': 'Rain',
                        'description': 'moderate rain',
                        'icon': '10d'
                    }
                ],
                'clouds': 100,
                'pop': 1,
                'rain': 11.55,
                'uvi': 0.27
            },
            {
                'dt': 1633773600,
                'sunrise': 1633755224,
                'sunset': 1633795690,
                'moonrise': 1633768380,
                'moonset': 1633801860,
                'moon_phase': 0.11,
                'temp': {
                    'day': 11.3,
                    'min': 9.91,
                    'max': 12.42,
                    'night': 11.65,
                    'eve': 12.42,
                    'morn': 9.91
                },
                'feels_like': {
                    'day': 10.31,
                    'night': 10.67,
                    'eve': 11.28,
                    'morn': 7.39
                },
                'pressure': 1026,
                'humidity': 70,
                'dew_point': 5.78,
                'wind_speed': 5.8,
                'wind_deg': 70,
                'wind_gust': 10.95,
                'weather': [
                    {
                        'id': 500,
                        'main': 'Rain',
                        'description': 'light rain',
                        'icon': '10d'
                    }
                ],
                'clouds': 100,
                'pop': 1,
                'rain': 3.51,
                'uvi': 1
            },
            {
                'dt': 1633860000,
                'sunrise': 1633841708,
                'sunset': 1633881973,
                'moonrise': 1633859760,
                'moonset': 1633890540,
                'moon_phase': 0.15,
                'temp': {
                    'day': 10.39,
                    'min': 9.64,
                    'max': 13.2,
                    'night': 10.42,
                    'eve': 13.2,
                    'morn': 9.64
                },
                'feels_like': {
                    'day': 8.84,
                    'night': 8.93,
                    'eve': 11.72,
                    'morn': 7.47
                },
                'pressure': 1026,
                'humidity': 52,
                'dew_point': 0.64,
                'wind_speed': 4.44,
                'wind_deg': 78,
                'wind_gust': 10.09,
                'weather': [
                    {
                        'id': 804,
                        'main': 'Clouds',
                        'description': 'overcast clouds',
                        'icon': '04d'
                    }
                ],
                'clouds': 100,
                'pop': 0.04,
                'uvi': 1
            }
        ]
    },
    errors: []
};

const LocationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_LOCATION_REQUEST: {
            return {
                ...state,
                errors: [],
                isLoading: true
            };
        }
        case FETCH_LOCATION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                location: payload.location,
                address: payload.address,
                weather: payload.weather,
                errors: []
            };
        }
        case FETCH_LOCATION_ERROR: {
            return {
                ...state,
                isLoading: false,
                errors: payload.errors
            };
        }
        default:
            return initialState;
    }

};

export default LocationReducer;