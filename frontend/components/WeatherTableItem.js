import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import i18n from 'i18n-js';
import Title from './Title';
import Colors from '../constants/Colors';

const WeatherTableItem = props => {
    const { weather } = props;
    const shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const date = new Date(weather.dt * 1000);
    const day = i18n.t(shortDays[date.getDay()]);

    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>{ day }</Text>
            <Image
                source={ { uri: `http://openweathermap.org/img/wn/${ weather.weather[0].icon }@2x.png` } }
                style={ styles.icon }
            />
            <View style={ styles.maxTemp }>
                <Text style={ styles.text }>{ weather.temp.max.toFixed(0) }</Text>
            </View>
            <View style={ styles.minTemp }>
                <Text style={ styles.text }>{ weather.temp.min.toFixed(0) }</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightPurple,
        marginHorizontal: 8,
        padding: 6,
        borderRadius: 20,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans'
    },
    icon: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(52, 52, 52, 0.25)',
        borderRadius: 20,
        margin: 10
    },
    maxTemp: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'red',
        padding: 10,
        marginVertical: 10,
        borderRadius: 40
    },
    minTemp: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        padding: 10,
        marginVertical: 10,
        borderRadius: 40
    }
});

export default WeatherTableItem;