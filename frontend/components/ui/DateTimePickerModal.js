import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Button, CheckIcon, HStack, Modal, Select, Switch, Text, View, VStack } from 'native-base';
import i18n from 'i18n-js';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Slider from '@react-native-community/slider';

const DateTimePickerModal = props => {
    const {
        isOpen,
        setTimePickerOpen,
        selectedStartingDate,
        selectedEndingDate,
        setSelectedStartingDate,
        setSelectedEndingDate,
        setDateSelected,
        isAllDay,
        setIsAllDay,
        reminder,
        setReminder,
        timeType,
        setTimeType
    } = props;
    const [dataTimePickerVisible, setDateTimePickerVisible] = useState(false);
    const [isStarting, setIsStarting] = useState(true);
    const [dateTimePickerMode, setDateTimePickerMode] = useState('date');


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
            setSelectedEndingDate(date);
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

    return (
        <Modal isOpen={ isOpen }>
            <Modal.Content
                maxWidth={ 400 }
                width={ Dimensions.get('window').width - 40 }
                height={ Dimensions.get('window').height * 0.55 }
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
                    { i18n.t('chooseDate') }
                </Modal.Header>
                <Modal.Body>
                    <VStack>
                        <HStack
                            justifyContent='center'
                            alignItems='center'
                            space={ 6 }
                        >
                            <VStack style={ styles.container }>
                                <Text style={ styles.text }>{ i18n.t('activityStart') }</Text>
                                <Button
                                    onPress={ () => {
                                        setIsStarting(true);
                                        setDateTimePickerVisible(true);
                                    } }
                                >
                                    { isAllDay ? moment.utc(selectedStartingDate).format('YYYY-MM-DD') :
                                      moment.utc(selectedStartingDate).format('YYYY-MM-DD HH:mm') }
                                </Button>
                            </VStack>
                            <VStack style={ styles.container }>
                                <Text style={ styles.text }>{ i18n.t('activityEnd') }</Text>
                                <Button
                                    onPress={ () => {
                                        setIsStarting(false);
                                        setDateTimePickerVisible(true);
                                    } }
                                >
                                    { isAllDay ? moment.utc(selectedEndingDate).format('YYYY-MM-DD') :
                                      moment.utc(selectedEndingDate).format('YYYY-MM-DD HH:mm') }
                                </Button>
                            </VStack>
                        </HStack>
                        <HStack
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Text>{ i18n.t('activityAllDay') }</Text>
                            <Switch
                                size='md'
                                marginLeft={ 2 }
                                colorScheme='indigo'
                                defaultIsChecked={ true }
                                isChecked={ isAllDay }
                                onToggle={ () => setIsAllDay(!isAllDay) }
                            />
                        </HStack>
                        <VStack alignItems='center'>
                            <HStack
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Text style={ styles.text }>{ i18n.t('activityReminder') }</Text>
                                <Switch
                                    size='md'
                                    colorScheme='indigo'
                                    isChecked={ reminder > 0 }
                                    defaultIsChecked={ props.reminder > 0 }
                                    onToggle={ () => {
                                        if (reminder > 0) {
                                            setReminder(0);
                                        } else {
                                            setReminder(60);
                                            setTimeType('minute');
                                        }
                                    } }
                                />
                            </HStack>
                            <Slider
                                style={ { width: 300, height: 40 } }
                                value={ reminder > 0 ? 60 : reminder }
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
                        </VStack>
                    </VStack>
                    <View>
                        { dataTimePickerVisible && <DatePicker
                            value={ isStarting ? selectedStartingDate : selectedEndingDate }
                            minimumDate={ isStarting ? new Date() : selectedStartingDate }
                            mode={ dateTimePickerMode }
                            is24Hour={ true }
                            display='default'
                            onChange={ onChange }
                        /> }
                    </View>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={ 2 }>
                        <Button
                            variant='ghost'
                            colorScheme='blueGray'
                            onPress={ () => {
                                setTimePickerOpen(false);
                            } }
                        >
                            { i18n.t('cancel') }
                        </Button>
                        <Button
                            onPress={ () => {
                                setDateSelected(true);
                                setTimePickerOpen(false);
                            } }
                        >
                            { i18n.t('setDate') }
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 6
    },
    text: {
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 6,
        backgroundColor: '#818cf8',
        color: '#FFF',
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        padding: 2,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default DateTimePickerModal;