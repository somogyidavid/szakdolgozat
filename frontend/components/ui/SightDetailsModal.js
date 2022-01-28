import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Modal, Text, View } from 'native-base';
import { SliderBox } from 'react-native-image-slider-box';
import i18n from 'i18n-js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaceDetails } from '../../services/PlaceDetailsService';
import ENV from '../../constants/env';

const SightDetailsModal = props => {
    const { isOpen, setIsOpen, selectedSight, setSelectedSight } = props;
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.placeDetails.isLoading);
    const placeDetails = useSelector(state => state.placeDetails.placeDetails);
    const [images, setImages] = useState([]);

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
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={ 2 }>
                        <Button
                            variant='ghost'
                            colorScheme='blueGray'
                            onPress={ () => {
                                setSelectedSight();
                                setIsOpen(false);
                            } }
                        >
                            { i18n.t('back') }
                        </Button>
                        <Button
                            onPress={ () => console.log('pressed') }
                        >
                            Gomb
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        alignItems: 'center',
    }
});

export default SightDetailsModal;