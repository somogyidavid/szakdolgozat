import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { PresenceTransition, Toast, Button, Fab, Icon, Box, Center } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Colors from '../../constants/Colors';
import Title from '../../components/ui/Title';
import i18n from 'i18n-js';
import CalendarDayItem from '../../components/ui/CalendarDayItem';
import { AntDesign } from '@expo/vector-icons';

LocaleConfig.locales['hu'] = {
    monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus',
        'Szeptember', 'Október', 'November', 'December'],
    monthNamesShort: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus',
        'Szeptember', 'Október', 'November', 'December'],
    dayNames: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
    dayNamesShort: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
    today: 'Ma'
};

LocaleConfig.defaultLocale = 'hu';

const CalendarScreen = props => {
    const currentDate = new Date();
    const flatListRef = useRef();
    const isFocused = useIsFocused();
    const [offset, setOffset] = useState(6);
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(`${ currentDate.getFullYear() }-${ currentDate.getMonth() + 1 }-${ currentDate.getDate() }`);
    const [markedDates, setMarkedDates] = useState({
        [selectedDate]: {
            selected: true,
            selectedColor: Colors.darkPurple,
            marked: true,
            dotColor: 'white'
        }
    });

    useEffect(() => {
        if (isFocused) {
            setOffset(6);
            Toast.show({
                title: 'Tipp',
                status: 'info',
                description: 'A naptár egyik napjára nyomva megtekintheted a programjaid az adott napra!',
                duration: null,
                placement: 'bottom',
                onCloseComplete: () => {
                    setOffset(16);
                }
            });
        } else {
            Toast.closeAll();
        }
    }, [isFocused]);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: currentDate.getHours() });
        }
    }, []);

    const hours = [
        { time: '00:00' }, { time: '01:00' }, { time: '02:00' }, { time: '03:00' }, { time: '04:00' },
        { time: '05:00' }, { time: '06:00' }, { time: '07:00' }, { time: '08:00' }, { time: '09:00' },
        { time: '10:00' }, { time: '11:00' }, { time: '12:00' }, { time: '13:00' }, { time: '14:00' },
        { time: '15:00' }, { time: '16:00' }, { time: '17:00' }, { time: '18:00' }, { time: '19:00' },
        { time: '20:00' }, { time: '21:00' }, { time: '22:00' }, { time: '23:00' }
    ];

    const getItemLayout = (data, index) => {
        return {
            length: 120,
            offset: 120 * index,
            index
        };
    };

    return (
        <View style={ styles.container }>
            <Title content={ i18n.t('myCalendar') } />
            <PresenceTransition
                visible={ !isOpen }
                initial={ { opacity: 0, scale: 0 } }
                animate={ {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 250
                    }
                } }
            >
                <Calendar
                    style={ styles.calendar }
                    current={ currentDate }
                    onDayPress={ (day) => {
                        Toast.closeAll();
                        setSelectedDate(day.dateString);
                        setIsOpen(!isOpen);
                        setIsDisabled(false);
                        setMarkedDates({
                            [day.dateString]: {
                                selected: true,
                                selectedColor: Colors.darkPurple,
                                marked: true,
                                dotColor: 'white'
                            }
                        });
                    } }
                    hideArrows={ false }
                    firstDay={ 1 }
                    showWeekNumbers={ true }
                    enableSwipeMonths={ true }
                    markingType={ 'dot' }
                    markedDates={ markedDates }
                />
                <Fab
                    placement={ 'bottom-right' }
                    colorScheme={ 'indigo' }
                    icon={ <Icon
                        color='white'
                        as={ <AntDesign name='plus' /> }
                        size='sm'
                    /> }
                    style={ { marginBottom: Dimensions.get('window').height / offset } }
                    onPress={ () => {
                        console.log('FAB pressed!');
                    } }
                />
            </PresenceTransition>
            <PresenceTransition
                style={ styles.dayDetailsContainer }
                visible={ isOpen }
                initial={ { opacity: 0, scale: 0 } }
                animate={ { opacity: 1, scale: 1, transition: { duration: 250 } } }
            >
                <View style={ styles.dayDetailsContainer }>
                    <Title content={ selectedDate } />
                    <FlatList
                        ref={ flatListRef }
                        style={ styles.flatList }
                        data={ hours }
                        keyExtractor={ (item, index) => index.toString() }
                        renderItem={ ({ index, item }) => <CalendarDayItem item={ item } /> }
                        initialScrollIndex={ currentDate.getHours() }
                        getItemLayout={ getItemLayout }
                    />
                    <Button
                        onPress={ () => {
                            setIsOpen(!isOpen);
                            setIsDisabled(true);
                        } }
                        style={ styles.button }
                        _text={ { fontSize: 18, fontFamily: 'open-sans-bold' } }
                        disabled={ isDisabled }
                    >
                        { i18n.t('back') }
                    </Button>
                </View>
            </PresenceTransition>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.palePurple,
        padding: 4
    },
    calendar: {
        borderRadius: 10,
        padding: 8,
        width: Dimensions.get('window').width * 0.9
    },
    dayDetailsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 8,
        width: Dimensions.get('window').width * 0.9
    },
    flatList: {
        width: '100%',
        paddingHorizontal: 12
    },
    button: {
        backgroundColor: Colors.darkPurple,
        marginVertical: 10
    }
});

export default CalendarScreen;