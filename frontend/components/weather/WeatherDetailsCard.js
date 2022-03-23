import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const WeatherDetailsCard = props => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const currentTime = new Date(props.weather.dt * 1000).getTime();
    const weather = useSelector(state => state.location.weather);

    const iconHandler = () => {
        if (props.weather.weather[0].main === 'Clear') {
            if (currentTime > weather.current.sunset * 1000) {
                return (
                    <View style={ styles.iconBackground }>
                        <Ionicons
                            name={ Platform.OS === 'android' ? 'md-moon-outline' : 'ios-moon-outline' }
                            size={ 40 }
                            color='white'
                        />
                    </View>
                )
                    ;
            } else if (currentTime > weather.current.sunrise * 1000) {
                return (
                    <View style={ styles.iconBackground }>
                        <Ionicons
                            name={ Platform.OS === 'android' ? 'md-sunny-outline' : 'ios-sunny-outline' }
                            size={ 40 }
                            color='white'
                        />
                    </View>
                );
            }
        } else {
            return (
                <View style={ styles.imageContainer }>
                    <Image
                        source={ { uri: `http://openweathermap.org/img/wn/${ props.weather.weather[0].icon }@2x.png` } }
                        style={ styles.image }
                    />
                </View>

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
                    <Text style={ styles.text }>
                        { new Date(props.weather.dt * 1000).toLocaleTimeString(navigator.language, {
                            hour: '2-digit',
                            minute: '2-digit'
                        }).substring(0, 5) }
                    </Text>
                    { iconHandler() }
                    <Text style={ styles.text }>{ props.weather.temp.toFixed(0) } { String.fromCharCode(8451) }</Text>
                </View>
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkPurple,
        borderRadius: 40,
        marginHorizontal: 10
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timeContainer: {
        margin: 5
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
        padding: 12
    },
    iconBackground: {
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        borderRadius: 20,
        padding: 5
    },
    image: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        borderRadius: 20
    }
});

export default WeatherDetailsCard;