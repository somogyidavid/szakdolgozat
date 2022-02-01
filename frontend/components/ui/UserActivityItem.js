import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { HStack, Image, Text, View, VStack } from 'native-base';
import moment from 'moment';
import ENV from '../../constants/env';
import i18n from 'i18n-js';

const UserActivityItem = props => {
    const { item } = props;

    return (
        <TouchableOpacity activeOpacity={ 0.6 }>
            <View style={ styles.container }>
                <VStack>
                    <Text style={ styles.title }>{ item.name }</Text>
                    <Text>{ item.location.formattedAddress }</Text>
                    <HStack>
                        { item.isAllDay && <Text style={ styles.isAllDay }>{ i18n.t('activityAllDay') }:</Text> }
                        <Text>
                            { moment.utc(item.startingDate).format('YYYY.MM.DD') }{ ' - ' }
                            { moment.utc(item.endingDate).format('YYYY.MM.DD') }
                        </Text>
                    </HStack>
                    <Text>
                        { i18n.t('activityReminder') }: { item.reminder } { i18n.t(`activity${ item.timeType[0].toUpperCase() + item.timeType.substring(1) }`) }
                    </Text>
                    { item.details.photos &&
                        <Image
                            source={ { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ item.details.photos[0].photo_reference }&key=${ ENV().googleApiKey }` } }
                            width={ 120 }
                            height={ 120 }
                            alt='Image'
                            style={ styles.image }
                        /> }
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
        marginVertical: 4,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#065f46',
        borderWidth: 2
    },
    isAllDay: {
        marginRight: 8
    }
});

export default UserActivityItem;