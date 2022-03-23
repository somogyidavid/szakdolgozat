import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { Center, HStack, PresenceTransition, VStack } from 'native-base';
import CreateActivityModal from './CreateActivityModal';
import i18n from 'i18n-js';
import SeparatorLine from '../ui/SeparatorLine';
import { useDispatch } from 'react-redux';
import { deleteUserActivity } from '../../services/UserActivitiesService';

const CalendarDayItem = props => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { item, selectedDate } = props;

    const startingTime = moment(selectedDate).isSame(moment(item.startingDate), 'day') ?
                         moment(item.startingDate).format('HH:mm') : '...';
    const endingTime = moment(selectedDate).isSame(moment(item.endingDate), 'day') ?
                       moment(item.endingDate).format('HH:mm') : '...';

    const editHandler = () => {
        setIsEdit(false);
    };

    return (
        <View style={ styles.container }>
            <CreateActivityModal
                isEdit={ isEdit }
                editHandler={ editHandler }
                item={ item }
            />
            <TouchableOpacity
                activeOpacity={ 0.6 }
                onPress={ () => setIsOpen(!isOpen) }
            >
                <VStack
                    alignItems='flex-start'
                    justifyContent='center'
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
                            justifyContent='center'
                        >
                            <Text style={ styles.text }>
                                { item.isAllDay ? i18n.t('activityAllDay') : startingTime + ' - ' + endingTime }
                            </Text>
                            <Text style={ { ...styles.text, marginRight: 22 } }>
                                { item.location.city ? item.location.city + ' - ' : '' }{ item.location.formattedAddress }
                            </Text>
                        </VStack>
                    </HStack>
                </VStack>
                <Center mt={ 2 }>
                    <Entypo
                        name={ isOpen ? 'chevron-up' : 'chevron-down' }
                        size={ 24 }
                        color='#FFF'
                        style={ styles.chevron }
                    />
                </Center>
            </TouchableOpacity>
            <PresenceTransition
                visible={ isOpen }
                initial={ { scale: 0, opacity: 0 } }
                animate={ { scale: 1, opacity: 1, transition: { duration: 250 } } }
            >
                <SeparatorLine title='' />
                <HStack
                    space={ 2 }
                    mt={ 1 }
                    justifyContent='space-evenly'
                >
                    <TouchableOpacity
                        activeOpacity={ 0.6 }
                        style={ styles.detailsButton }
                        onPress={ () => setIsEdit(true) }
                    >
                        <VStack
                            space={ 1 }
                            alignItems='center'
                        >
                            <Feather
                                name='edit'
                                size={ 24 }
                                color='#FFF'
                            />
                            <Text style={ styles.buttonText }>{ i18n.t('edit') }</Text>
                        </VStack>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={ 0.6 }
                        style={ styles.detailsButton }
                        onPress={ () => console.log(props.item._id) }
                    >
                        <VStack
                            space={ 1 }
                            alignItems='center'
                        >
                            <Entypo
                                name='magnifying-glass'
                                size={ 24 }
                                color='#FFF'
                            />
                            <Text style={ styles.buttonText }>{ i18n.t('details') }</Text>
                        </VStack>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={ 0.6 }
                        style={ styles.detailsButton }
                        onPress={ () => {
                            dispatch(deleteUserActivity(props.item));
                        } }
                    >
                        <VStack
                            space={ 1 }
                            alignItems='center'
                        >
                            <MaterialIcons
                                name='delete'
                                size={ 24 }
                                color='#FFF'
                            />
                            <Text style={ styles.buttonText }>{ i18n.t('delete') }</Text>
                        </VStack>
                    </TouchableOpacity>
                </HStack>
            </PresenceTransition>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
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
    },
    detailsButton: {
        backgroundColor: '#155e75',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 8,
        width: Dimensions.get('window').width / 4
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'open-sans'
    },
    chevron: {
        backgroundColor: '#155e75',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 4
    }
});

export default CalendarDayItem;