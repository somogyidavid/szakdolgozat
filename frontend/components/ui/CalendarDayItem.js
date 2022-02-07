import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { HStack, VStack } from 'native-base';
import CreateActivityModal from './CreateActivityModal';
import i18n from 'i18n-js';

const CalendarDayItem = props => {
    const [isEdit, setIsEdit] = useState(false);
    const { item, selectedDate } = props;

    const startingTime = moment(selectedDate).isSame(moment(item.startingDate), 'day') ?
                         moment(item.startingDate).format('HH:mm') : '...';
    const endingTime = moment(selectedDate).isSame(moment(item.endingDate), 'day') ?
                       moment(item.endingDate).format('HH:mm') : '...';

    const editHandler = () => {
        setIsEdit(false);
    };

    return (
        <View>
            <CreateActivityModal
                isEdit={ isEdit }
                editHandler={ editHandler }
                item={ item }
            />
            <TouchableOpacity
                style={ styles.container }
                activeOpacity={ 0.6 }
                onPress={ () => setIsEdit(true) }
            >
                <VStack
                    alignItems='flex-start'
                    space={ 4 }
                >
                    <Text style={ styles.title }>{ item.name }</Text>
                    <HStack>
                        <VStack
                            space={ 2 }
                        >
                            <Entypo
                                name={ 'calendar' }
                                size={ 22 }
                                color={ 'black' }
                                style={ { marginRight: 10 } }
                            />
                            <Entypo
                                name={ 'location' }
                                size={ 22 }
                                color={ 'black' }
                                style={ { marginRight: 10 } }
                            />
                        </VStack>
                        <VStack
                            space={ 2 }
                        >
                            <Text style={ styles.text }>
                                { item.isAllDay ? i18n.t('activityAllDay') : startingTime + ' - ' + endingTime }
                            </Text>
                            <Text style={ styles.text }>
                                { item.location.city && item.location.city + ' - ' }{ item.location.formattedAddress }
                            </Text>
                        </VStack>
                    </HStack>
                </VStack>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
        height: 140,
        backgroundColor: '#a5f3fc',
        borderWidth: 2,
        borderColor: '#67e8f9',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    text: {
        textAlign: 'left',
        marginHorizontal: 6
    }
});

export default CalendarDayItem;