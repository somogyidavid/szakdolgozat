import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import {
    Button,
    Divider,
    FlatList,
    HStack,
    Modal,
    View,
} from 'native-base';
import i18n from 'i18n-js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../../services/ActivitiesService';
import { Ionicons } from '@expo/vector-icons';
import ActivityItem from './ActivityItem';

const ActivityAdvisorModal = props => {
    const dispatch = useDispatch();
    const location = useSelector(state => state.location.location);
    const isLoading = useSelector(state => state.activities.isLoading);
    const activities = useSelector(state => state.activities.activities);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState('');

    const getActivitiesHandler = async () => {
        const options = {
            location: {
                latitude: location.lat,
                longitude: location.lng
            },
            types: 'restaurant',
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
                    Válassz az alábbi programajánlatok közül!
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
                                  return item.rating || item.price_level || item.photos;
                              }) }
                              renderItem={ ({ index, item }) => <ActivityItem
                                  item={ item }
                                  setSelectedActivity={ setSelectedActivity }
                                  selected={ item.place_id === selectedActivity }
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
                        Új programokat kérek
                    </Button>
                    <Button
                        style={ styles.filterButton }
                        size={ 10 }
                    >
                        <Ionicons
                            name='filter'
                            size={ 20 }
                            color='white'
                        />
                    </Button>
                </HStack>
                <Modal.Footer>
                    <Divider
                        my={ 3 }
                        thickness={ 2 }
                    />
                    <Button.Group space={ 2 }>
                        <Button
                            variant='ghost'
                            colorScheme='blueGray'
                            onPress={ () => {
                                setSelectedActivity('');
                                props.onCloseHandler();
                                setModalOpen(false);
                            } }
                        >
                            { i18n.t('cancel') }
                        </Button>
                        <Button
                            onPress={ () => console.log('pressed') }
                        >
                            Hozzáadás a programjaimhoz
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({
    label: {
        textAlign: 'center',
        backgroundColor: '#6366f1',
        color: '#FFF',
        borderRadius: 10,
        padding: 6,
        overflow: 'hidden'
    },
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
    }
});

export default ActivityAdvisorModal;