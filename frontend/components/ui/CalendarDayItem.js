import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { Box, HStack, VStack } from 'native-base';

const CalendarDayItem = props => {
    const { item, selectedDate } = props;

    const startingTime = moment(selectedDate).isSame(moment(item.startingDate), 'day') ?
                         moment(item.startingDate).format('HH:mm') : '...';
    const endingTime = moment(selectedDate).isSame(moment(item.endingDate), 'day') ?
                       moment(item.endingDate).format('HH:mm') : '...';

    return (
        <View style={ styles.container }>
            <VStack
                alignItems='flex-start'
                space='lg'
            >
                <Text style={ styles.title }>{ item.title }</Text>
                <HStack
                    space='sm'
                    alignItems='center'
                    justifyContent='space-evenly'
                >
                    <Text>
                        { item.isAllDay ? 'Egész nap' : startingTime + ' - ' + endingTime }
                    </Text>
                    <Entypo
                        name={ 'flow-line' }
                        size={ 25 }
                        color={ 'black' }
                    />
                    <Text>{ item.location.city } - { item.location.formattedAddress }</Text>
                </HStack>
            </VStack>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
        height: 100,
        backgroundColor: '#a5f3fc'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    }
});

export default CalendarDayItem;