import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Divider, FlatList, HStack, Modal, Text, View, } from 'native-base';
import i18n from 'i18n-js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../../services/ActivitiesService';
import { Ionicons } from '@expo/vector-icons';
import ActivityItem from './ActivityItem';
import FilterModal from './FilterModal';
import DateTimePickerModal from './DateTimePickerModal';
import moment from 'moment';
import { insertUserActivity } from '../../services/UserActivitiesService';
import { PlacesTypes } from '../../data/places-types';

const ActivityAdvisorModal = props => {
    const dispatch = useDispatch();
    const location = useSelector(state => state.location.location);
    const isLoading = useSelector(state => state.activities.isLoading);
    const activities = useSelector(state => state.activities.activities);
    const interests = useSelector(state => state.user.user).interests;
    const weatherCategory = useSelector(state => state.location.weatherCategory);

    const [modalOpen, setModalOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const [selectedStartingDate, setSelectedStartingDate] = useState(new Date());
    const [selectedEndingDate, setSelectedEndingDate] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(false);
    const [isAllDay, setIsAllDay] = useState(true);
    const [reminder, setReminder] = useState(60);
    const [timeType, setTimeType] = useState('minute');
    const [selectedActivity, setSelectedActivity] = useState('');
    const [filters, setFilters] = useState({
        minimumRating: 1,
        maximumRating: 5,
        minimumPrice: 1,
        maximumPrice: 5
    });

    const getActivitiesHandler = async () => {
        const options = {
            location: {
                latitude: location.lat,
                longitude: location.lng
            },
            types: PlacesTypes.filter((item) => item.weatherCategories.includes(weatherCategory) && interests.includes(item.type)),
        };

        dispatch(fetchActivities(options.location, options.types));
    };

    useEffect(() => {
        const getActivities = async () => {
            await getActivitiesHandler();
        };

        if (modalOpen) {
            getActivities();
        }
    }, [modalOpen]);

    useEffect(() => {
        setModalOpen(props.isOpen);
    }, [props.isOpen]);

    return (
        <View>
            <Modal
                isOpen={ modalOpen }
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
                        { i18n.t('chooseActivity') }
                    </Modal.Header>
                    <Modal.Body
                        _scrollview={ {
                            scrollEnabled: false,
                            nestedScrollEnabled: false,
                            horizontal: true,
                            showsHorizontalScrollIndicator: false,
                            showsVerticalScrollIndicator: false
                        } }
                        style={ isLoading ? {
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: (Dimensions.get('window').width * 0.75) / 2
                        } : {} }
                    >
                        { isLoading ?
                          <View style={ styles.loadingSpinner }>
                              <ActivityIndicator
                                  size='large'
                                  color='#000'
                              />
                          </View> :
                          <View>
                              <FlatList
                                  data={ activities.filter(item => {
                                      return (item.rating || item.price_level) && item.photos;
                                  }).filter(item => {
                                      if (item.rating && !item.price_level) {
                                          return item.rating >= filters.minimumRating && item.rating <= filters.maximumRating;
                                      } else if (!item.rating && item.price_level) {
                                          return item.price_level >= filters.minimumPrice && item.price_level <= filters.maximumPrice;
                                      } else {
                                          return item.rating >= filters.minimumRating && item.rating <= filters.maximumRating &&
                                              item.price_level >= filters.minimumPrice && item.price_level <= filters.maximumPrice;
                                      }
                                  }).sort((a, b) => a.user_ratings_total < b.user_ratings_total) }
                                  renderItem={ ({ index, item }) => <ActivityItem
                                      item={ item }
                                      setSelectedActivity={ setSelectedActivity }
                                      selected={ item.place_id === selectedActivity }
                                      touchable={ true }
                                  /> }
                                  keyExtractor={ (item, index) => index.toString() }
                                  refreshing={ isLoading }
                                  onRefresh={ () => getActivitiesHandler() }
                              />
                          </View> }
                    </Modal.Body>
                    <HStack
                        justifyContent='space-evenly'
                        alignItems='center'
                    >
                        <Button
                            style={ styles.refreshButton }
                            onPress={ () => getActivitiesHandler() }
                            size={ 10 }
                        >
                            { i18n.t('requestNewActivities') }
                        </Button>
                        <Button
                            style={ styles.filterButton }
                            size={ 10 }
                            onPress={ () => setFilterOpen(true) }
                        >
                            <Ionicons
                                name='filter'
                                size={ 20 }
                                color='white'
                            />
                        </Button>
                    </HStack>
                    { dateSelected && <HStack justifyContent='center'>
                        <TouchableOpacity
                            activeOpacity={ 0.65 }
                            onPress={ () => setDateSelected(false) }
                        >
                            <Text style={ styles.chosenDate }>{ i18n.t('chosenDate', {
                                fromDate:
                                    isAllDay ?
                                    moment.utc(selectedStartingDate).format('YYYY.MM.DD') :
                                    moment.utc(selectedStartingDate).format('YYYY.MM.DD HH:mm'),
                                toDate:
                                    isAllDay ?
                                    moment.utc(selectedEndingDate).format('YYYY.MM.DD') :
                                    moment.utc(selectedEndingDate).format('YYYY.MM.DD HH:mm')

                            }) }
                            </Text>
                        </TouchableOpacity>
                    </HStack> }
                    <Modal.Footer>
                        <Divider
                            my={ 1 }
                            thickness={ 2 }
                        />
                        <Button.Group space={ 2 }>
                            <Button
                                variant='ghost'
                                colorScheme='blueGray'
                                onPress={ () => {
                                    setSelectedActivity('');
                                    setDateSelected(false);
                                    setReminder(60);
                                    setTimeType('minute');
                                    props.onCloseHandler();
                                    setModalOpen(false);
                                } }
                            >
                                { i18n.t('cancel') }
                            </Button>
                            <Button
                                onPress={ () => {
                                    if (selectedActivity) {
                                        if (dateSelected) {
                                            const item = activities.find((item) => {
                                                return item.place_id === selectedActivity;
                                            });
                                            dispatch(insertUserActivity({
                                                name: item.name,
                                                isAllDay: isAllDay,
                                                startingDate: selectedStartingDate,
                                                endingDate: selectedEndingDate,
                                                location: {
                                                    city: '',
                                                    formattedAddress: item.vicinity,
                                                    latitude: item.geometry.location.lat,
                                                    longitude: item.geometry.location.lng
                                                },
                                                reminder: reminder,
                                                timeType: timeType,
                                                details: item
                                            }));
                                            setReminder(60);
                                            setTimeType('minute');
                                            setSelectedActivity('');
                                            setDateSelected(false);
                                            props.onCloseHandler();
                                            setModalOpen(false);
                                        } else {
                                            setTimePickerOpen(true);
                                        }
                                    } else {
                                        Alert.alert('Hiba!', 'Válassz egy programot!');
                                    }
                                } }
                            >
                                { i18n.t('addToMyActivities') }
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <FilterModal
                isOpen={ filterOpen }
                setFilterOpen={ setFilterOpen }
                filters={ filters }
                setFilters={ setFilters }
            />
            <DateTimePickerModal
                isOpen={ timePickerOpen }
                setTimePickerOpen={ setTimePickerOpen }
                selectedStartingDate={ selectedStartingDate }
                setSelectedStartingDate={ setSelectedStartingDate }
                selectedEndingDate={ selectedEndingDate }
                setSelectedEndingDate={ setSelectedEndingDate }
                setDateSelected={ setDateSelected }
                isAllDay={ isAllDay }
                setIsAllDay={ setIsAllDay }
                reminder={ reminder }
                setReminder={ setReminder }
                timeType={ timeType }
                setTimeType={ setTimeType }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    refreshButton: {
        width: '80%',
        borderRadius: 10,
        marginLeft: 4
    },
    filterButton: {
        marginRight: 4,
        borderRadius: 10
    },
    loadingSpinner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    chosenDate: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#06b6d4',
        color: '#FFF',
        marginVertical: 2,
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default ActivityAdvisorModal;