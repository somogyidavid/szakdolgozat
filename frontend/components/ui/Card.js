import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import WeatherBackground from '../weather/WeatherBackground';

const Card = props => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (props.touchable) {
        return (
            <View style={ { ...styles.card, ...props.style } }>
                <TouchableComponent
                    onPress={ props.onPress }
                    background={ TouchableNativeFeedback.Ripple('lightblue', true) }
                >
                    <WeatherBackground
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
            { props.children }
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
        flexDirection: 'row'
    }
});

export default Card;