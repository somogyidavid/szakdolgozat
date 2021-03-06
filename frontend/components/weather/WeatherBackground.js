import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const WeatherBackground = props => {
    const weather = useSelector(state => state.location.weather);
    let image = require('../../assets/images/cloud_day.jpeg');
    const currentTime = new Date().getTime();

    switch (weather.current.weather[0].main) {
        case 'Thunderstorm':
            image = require('../../assets/images/thunder.jpeg');
            break;
        case 'Drizzle':
            image = require('../../assets/images/drizzle.jpeg');
            break;
        case 'Rain':
            image = require('../../assets/images/rain.jpeg');
            break;
        case 'Snow':
            image = require('../../assets/images/snow.jpeg');
            break;
        case 'Fog':
            image = require('../../assets/images/fog.jpeg');
            break;
        case 'Clear':
            if (currentTime > weather.current.sunset * 1000) {
                image = require('../../assets/images/clear_night.jpeg');
            } else if (currentTime > weather.current.sunrise * 1000) {
                image = require('../../assets/images/clear_day.jpeg');
            }
            break;
        case 'Clouds':
            if (currentTime > weather.current.sunset * 1000) {
                image = require('../../assets/images/cloud_night.jpeg');
            } else if (currentTime > weather.current.sunrise * 1000) {
                image = require('../../assets/images/cloud_day.jpeg');
            }
            break;
    }

    return (
        <ImageBackground
            style={ { ...styles.background, ...props.style } }
            source={ image }
        >
            { props.children }
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});

export default WeatherBackground;