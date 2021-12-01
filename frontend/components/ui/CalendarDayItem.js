import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

const CalendarDayItem = props => {
    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.hour }>{ props.item.time }</Text>
            </View>
            <View>
                <Entypo
                    name={ 'flow-line' }
                    size={ 50 }
                    color={ 'black' }
                />
            </View>
            <View style={ { flexDirection: 'column', alignItems: 'center' } }>
                <View>
                    <Text>11:00-12:000</Text>
                </View>
                <View>
                    <Text>Something to do.</Text>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 20,
        height: 100,
        backgroundColor: 'salmon'
    },
    hour: {
        fontFamily: 'open-sans-bold',
        paddingLeft: 12
    }
});

export default CalendarDayItem;