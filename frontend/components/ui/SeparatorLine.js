import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SeparatorLine = props => {
    if (props.text) {
        return (
            <View style={ styles.container }>
                <View style={ styles.line } />
                <Text style={ styles.text }>{ props.text }</Text>
                <View style={ styles.line } />
            </View>
        );
    }

    return (
        <View style={ styles.singleLine } />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: '4%'
    },
    singleLine: {
        flex: 1,
        height: 4,
        backgroundColor: 'white',
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: '10%'
    },
    line: {
        flex: 1,
        height: 4,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 10
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'open-sans-bold'
    }
});

export default SeparatorLine;   