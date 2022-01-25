import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Button, HStack, Modal, Switch, Text, View, VStack } from 'native-base';
import i18n from 'i18n-js';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

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
        setIsAllDay
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

    return (
        <Modal isOpen={ isOpen }>
            <Modal.Content
                maxWidth={ 400 }
                width={ Dimensions.get('window').width - 40 }
                height={ Dimensions.get('window').height * 0.35 }
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
                    Válassz időpontot!
                </Modal.Header>
                <Modal.Body>
                    <VStack>
                        <HStack
                            justifyContent='center'
                            alignItems='center'
                            space={ 6 }
                        >
                            <VStack style={ styles.container }>
                                <Text style={ styles.text }>Kezdés</Text>
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
                                <Text style={ styles.text }>Vége</Text>
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
                            <Text>Egész nap</Text>
                            <Switch
                                size='md'
                                marginLeft={ 2 }
                                colorScheme='indigo'
                                defaultIsChecked={ true }
                                isChecked={ isAllDay }
                                onToggle={ () => setIsAllDay(!isAllDay) }
                            />
                        </HStack>
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
                            Beállít
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