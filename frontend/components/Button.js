import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import Colors from '../constants/Colors';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const Button = props => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={ { ...styles.buttonContainer, ...props.style } }>
            <TouchableComponent
                background={ TouchableNativeFeedback.Ripple('white', true) }
                style={ styles.button }
                onPress={ props.onPress }
            >
                <Text style={ styles.title }>{ props.title }</Text>
                { props.icon && <Ionicons
                    name={ props.iconName }
                    size={ 25 }
                    color={ Colors.light }
                    style={ styles.icon }
                /> }

            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        overflow: 'hidden',
        borderRadius: 20
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.darkPurple,
        borderRadius: 20
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colors.light
    },
    icon: {
        paddingLeft: 10
    }
});

export default Button;