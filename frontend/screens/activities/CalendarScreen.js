import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import { PresenceTransition, Toast, Button, Fab, Icon } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Colors from '../../constants/Colors';
import Title from '../../components/ui/Title';
import i18n from 'i18n-js';
import CalendarDayItem from '../../components/ui/CalendarDayItem';
import { AntDesign } from '@expo/vector-icons';
import CreateActivityModal from '../../components/ui/CreateActivityModal';
import moment from 'moment';
import * as Localization from 'expo-localization';
import { useSelector } from 'react-redux';

LocaleConfig.locales['hu'] = {
    monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus',
        'Szeptember', 'Október', 'November', 'December'],
    monthNamesShort: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus',
        'Szeptember', 'Október', 'November', 'December'],
    dayNames: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
    dayNamesShort: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
    today: 'Ma'
};

LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'Oktober', 'November', 'December'],
    monthNamesShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'Oktober', 'November', 'December'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'],
    today: 'Today'
};

if (Localization.locale === 'hu-HU') {
    LocaleConfig.defaultLocale = 'hu';
} else {
    LocaleConfig.defaultLocale = 'en';
}

const CalendarScreen = props => {
    const currentDate = new Date();
    const flatListRef = useRef();
    const isFocused = useIsFocused();
    const activities = useSelector(state => state.userActivities.activities);
    const [margin, setMargin] = useState(145);
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
            setIsOpen(false);
            setMargin(145);
            Toast.show({
                title: i18n.t('tip'),
                status: 'info',
                description: i18n.t('calendarTip'),
                duration: null,
                placement: 'bottom',
                onCloseComplete: () => {
                    setMargin(50);
                }
            });
        } else {
            Toast.closeAll();
        }
    }, [isFocused]);

    const currentActivities = activities.filter((item) => {
        return moment(selectedDate).isBetween(moment(item.startingDate), moment(item.endingDate), 'day', '[]');
    }).sort((a, b) => {
        return a.startingDate - b.startingDate;
    });

    return (
        <View style={ styles.container }>
            <Title
                content={ i18n.t('myCalendar') }
                cardStyle={ { backgroundColor: '#155e75' } }
            />
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
                                selectedColor: '#155e75',
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
                { isFocused && <Fab
                    placement={ 'bottom-right' }
                    renderInPortal={ true }
                    icon={ <Icon
                        color='white'
                        as={ <AntDesign name='plus' /> }
                        size='sm'
                    /> }
                    style={ { marginBottom: margin, backgroundColor: '#155e75' } }
                    onPress={ () => {
                        Toast.closeAll();
                        setShowModal(true);
                    } }
                /> }
                <CreateActivityModal
                    showModal={ showModal }
                    setShowModal={ setShowModal }
                    navigation={ props.navigation }
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
                    { currentActivities.length > 0 ?
                      <FlatList
                          ref={ flatListRef }
                          style={ styles.flatList }
                          data={ currentActivities }
                          renderItem={ ({ index, item }) => <CalendarDayItem
                              item={ item }
                              selectedDate={ selectedDate }
                          /> }
                          keyExtractor={ (item, index) => index.toString() }
                      /> :
                      <Text style={ styles.noActivity }>
                          { i18n.t('noActivity') }
                      </Text>
                    }
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
        backgroundColor: '#cffafe',
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
    },
    noActivity: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#a5f3fc',
        borderRadius: 10,
        padding: 6,
    }
});

export default CalendarScreen;