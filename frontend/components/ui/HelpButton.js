import React from 'react';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const HelpButton = props => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={ { ...styles.buttonContainer, ...props.style } }>
            <TouchableComponent
                background={ TouchableNativeFeedback.Ripple('grey', false) }
                onPress={ props.onPress }
            >
                <View style={ { ...styles.button, ...props.buttonStyle } }>
                    { props.iconName && <Ionicons
                        name={ props.iconName }
                        size={ 25 }
                        color='white'
                        style={ styles.icon }
                    /> }
                </View>
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.darkPurple,
        borderRadius: 20,
        padding: 5
    },
});

export default HelpButton;