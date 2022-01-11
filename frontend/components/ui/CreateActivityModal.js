import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import {
    Button,
    Center,
    Divider,
    FormControl,
    HStack,
    Icon,
    Input,
    Modal,
    ScrollView,
    Switch,
    Text,
    VStack
} from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import DatePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import SelectorMap from './SelectorMap';
import ModeSelectorModal from './ModeSelectorModal';
import { getAddress } from '../../services/LocationService';

const CreateActivityModal = props => {
    const [didSelectMode, setDidSelectMode] = useState(false);
    const [isCustom, setIsCustom] = useState(false);
    const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);
    const [isAllDay, setIsAllDay] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateTimePickerMode, setDateTimePickerMode] = useState('date');
    const [locationPickerVisible, setLocationPickerVisible] = useState(false);
    const [mapRegion, setMapRegion] = useState({
        latitude: 47.5058804,
        longitude: 19.0709506,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    });
    const [pickedLocation, setPickedLocation] = useState({
        latitude: 47.5058804,
        longitude: 19.0709506
    });
    const [formattedAddress, setFormattedAddress] = useState({
        city: 'Budapest',
        formattedAddress: 'Budapest'
    });

    useEffect(() => {
        const getAddressHandler = async () => {
            const result = await getAddress({
                lat: pickedLocation.latitude,
                lng: pickedLocation.longitude
            });

            setFormattedAddress(result);
        };

        getAddressHandler();
    }, [pickedLocation]);

    const onChange = (event, selectedPickerDate) => {
        const date = selectedPickerDate || selectedDate;
        if (dateTimePickerMode === 'time') {
            date.setHours(date.getHours() + 1);
        }
        setDateTimePickerVisible(Platform.OS === 'ios');
        setSelectedDate(date);

        if (event.type === 'set' && dateTimePickerMode === 'date' && !isAllDay) {
            setDateTimePickerMode('time');
            setDateTimePickerVisible(true);
        }
        if (dateTimePickerMode === 'time' && !isAllDay) {
            setDateTimePickerMode('date');
            setDateTimePickerVisible(Platform.OS === 'ios');
        }
    };

    const mapModalHandler = () => {
        setLocationPickerVisible(false);
    };

    const saveLocationHandler = async (location) => {
        setPickedLocation({
            latitude: location.latitude,
            longitude: location.longitude
        });
        setMapRegion({
            ...mapRegion,
            latitude: location.latitude,
            longitude: location.longitude
        });
        setLocationPickerVisible(false);
    };

    return (
        <View>
            <ModeSelectorModal
                didSelectMode={ didSelectMode }
                setDidSelectMode={ setDidSelectMode }
                showModal={ props.showModal }
                setShowModal={ props.setShowModal }
                isCustom={ isCustom }
                setIsCustom={ setIsCustom }
            />
            <Modal
                isOpen={ isCustom && didSelectMode }
                onClose={ () => props.setShowModal(false) }
            >
                <KeyboardAvoidingView
                    behavior='height'
                    enabled={ true }
                >
                    <Modal.Content
                        maxWidth='400px'
                        width={ Dimensions.get('window').width - 40 }
                        height={ Dimensions.get('window').height * 0.9 }
                    >
                        <Modal.Header>Esemény létrehozása</Modal.Header>
                        <Modal.Body>
                            <ScrollView>
                                <FormControl>
                                    <FormControl.Label>Esemény neve</FormControl.Label>
                                    <Input
                                        variant='rounded'
                                        InputLeftElement={
                                            <Icon
                                                as={ <MaterialIcons name='event' /> }
                                                size={ 5 }
                                                ml='2'
                                                color='muted.400'
                                            />
                                        }
                                    />
                                    <Divider
                                        my={ 3 }
                                        thickness={ 2 }
                                    />
                                    <FormControl.Label>Esemény helye</FormControl.Label>
                                    <Divider
                                        my={ 3 }
                                        thickness={ 2 }
                                    />
                                    <FormControl.Label>
                                        <HStack
                                            alignItems='center'
                                            space={ 6 }
                                        >
                                            <Text>Időpont</Text>
                                            <VStack alignItems={ 'center' }>
                                                <HStack
                                                    alignItems='center'
                                                >
                                                    <Text>Egésznapos</Text>
                                                    <Switch
                                                        size='md'
                                                        colorScheme='indigo'
                                                        isChecked={ isAllDay }
                                                        onToggle={ () => setIsAllDay(!isAllDay) }
                                                    />
                                                </HStack>
                                                <Button
                                                    variant='subtle'
                                                    width={ 200 }
                                                    onPress={ () => {
                                                        setDateTimePickerVisible(true);
                                                    } }
                                                >
                                                    { isAllDay ?
                                                      selectedDate.toISOString().slice(0, 10) :
                                                      selectedDate.toISOString().slice(0, 16)
                                                          .replace('T', '   ')
                                                    }
                                                </Button>
                                            </VStack>
                                        </HStack>
                                    </FormControl.Label>
                                    <View>
                                        { dateTimePickerVisible && <DatePicker
                                            value={ selectedDate }
                                            mode={ dateTimePickerMode }
                                            is24Hour={ true }
                                            display='default'
                                            onChange={ onChange }
                                        /> }
                                    </View>
                                    <Divider
                                        my={ 3 }
                                        thickness={ 2 }
                                    />
                                    <FormControl.Label>
                                        <HStack
                                            space={ 2 }
                                            alignItems='center'
                                        >
                                            <Text>Esemény helye</Text>
                                            <Button
                                                variant='subtle'
                                                style={ { marginLeft: 20 } }
                                                onPress={ () => setLocationPickerVisible(true) }
                                            >Hely kiválasztása</Button>
                                        </HStack>
                                    </FormControl.Label>
                                    { pickedLocation && <VStack alignItems='center'>
                                        <Text>{ formattedAddress.city }</Text>
                                        <Text>{ formattedAddress.formattedAddress.slice(
                                            formattedAddress.formattedAddress.indexOf(',') + 1).slice(0, -8) }</Text>
                                    </VStack> }
                                    <View style={ styles.mapContainer }>
                                        <MapView
                                            region={ mapRegion }
                                            style={ styles.map }
                                            moveOnMarkerPress={ true }
                                        >
                                            <Marker
                                                coordinate={ pickedLocation }
                                                title='Test Marker'
                                            />
                                        </MapView>
                                    </View>
                                </FormControl>
                            </ScrollView>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={ 2 }>
                                <Button
                                    variant='ghost'
                                    colorScheme='blueGray'
                                    onPress={ () => {
                                        setDidSelectMode(false);
                                    } }
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onPress={ () => {
                                        props.setShowModal(false);
                                    } }
                                >
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </KeyboardAvoidingView>
            </Modal>
            <SelectorMap
                visible={ locationPickerVisible }
                closeHandler={ mapModalHandler }
                saveHandler={ saveLocationHandler }
            />
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
    }
});

export default CreateActivityModal;