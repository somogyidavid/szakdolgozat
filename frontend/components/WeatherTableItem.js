import React from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import Title from './Title';
import Colors from '../constants/Colors';
import Button from './Button';
import { Ionicons } from '@expo/vector-icons';

const WeatherTableItem = props => {
    const { weather } = props;
    const shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const date = new Date(weather.dt * 1000);
    const day = i18n.t(shortDays[date.getDay()]);

    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

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
            <View style={ styles.rainContainer }>
                <Ionicons
                    name='rainy'
                    size={ 20 }
                    color='white'
                    style={ { padding: 5 } }
                />
                <Text style={ styles.text }>{ weather.pop.toFixed(0) }%</Text>
            </View>
            <Button
                title='...'
                style={ { flex: 1, marginTop: 5 } }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.lightPurple,
        borderColor: Colors.darkPurple,
        borderWidth: 4,
        marginHorizontal: 6,
        padding: 6,
        borderRadius: 20,
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
        borderColor: Colors.darkPurple,
        borderWidth: 2,
        borderRadius: 20,
        margin: 10
    },
    maxTemp: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: Colors.coral,
        padding: 10,
        marginVertical: 10,
        borderRadius: 40,
    },
    minTemp: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: Colors.cobalt,
        padding: 10,
        marginVertical: 10,
        borderRadius: 40
    },
    rainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        borderRadius: 20,
        padding: 8
    }
});

export default WeatherTableItem;