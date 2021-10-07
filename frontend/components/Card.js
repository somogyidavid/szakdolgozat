import React from 'react';
import { View, StyleSheet, ImageBackground, Platform, TouchableOpacity } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import WeatherBackground from './WeatherBackground';

const Card = props => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (props.image) {
        return (
            <View style={ { ...styles.card, ...props.style } }>
                <TouchableComponent
                    onPress={ props.onPress }
                    background={ TouchableNativeFeedback.Ripple('lightblue', true) }
                >
                    <WeatherBackground
                        source={ props.image }
                        style={ styles.background }
                    >
                        { props.children }
                    </WeatherBackground>
                </TouchableComponent>
            </View>
        );
    }

    return (
        <View style={ { ...styles.card, ...props.style } }>
            <TouchableComponent
                onPress={ props.onPress }
                background={ TouchableNativeFeedback.Ripple('lightblue', true) }
            >
                { props.children }
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 15,
        overflow: 'hidden',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'relative',
        resizeMode: 'cover',
        flexDirection: 'row'
    }
});

export default Card;