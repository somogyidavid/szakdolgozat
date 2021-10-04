import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Card = props => {
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
        borderRadius: 15
    }
});

export default Card;