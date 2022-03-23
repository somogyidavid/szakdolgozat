import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { HStack, Image, Text, View, VStack } from 'native-base';
import moment from 'moment';
import ENV from '../../constants/env';
import i18n from 'i18n-js';
import { Entypo } from '@expo/vector-icons';

const UserActivityItem = props => {
    const { item } = props;

    return (
        <TouchableOpacity activeOpacity={ 0.6 }>
            <View style={ styles.container }>
                <VStack
                    space={ 3 }
                    alignItems='flex-start'
                    justifyContent='space-evenly'
                >
                    <Text style={ styles.title }>{ item.name }</Text>
                    <HStack alignItems='center'>
                        <Entypo
                            name='location'
                            size={ 24 }
                            color='black'
                            style={ styles.icon }
                        />
                        <Text>{ item.location.formattedAddress }</Text>
                    </HStack>
                    <HStack alignItems='center'>
                        <Entypo
                            name='calendar'
                            size={ 24 }
                            color='black'
                            style={ styles.icon }
                        />
                        { item.isAllDay && <Text style={ styles.isAllDay }>{ i18n.t('activityAllDay') }:</Text> }
                        <Text>
                            { item.isAllDay ?
                              moment.utc(item.startingDate).format('YYYY.MM.DD.') :
                              moment.utc(item.startingDate).format('YYYY.MM.DD. HH:mm') }
                            { ' - ' }
                            { item.isAllDay ?
                              moment.utc(item.endingDate).format('YYYY.MM.DD.') :
                              moment.utc(item.endingDate).format('YYYY.MM.DD. HH:mm')
                            }
                        </Text>
                    </HStack>
                    <HStack alignItems='center'>
                        <Entypo
                            name='clock'
                            size={ 24 }
                            color='black'
                            style={ styles.icon }
                        />
                        <Text>
                            { i18n.t('activityReminder') + ': ' }
                            { item.reminder > 0 ? item.reminder + ' ' +
                                i18n.t(`activity${ item.timeType[0].toUpperCase() + item.timeType.substring(1) }`) : '-' }
                        </Text>
                    </HStack>
                    { item.photoReference &&
                        <HStack alignItems='center'>
                            <Entypo
                                name='image'
                                size={ 24 }
                                color='black'
                                style={ styles.icon }
                            />
                            <Image
                                source={ { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ item.photoReference }&key=${ ENV().googleApiKey }` } }
                                width={ 120 }
                                height={ 120 }
                                alt='Image'
                                style={ styles.image }
                            />
                        </HStack> }
                </VStack>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a7f3d0',
        width: Dimensions.get('window').width * 0.9,
        padding: 8,
        marginVertical: 6,
        borderRadius: 10,
        overflow: 'hidden'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },
    image: {
        marginLeft: 2,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#065f46',
        borderWidth: 2
    },
    isAllDay: {
        marginRight: 8
    },
    icon: {
        marginRight: 4
    }
});

export default UserActivityItem;