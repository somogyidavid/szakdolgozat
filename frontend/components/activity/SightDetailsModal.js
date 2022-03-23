import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Divider, FlatList, HStack, Image, Modal, PresenceTransition, Text, View, VStack } from 'native-base';
import { SliderBox } from 'react-native-image-slider-box';
import i18n from 'i18n-js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaceDetails } from '../../services/PlaceDetailsService';
import ENV from '../../constants/env';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import ReviewItem from '../ui/ReviewItem';
import DateTimePickerModal from './DateTimePickerModal';
import { insertUserActivity } from '../../services/UserActivitiesService';
import moment from 'moment';

const SightDetailsModal = props => {
    const { isOpen, setIsOpen, selectedSight, setSelectedSight } = props;
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.placeDetails.isLoading);
    const placeDetails = useSelector(state => state.placeDetails.placeDetails);
    const [images, setImages] = useState([]);
    const [addressOpen, setAddressOpen] = useState(false);
    const [openingsOpen, setOpeningOpen] = useState(false);
    const [phoneOpen, setPhoneOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const [startingDate, setStartingDate] = useState(new Date());
    const [endingDate, setEndingDate] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(false);
    const [isAllDay, setIsAllDay] = useState(true);
    const [reminder, setReminder] = useState(60);
    const [timeType, setTimeType] = useState('minute');

    useEffect(() => {
        const getPlaceDetails = async () => {
            dispatch(fetchPlaceDetails(selectedSight.place_id));
        };

        if (isOpen && selectedSight) {
            getPlaceDetails();
        }
    }, [isOpen]);

    useEffect(() => {
        if (placeDetails.photos) {
            let photos = [];
            placeDetails.photos.forEach((item) => photos.push(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ item.photo_reference }&key=${ ENV().googleApiKey }`));
            setImages(photos);
        }
    }, [placeDetails]);

    return (
        <View>
            <Modal
                isOpen={ isOpen && selectedSight }
            >
                <Modal.Content
                    maxWidth='400px'
                    width={ Dimensions.get('window').width - 40 }
                    height={ Dimensions.get('window').height * 0.9 }
                >
                    <Modal.Header
                        _text={ {
                            textAlign: 'center',
                            bg: 'fuchsia.800',
                            color: '#FFF',
                            borderRadius: 10,
                            padding: 2,
                            overflow: 'hidden',
                            fontFamily: 'open-sans-bold'
                        } }
                    >
                        { placeDetails.name }
                    </Modal.Header>
                    <Modal.Body>
                        { isLoading ?
                          <View style={ styles.loadingSpinner }>
                              <ActivityIndicator
                                  size='large'
                                  color='#86198f'
                              />
                          </View> :
                          <VStack space={ 2 }>
                              <View style={ styles.sliderContainer }>
                                  <SliderBox
                                      images={ images }
                                      dotColor='#FFEE58'
                                      circleLoop={ true }
                                      firstItem={ 0 }
                                      parentWidth={ Dimensions.get('window').width * 0.85 }
                                      dotStyle={ {
                                          width: 12,
                                          height: 12,
                                          borderRadius: 10
                                      } }
                                      ImageComponentStyle={ {
                                          borderRadius: 10,
                                          overflow: 'hidden'
                                      } }
                                  />
                              </View>
                              <Divider
                                  thickness={ 2 }
                              />
                              <HStack
                                  style={ styles.buttonContainer }
                                  space={ 2 }
                              >
                                  { placeDetails.icon &&
                                      <TouchableOpacity
                                          style={ styles.inactiveButton }
                                          activeOpacity={ 0.6 }
                                      >
                                          <Image
                                              style={ styles.button }
                                              source={ { uri: placeDetails.icon } }
                                              width={ 10 }
                                              height={ 10 }
                                              alt='Icon'
                                          />
                                      </TouchableOpacity> }
                                  { placeDetails.formatted_address &&
                                      <Button
                                          variant='solid'
                                          style={ addressOpen ? styles.activeButton : styles.inactiveButton }
                                          _pressed={ {
                                              style: {
                                                  backgroundColor: '#a3a3a3',
                                                  borderRadius: 10,
                                                  overflow: 'hidden'
                                              }
                                          } }
                                          onPress={ () => setAddressOpen(!addressOpen) }
                                      >
                                          <MaterialIcons
                                              name='place'
                                              size={ 20 }
                                              color='black'
                                          />
                                      </Button> }
                                  { placeDetails.opening_hours &&
                                      <Button
                                          variant='solid'
                                          style={ openingsOpen ? styles.activeButton : styles.inactiveButton }
                                          _pressed={ {
                                              style: {
                                                  backgroundColor: '#a3a3a3',
                                                  borderRadius: 10,
                                                  overflow: 'hidden'
                                              }
                                          } }
                                          onPress={ () => setOpeningOpen(!openingsOpen) }
                                      >
                                          <Entypo
                                              name='calendar'
                                              size={ 20 }
                                              color='black'
                                          />
                                      </Button> }
                                  { placeDetails.formatted_phone_number &&
                                      <Button
                                          variant='solid'
                                          style={ phoneOpen ? styles.activeButton : styles.inactiveButton }
                                          _pressed={ {
                                              style: {
                                                  backgroundColor: '#a3a3a3',
                                                  borderRadius: 10,
                                                  overflow: 'hidden'
                                              }
                                          } }
                                          onPress={ () => setPhoneOpen(!phoneOpen) }
                                      >
                                          <Entypo
                                              name='phone'
                                              size={ 20 }
                                              color='black'
                                          />
                                      </Button> }
                              </HStack>
                              <PresenceTransition
                                  visible={ addressOpen }
                                  initial={ {
                                      opacity: 0,
                                      scale: 0
                                  } }
                                  animate={ {
                                      opacity: 1,
                                      scale: 1,
                                      transition: {
                                          duration: 250
                                      }
                                  } }
                              >
                                  <View style={ styles.card }>
                                      <Text style={ styles.cardText }>{ placeDetails.formatted_address }</Text>
                                  </View>
                              </PresenceTransition>
                              <PresenceTransition
                                  visible={ openingsOpen }
                                  initial={ {
                                      opacity: 0,
                                      scale: 0
                                  } }
                                  animate={ {
                                      opacity: 1,
                                      scale: 1,
                                      transition: {
                                          duration: 250
                                      }
                                  } }
                              >
                                  { placeDetails.opening_hours &&
                                      <FlatList
                                          scrollEnabled={ false }
                                          contentContainerStyle={ styles.card }
                                          data={ placeDetails.opening_hours.weekday_text }
                                          keyExtractor={ (item, index) => index.toString() }
                                          renderItem={ (item) =>
                                              <Text style={ styles.cardText }>{ item.item }</Text> }
                                      /> }
                              </PresenceTransition>
                              <PresenceTransition
                                  visible={ phoneOpen }
                                  initial={ {
                                      opacity: 0,
                                      scale: 0
                                  } }
                                  animate={ {
                                      opacity: 1,
                                      scale: 1,
                                      transition: {
                                          duration: 250
                                      }
                                  } }
                              >
                                  <View style={ styles.card }>
                                      <Text style={ styles.cardText }>Telefon: { placeDetails.formatted_phone_number }</Text>
                                  </View>
                              </PresenceTransition>
                              <PresenceTransition
                                  visible={ dateSelected }
                                  initial={ { opacity: 0, scale: 0 } }
                                  animate={ { opacity: 1, scale: 1, transition: { duration: 250 } } }
                              >
                                  <HStack justifyContent='center'>
                                      <TouchableOpacity
                                          activeOpacity={ 0.65 }
                                          onPress={ () => setDateSelected(false) }
                                      >
                                          <Text style={ styles.chosenDate }>{ i18n.t('chosenDate', {
                                              fromDate:
                                                  isAllDay ?
                                                  moment.utc(startingDate).format('YYYY.MM.DD') :
                                                  moment.utc(startingDate).format('YYYY.MM.DD HH:mm'),
                                              toDate:
                                                  isAllDay ?
                                                  moment.utc(endingDate).format('YYYY.MM.DD') :
                                                  moment.utc(endingDate).format('YYYY.MM.DD HH:mm')

                                          }) }
                                          </Text>
                                      </TouchableOpacity>
                                  </HStack>
                              </PresenceTransition>
                              <Divider
                                  thickness={ 2 }
                              />
                              { placeDetails.reviews &&
                                  <VStack>
                                      <HStack
                                          style={ styles.reviewTitleContainer }
                                          space={ 1 }
                                      >
                                          <Text style={ styles.reviewTitle }>Értékelések</Text>
                                          <Entypo
                                              name='star'
                                              size={ 24 }
                                              color='#eab308'
                                          />
                                      </HStack>
                                      <FlatList
                                          data={ placeDetails.reviews }
                                          renderItem={ (item) => <ReviewItem item={ item.item } /> }
                                          keyExtractor={ (item, index) => index.toString() }
                                      />
                                  </VStack> }
                          </VStack> }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={ 2 }>
                            <Button
                                variant='ghost'
                                colorScheme='blueGray'
                                onPress={ () => {
                                    setSelectedSight();
                                    setDateSelected(false);
                                    setReminder(60);
                                    setTimeType('minute');
                                    setIsOpen(false);
                                } }
                            >
                                { i18n.t('back') }
                            </Button>
                            <Button
                                variant='solid'
                                colorScheme='secondary'
                                bg='fuchsia.800'
                                _pressed={ { backgroundColor: 'fuchsia.600' } }
                                onPress={ () => {
                                    if (dateSelected) {
                                        dispatch(insertUserActivity({
                                            name: placeDetails.name,
                                            isAllDay: isAllDay,
                                            startingDate: startingDate,
                                            endingDate: endingDate,
                                            location: {
                                                city: '',
                                                formattedAddress: placeDetails.vicinity,
                                                latitude: placeDetails.geometry.location.lat,
                                                longitude: placeDetails.geometry.location.lng
                                            },
                                            reminder: reminder,
                                            timeType: timeType,
                                            details: placeDetails
                                        }));
                                        setReminder(60);
                                        setTimeType('minute');
                                        setDateSelected(false);
                                        setSelectedSight();
                                        setIsOpen(false);

                                    } else {
                                        setTimePickerOpen(true);
                                    }
                                } }
                            >
                                { i18n.t('addToMyActivities') }
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <DateTimePickerModal
                isOpen={ timePickerOpen }
                setTimePickerOpen={ setTimePickerOpen }
                selectedStartingDate={ startingDate }
                setSelectedStartingDate={ setStartingDate }
                selectedEndingDate={ endingDate }
                setSelectedEndingDate={ setEndingDate }
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
    loadingSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderContainer: {
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 2
    },
    inactiveButton: {
        backgroundColor: '#e5e5e5',
        padding: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    activeButton: {
        backgroundColor: '#a3a3a3',
        padding: 4,
        borderRadius: 10,
        overflow: 'hidden'
    },
    card: {
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    cardText: {
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
        textTransform: 'capitalize'
    },
    reviewTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        textAlign: 'left'
    },
    reviewTitleContainer: {
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 4,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chosenDate: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#86198f',
        color: '#FFF',
        marginVertical: 2,
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default SightDetailsModal;