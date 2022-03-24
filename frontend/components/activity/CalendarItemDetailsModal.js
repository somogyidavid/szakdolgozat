import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Center, HStack, Modal, Text, VStack } from 'native-base';
import i18n from 'i18n-js';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';

const CalendarItemDetailsModal = props => {
    const { isOpen, setIsOpen, item } = props;

    return (
        <View>
            { item && item.location && <Modal isOpen={ isOpen }>
                <Modal.Content
                    maxWidth='400px'
                    width={ Dimensions.get('window').width - 40 }
                    height={ Dimensions.get('window').height * 0.9 }
                >
                    <Modal.Header
                        _text={ {
                            textAlign: 'center',
                            bg: 'primary.700',
                            color: '#FFF',
                            borderRadius: 10,
                            padding: 2,
                            overflow: 'hidden',
                            fontFamily: 'open-sans-bold'
                        } }
                    >
                        { item.name }
                    </Modal.Header>
                    <Modal.Body>
                        <VStack>
                            <HStack alignItems='center'>
                                <MaterialCommunityIcons
                                    name='clock-start'
                                    size={ 30 }
                                    color='black'
                                />
                                <Text
                                    ml={ 2 }
                                    style={ styles.label }
                                >{ i18n.t('activityStartingDate') }</Text>
                            </HStack>
                            <Center>
                                <Text
                                    my={ 2 }
                                    style={ styles.data }
                                >
                                    { item.isAllDay ?
                                      moment.utc(item.startingDate).format('YYYY.MM.DD.') :
                                      moment.utc(item.startingDate).format('YYYY.MM.DD. HH:mm') }
                                </Text>
                            </Center>
                            <HStack alignItems='center'>
                                <MaterialCommunityIcons
                                    name='clock-end'
                                    size={ 30 }
                                    color='black'
                                />
                                <Text
                                    ml={ 2 }
                                    style={ styles.label }
                                >{ i18n.t('activityEndingDate') }</Text>
                            </HStack>
                            <Center>
                                <Text
                                    my={ 2 }
                                    style={ styles.data }
                                >
                                    { item.isAllDay ?
                                      moment.utc(item.endingDate).format('YYYY.MM.DD.') :
                                      moment.utc(item.endingDate).format('YYYY.MM.DD. HH:mm') }
                                </Text>
                            </Center>
                            <HStack alignItems='center'>
                                <Ionicons
                                    name='today'
                                    size={ 30 }
                                    color='black'
                                />
                                <Text
                                    mx={ 2 }
                                    style={ styles.label }
                                >{ i18n.t('activityAllDay') }</Text>
                                { item.isAllDay ?
                                  <FontAwesome
                                      name='check-square'
                                      size={ 28 }
                                      color='green'
                                  /> :
                                  <Entypo
                                      name='squared-cross'
                                      size={ 28 }
                                      color='red'
                                  /> }
                            </HStack>
                            <HStack
                                mt={ 2 }
                                alignItems='center'
                            >
                                <Entypo
                                    name='location'
                                    size={ 30 }
                                    color='black'
                                />
                                <Text
                                    ml={ 2 }
                                    style={ styles.label }
                                >{ i18n.t('activityLocation') }</Text>
                            </HStack>
                            <Center>
                                <Text
                                    my={ 2 }
                                    textAlign='center'
                                    style={ styles.data }
                                >
                                    { item.location.formattedAddress }
                                </Text>
                            </Center>
                            <View style={ styles.mapContainer }>
                                <MapView
                                    region={ {
                                        latitude: item.location.latitude,
                                        longitude: item.location.longitude,
                                        latitudeDelta: 0.08,
                                        longitudeDelta: 0.08
                                    } }
                                    style={ styles.map }
                                    moveOnMarkerPress={ true }
                                    scrollEnabled={ false }
                                >
                                    <Marker
                                        coordinate={ {
                                            latitude: item.location.latitude,
                                            longitude: item.location.longitude
                                        } }
                                        title={ item.location.formattedAddress }
                                    />
                                </MapView>
                            </View>
                            <HStack
                                mt={ 3 }
                                alignItems='center'
                            >
                                <Entypo
                                    name='location'
                                    size={ 30 }
                                    color='black'
                                />
                                <Text
                                    mx={ 2 }
                                    style={ styles.label }
                                >{ i18n.t('activityReminder') }</Text>
                                { item.reminder === 0 && <Entypo
                                    name='squared-cross'
                                    size={ 28 }
                                    color='red'
                                /> }
                            </HStack>
                            { item.reminder > 0 && <Center>
                                <Text
                                    mt={ 1 }
                                    style={ styles.data }
                                >
                                    { item.reminder > 0 ? item.reminder + ' ' +
                                        i18n.t(`activity${ item.timeType[0].toUpperCase() + item.timeType.substring(1) }`) : '-' }
                                </Text>
                            </Center> }
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant='solid'
                            colorScheme='cyan'
                            onPress={ () => {
                                setIsOpen(false);
                            } }
                        >
                            { i18n.t('back') }
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal> }
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden'
    },
    map: {
        height: 300,
        width: '100%'
    },
    label: {
        backgroundColor: '#0e7490',
        color: '#FFF',
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 10,
        overflow: 'hidden'
    },
    data: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        textAlign: 'center'
    }
});

export default CalendarItemDetailsModal;