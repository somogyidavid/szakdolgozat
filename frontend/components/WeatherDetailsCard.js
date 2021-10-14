import React from 'react';
import { Text, StyleSheet, View, Platform, TouchableNativeFeedback, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const WeatherDetailsCard = props => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const currentTime = new Date().getTime();
    const weather = useSelector(state => state.location.weather);

    const iconHandler = () => {
        if (props.weather[0].weather.main === 'Clear') {
            if (currentTime > weather.current.sunset * 1000) {
                return (
                    <Ionicons
                        name={ Platform.OS === 'android' ? 'md-moon-outline' : 'ios-moon-outline' }
                        size={ 20 }
                        color='white'
                    />
                );
            } else if (currentTime > weather.current.sunrise * 1000) {
                return (
                    <Ionicons
                        name={ Platform.OS === 'android' ? 'md-sunny-outline' : 'ios-sunny-outline' }
                        size={ 20 }
                        color='white'
                    />
                );
            }
        } else {
            return (
                <Image
                    source={ { uri: `http://openweathermap.org/img/wn/${ weather.current.weather[0].icon }@2x.png` } }
                    style={ styles.icon }
                />
            );
        }
    };

    return (
        <View style={ styles.container }>
            <TouchableComponent
                onPress={ props.onPress }
                background={ TouchableNativeFeedback.Ripple('white', true) }
            >
                <View style={ styles.contentContainer }>
                    <View style={ styles.timeContainer }>
                        <Text style={ styles.text }>12AM</Text>
                    </View>
                    <View style={ styles.iconBackground }>
                        { iconHandler() }
                    </View>
                    <Text style={ styles.text }>{ props.weather[0].temp.toFixed(0) }{ String.fromCharCode(8451) }</Text>
                </View>
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 20,
        padding: 10
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkPurple,
        borderRadius: 40,
        marginHorizontal: 10,
        overflow: 'hidden'
    },
    timeContainer: {
        margin: 5
    },
    iconBackground: {
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        padding: 10,
        borderRadius: 20
    },
    icon: {
        width: '100%',
        padding: 16
    },
    image: {
        width: '100%'
    }
});

export default WeatherDetailsCard;