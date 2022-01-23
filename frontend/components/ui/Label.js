import React from 'react';
import { StyleSheet } from 'react-native';
import { Center, Text, View } from 'native-base';
import i18n from 'i18n-js';

const Label = props => {
    return (
        <View style={ { ...styles.container, backgroundColor: props.color } }>
            <Text style={ styles.text }>{ i18n.t(props.text) }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 4,
        marginLeft: 24,
        marginBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    text: {
        fontFamily: 'open-sans',
        color: '#000'
    }
});

export default Label;