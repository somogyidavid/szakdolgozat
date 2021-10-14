import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Text } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const Button = props => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={ { ...styles.buttonContainer, ...props.style } }>
            <TouchableComponent
                background={ TouchableNativeFeedback.Ripple('grey', false) }
                onPress={ props.onPress }
            >
                <View style={ { ...styles.button, ...props.buttonStyle } }>
                    <Text style={ { ...styles.title, ...props.titleStyle } }>{ props.title }</Text>

                    { props.icon && <Ionicons
                        name={ props.iconName }
                        size={ 25 }
                        color={ Colors.light }
                        style={ styles.icon }
                    /> }
                </View>
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: Colors.darkPurple,
        borderRadius: 20,
        paddingHorizontal: 20
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colors.light,
    },
    icon: {
        paddingLeft: 10
    }
});

export default Button;