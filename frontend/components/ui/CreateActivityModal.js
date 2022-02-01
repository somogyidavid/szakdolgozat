import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { View, StyleSheet, Dimensions, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import {
    Button,
    Divider,
    FormControl,
    HStack,
    Icon,
    Input,
    Modal,
    Switch,
    Text,
    VStack, Select, CheckIcon, WarningOutlineIcon
} from 'native-base';
import Slider from '@react-native-community/slider';
import MapView, { Marker } from 'react-native-maps';
import DatePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import SelectorMap from './SelectorMap';
import ModeSelectorModal from './ModeSelectorModal';
import { getAddress } from '../../services/LocationService';
import { useSelector } from 'react-redux';
import i18n from 'i18n-js';
import ActivityAdvisorModal from './ActivityAdvisorModal';

const CreateActivityModal = props => {
    const location = useSelector(state => state.location.location);

    const [didSelectMode, setDidSelectMode] = useState(false);
    const [inputTouched, setInputTouched] = useState(false);
    const [isCustom, setIsCustom] = useState(false);
    const [title, setTitle] = useState('');
    const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);
    const [isAllDay, setIsAllDay] = useState(true);
    const [reminder, setReminder] = useState(60);
    const [timeType, setTimeType] = useState('minute');
    const [selectedStartingDate, setSelectedStartingDate] = useState(new Date());
    const [selectedEndingDate, setSelectedEndingDate] = useState(new Date());
    const [isStarting, setIsStarting] = useState(true);
    const [dateTimePickerMode, setDateTimePickerMode] = useState('date');
    const [locationPickerVisible, setLocationPickerVisible] = useState(false);
    const [mapRegion, setMapRegion] = useState({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    });
    const [pickedLocation, setPickedLocation] = useState({
        latitude: location.lat,
        longitude: location.lng
    });
    const [formattedAddress, setFormattedAddress] = useState({
        city: 'Budapest',
        formattedAddress: 'Budapest'
    });

    useEffect(() => {
        if (props.isEdit) {
            setTitle(props.item.name);
            setSelectedStartingDate(new Date(props.item.startingDate));
            setSelectedEndingDate(new Date(props.item.endingDate));
            setPickedLocation({
                latitude: props.item.location.latitude,
                longitude: props.item.location.longitude
            });
            setMapRegion({
                latitude: props.item.location.latitude,
                longitude: props.item.location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            });
            setReminder(props.item.reminder);
            setTimeType(props.item.timeType);
        }
    }, [props.isEdit]);

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
        let selectedDate = selectedPickerDate;

        if (isStarting) {
            selectedDate = selectedStartingDate;
        } else {
            selectedDate = selectedEndingDate;
        }

        const date = selectedPickerDate || selectedDate;

        if (dateTimePickerMode === 'time') {
            date.setHours(date.getHours() + 1);
        }
        setDateTimePickerVisible(Platform.OS === 'ios');

        if (isStarting) {
            setSelectedStartingDate(date);
            if (props.isEdit) {
                setSelectedEndingDate(date);
            }
        } else {
            setSelectedEndingDate(date);
        }

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

    const getData = () => {
        return {
            name: title,
            isAllDay: isAllDay,
            startingDate: selectedStartingDate,
            endingDate: selectedEndingDate,
            location: {
                city: formattedAddress.city,
                formattedAddress: formattedAddress.formattedAddress,
                latitude: pickedLocation.latitude,
                longitude: pickedLocation.longitude
            },
            reminder: reminder,
            timeType: timeType,
            details: {}
        };
    };

    const resetUI = () => {
        setTitle('');
        setInputTouched(false);
        setSelectedStartingDate(new Date());
        setSelectedEndingDate(new Date());
        setPickedLocation({
            latitude: location.lat,
            longitude: location.lng
        });
        setMapRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        });
        setReminder(60);
        setTimeType('minute');
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
                isOpen={ isCustom && didSelectMode || props.isEdit }
                onClose={ () => props.isEdit ? props.editHandler() : props.setShowModal(false) }
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
                        <Modal.Header
                            _text={ {
                                textAlign: 'center',
                                bg: 'indigo.500',
                                color: '#FFF',
                                borderRadius: 10,
                                padding: 2,
                                overflow: 'hidden'
                            } }
                        >
                            { props.isEdit ? i18n.t('activityEdit') : i18n.t('activityCreate') }
                        </Modal.Header>
                        <Modal.Body>
                            <View>
                                <FormControl isInvalid={ title === '' && inputTouched }>
                                    <FormControl.Label>
                                        <Text style={ styles.label }>
                                            { i18n.t('activityName') }
                                        </Text>
                                    </FormControl.Label>
                                    <Input
                                        value={ title }
                                        variant='rounded'
                                        borderWidth={ 2 }
                                        _focus={ {
                                            borderWidth: 2,
                                            borderColor: (title === '' && inputTouched) ? 'error.600' : 'muted.400'
                                        } }
                                        InputLeftElement={
                                            <Icon
                                                as={ <MaterialIcons name='event' /> }
                                                size={ 5 }
                                                ml='2'
                                                color='muted.400'
                                            />
                                        }
                                        onTouchStart={ () => setInputTouched(true) }
                                        onChangeText={ (text) => setTitle(text) }
                                    />
                                    <FormControl.ErrorMessage leftIcon={ <WarningOutlineIcon size='xs' /> }>
                                        { i18n.t('activityMissingTitle') }
                                    </FormControl.ErrorMessage>
                                    <Divider
                                        my={ 3 }
                                        thickness={ 2 }
                                    />
                                    <FormControl.Label>
                                        <Text style={ styles.label }>{ i18n.t('activityDate') }</Text>
                                    </FormControl.Label>
                                    <HStack
                                        justifyContent='space-evenly'
                                    >
                                        <VStack
                                            justifyContent='space-evenly'
                                            space='sm'
                                        >
                                            <Text style={ styles.dateLabel }>{ i18n.t('activityStart') }</Text>
                                            <Text style={ styles.dateLabel }>{ i18n.t('activityEnd') }</Text>
                                        </VStack>
                                        <VStack
                                            justifyContent='space-evenly'
                                            space='sm'
                                        >
                                            <Button
                                                variant='subtle'
                                                width={ 200 }
                                                onPress={ () => {
                                                    setDateTimePickerVisible(true);
                                                    setIsStarting(true);
                                                } }
                                            >
                                                { isAllDay ?
                                                  selectedStartingDate.toISOString().slice(0, 10) :
                                                  selectedStartingDate.toISOString().slice(0, 16)
                                                      .replace('T', '   ')
                                                }
                                            </Button>
                                            <Button
                                                variant='subtle'
                                                width={ 200 }
                                                onPress={ () => {
                                                    setDateTimePickerVisible(true);
                                                    setIsStarting(false);
                                                } }
                                            >
                                                { isAllDay ?
                                                  selectedEndingDate.toISOString().slice(0, 10) :
                                                  selectedEndingDate.toISOString().slice(0, 16)
                                                      .replace('T', '   ')
                                                }
                                            </Button>
                                        </VStack>
                                    </HStack>
                                    <HStack
                                        alignItems='center'
                                        justifyContent='flex-end'
                                        marginTop={ 2 }
                                        marginRight={ 5 }
                                    >
                                        <Text>{ i18n.t('activityAllDay') }</Text>
                                        <Switch
                                            size='md'
                                            marginLeft={ 2 }
                                            colorScheme='indigo'
                                            defaultIsChecked={ props.isEdit }
                                            isChecked={ isAllDay }
                                            onToggle={ () => setIsAllDay(!isAllDay) }
                                        />
                                    </HStack>
                                    <View>
                                        { dateTimePickerVisible && <DatePicker
                                            value={ isStarting ? selectedStartingDate : selectedEndingDate }
                                            minimumDate={ isStarting ? props.isEdit ? selectedStartingDate : new Date() : selectedStartingDate }
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
                                        <Text style={ styles.label }>{ i18n.t('activityLocation') }</Text>
                                    </FormControl.Label>
                                    { pickedLocation && <VStack
                                        alignItems='center'
                                    >
                                        <Text style={ styles.cityLabel }>{ formattedAddress.city }, { formattedAddress.formattedAddress.slice(
                                            formattedAddress.formattedAddress.indexOf(',') + 1).slice(0, -8) }</Text>
                                        <Button
                                            variant='subtle'
                                            style={ { marginLeft: 20, marginBottom: 6 } }
                                            onPress={ () => setLocationPickerVisible(true) }
                                        >
                                            { i18n.t('activityChoosePlace') }
                                        </Button>
                                    </VStack> }
                                    <View style={ styles.mapContainer }>
                                        <MapView
                                            region={ mapRegion }
                                            style={ styles.map }
                                            moveOnMarkerPress={ true }
                                            scrollEnabled={ false }
                                        >
                                            <Marker
                                                coordinate={ pickedLocation }
                                                title={ formattedAddress.formattedAddress }
                                            />
                                        </MapView>
                                    </View>
                                    <Divider
                                        my={ 3 }
                                        thickness={ 2 }
                                    />
                                    <HStack
                                        alignItems='center'
                                        justifyContent='flex-start'
                                    >
                                        <FormControl.Label>
                                            <Text style={ styles.label }>{ i18n.t('activityReminder') }</Text>
                                        </FormControl.Label>
                                        <Switch
                                            size='md'
                                            colorScheme='indigo'
                                            isChecked={ reminder > 0 }
                                            defaultIsChecked={ props.reminder > 0 }
                                            onToggle={ () => reminder > 0 ? setReminder(0) : setReminder(60) }
                                        />
                                    </HStack>
                                </FormControl>
                                <HStack
                                    alignItems='center'
                                    justifyContent='center'
                                    marginX={ 5 }
                                >
                                    <Slider
                                        style={ { width: 300, height: 40 } }
                                        value={ 60 }
                                        minimumValue={ 10 }
                                        maximumValue={ 120 }
                                        step={ 10 }
                                        minimumTrackTintColor='#818cf8'
                                        maximumTrackTintColor='#808080'
                                        thumbTintColor='#3730a3'
                                        disabled={ reminder <= 0 }
                                        onValueChange={ (value) => {
                                            if (timeType === 'minute') {
                                                setReminder(value);
                                            } else {
                                                setReminder(value / 10);
                                            }
                                        } }
                                    />
                                </HStack>
                                { reminder > 0 && < HStack
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Text>{ reminder }</Text>
                                    <Select
                                        selectedValue={ timeType }
                                        minWidth={ 140 }
                                        placeholder='Válassz az alábbiak közül!'
                                        textAlign='center'
                                        _selectedItem={ {
                                            bg: 'teal.600',
                                            endIcon: <CheckIcon size='5' />,
                                        } }
                                        _item={ { justifyContent: 'center' } }
                                        mt={ 1 }
                                        ml={ 2 }
                                        onValueChange={ (itemValue) => {
                                            if (itemValue === 'hour' && timeType !== 'day') {
                                                setReminder(reminder / 10);
                                            } else if (itemValue === 'day' && timeType !== 'hour') {
                                                setReminder(reminder / 10);
                                            } else if (itemValue === 'minute'
                                                && (timeType === 'hour' || timeType === 'day')) {
                                                setReminder(reminder * 10);
                                            }
                                            setTimeType(itemValue);
                                        } }
                                    >
                                        <Select.Item
                                            label={ i18n.t('activityMinute') }
                                            value='minute'
                                        />
                                        <Select.Item
                                            label={ i18n.t('activityHour') }
                                            value='hour'
                                        />
                                        <Select.Item
                                            label={ i18n.t('activityDay') }
                                            value='day'
                                        />
                                    </Select>
                                </HStack> }
                                <Divider
                                    my={ 3 }
                                    thickness={ 2 }
                                />
                            </View>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={ 2 }>
                                <Button
                                    variant='ghost'
                                    colorScheme='blueGray'
                                    onPress={ () => {
                                        props.isEdit ? props.editHandler() : setDidSelectMode(false);
                                        setInputTouched(false);
                                    } }
                                >
                                    { i18n.t('cancel') }
                                </Button>
                                <Button
                                    onPress={ () => {
                                        if (title !== '') {
                                            const data = getData();
                                            console.log(data);
                                            resetUI();
                                            if (props.isEdit) {
                                                props.editHandler();
                                            } else {
                                                setDidSelectMode(false);
                                            }
                                        } else {
                                            Alert.alert('Hiba!', 'Az esemény nevét kötelező megadni!');
                                            setInputTouched(true);
                                        }
                                    } }
                                >
                                    { i18n.t('save') }
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
            <ActivityAdvisorModal
                isOpen={ !isCustom && didSelectMode }
                onCloseHandler={ () => {
                    setDidSelectMode(false);
                    props.setShowModal(false);
                } }
                navigation={ props.navigation }
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
    },
    label: {
        textAlign: 'center',
        backgroundColor: '#6366f1',
        color: '#FFF',
        borderRadius: 10,
        padding: 6,
        overflow: 'hidden'
    },
    cityLabel: {
        textAlign: 'center',
        backgroundColor: '#cffafe',
        color: '#0e7490',
        borderRadius: 10,
        padding: 4,
        margin: 2,
        marginBottom: 6
    },
    dateLabel: {
        backgroundColor: '#cffafe',
        color: '#0e7490',
        borderRadius: 10,
        padding: 8,
        textAlign: 'center'
    }
});

export default CreateActivityModal;