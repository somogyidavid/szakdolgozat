import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Modal, Text, View, VStack } from 'native-base';
import i18n from 'i18n-js';
import { AirbnbRating } from 'react-native-ratings';

const FilterModal = props => {
    const { isOpen, setFilterOpen, filters, setFilters } = props;

    const [minimumRating, setMinimumRating] = useState(filters.minimumRating);
    const [maximumRating, setMaximumRating] = useState(filters.maximumRating);
    const [minimumPrice, setMinimumPrice] = useState(filters.minimumPrice);
    const [maximumPrice, setMaximumPrice] = useState(filters.maximumPrice);

    useEffect(() => {
        if (minimumRating > maximumRating) {
            setMaximumRating(minimumRating);
        }
    }, [minimumRating, maximumRating]);

    useEffect(() => {
        if (minimumPrice > maximumPrice) {
            setMaximumPrice(minimumPrice);
        }
    }, [minimumPrice, maximumPrice]);

    return (
        <Modal isOpen={ isOpen }>
            <Modal.Content
                maxWidth={ 400 }
                width={ Dimensions.get('window').width - 60 }
                height={ Dimensions.get('window').height * 0.65 }
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
                    { i18n.t('filter') }
                </Modal.Header>
                <Modal.Body>
                    <VStack>
                        <View style={ styles.card }>
                            <Text style={ styles.label }>{ i18n.t('minRating') }</Text>
                            <AirbnbRating
                                defaultRating={ minimumRating }
                                size={ 30 }
                                showRating={ false }
                                starContainerStyle={ styles.rating }
                                selectedColor='#fbbf24'
                                unSelectedColor='#a3a3a3'
                                onFinishRating={ (rating) => setMinimumRating(rating) }
                            />
                        </View>
                        <View style={ styles.card }>
                            <Text style={ styles.label }>{ i18n.t('maxRating') }</Text>
                            <AirbnbRating
                                defaultRating={ maximumRating }
                                size={ 30 }
                                showRating={ false }
                                starContainerStyle={ styles.rating }
                                selectedColor='#fbbf24'
                                unSelectedColor='#a3a3a3'
                                onFinishRating={ (rating) => setMaximumRating(rating) }
                            />
                        </View>
                        <View style={ styles.card }>
                            <Text style={ styles.label }>{ i18n.t('minPrice') }</Text>
                            <AirbnbRating
                                defaultRating={ minimumPrice }
                                size={ 30 }
                                showRating={ false }
                                starContainerStyle={ styles.rating }
                                selectedColor='#16a34a'
                                unSelectedColor='#a3a3a3'
                                onFinishRating={ (rating) => setMinimumPrice(rating) }
                                starImage={ require('../../assets/images/money.png') }
                            />
                        </View>
                        <View style={ styles.card }>
                            <Text style={ styles.label }>{ i18n.t('maxPrice') }</Text>
                            <AirbnbRating
                                defaultRating={ maximumPrice }
                                size={ 30 }
                                showRating={ false }
                                starContainerStyle={ styles.rating }
                                selectedColor='#16a34a'
                                unSelectedColor='#a3a3a3'
                                onFinishRating={ (rating) => setMaximumPrice(rating) }
                                starImage={ require('../../assets/images/money.png') }
                            />
                        </View>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={ 2 }>
                        <Button
                            variant='ghost'
                            colorScheme='blueGray'
                            onPress={ () => setFilterOpen(false) }
                        >
                            { i18n.t('cancel') }
                        </Button>
                        <Button
                            onPress={ () => {
                                setFilters({
                                    minimumRating,
                                    maximumRating,
                                    minimumPrice,
                                    maximumPrice
                                });
                                setFilterOpen(false);
                            } }
                        >
                            { i18n.t('save') }
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
        overflow: 'hidden',
        width: '60%'
    },
    card: {
        backgroundColor: 'lightgrey',
        padding: 8,
        borderRadius: 10,
        marginVertical: 4
    },
    rating: {
        paddingVertical: 4,
    }
});

export default FilterModal;