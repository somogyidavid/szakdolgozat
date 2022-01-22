import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { HStack, Image, Text, View, VStack } from 'native-base';
import { AirbnbRating, Rating } from 'react-native-ratings';
import ENV from '../../constants/env';

const ActivityItem = props => {
    const { item } = props;

    return (
        <TouchableOpacity
            style={ styles.container }
            activeOpacity={ 0.65 }
        >
            <VStack>
                <HStack justifyContent='flex-start'>
                    <Text style={ styles.title }>{ item.name }</Text>
                </HStack>
                <HStack justifyContent='flex-start'>
                    { item.rating && <AirbnbRating
                        starContainerStyle={ styles.rating }
                        selectedColor='#fbbf24'
                        unSelectedColor='#a3a3a3'
                        defaultRating={ Math.ceil(item.rating / 0.5) * 0.5 }
                        count={ 5 }
                        size={ 16 }
                        showRating={ false }
                        isDisabled={ true }
                    /> }
                    { item.price_level && <AirbnbRating
                        starContainerStyle={ { ...styles.rating, marginLeft: 10 } }
                        selectedColor='#16a34a'
                        unSelectedColor='#a3a3a3'
                        defaultRating={ Math.ceil(item.price_level / 0.5) * 0.5 }
                        count={ 5 }
                        size={ 16 }
                        showRating={ false }
                        isDisabled={ true }
                        starImage={ require('../../assets/images/money.png') }
                    /> }
                </HStack>
                <HStack>
                    <Text>{ item.vicinity }</Text>
                </HStack>
                <HStack>
                    { item.photos ?
                      <Image
                          source={ { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ item.photos[0].photo_reference }&key=${ ENV().googleApiKey }` } }
                          alt='Image'
                          width={ 120 }
                          height={ 120 }
                          borderRadius={ 10 }
                          overflow='hidden'
                          style={ { marginTop: 4 } }
                      /> :
                      <Text>MISSING IMAGE - TODO</Text>
                    }
                </HStack>
            </VStack>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 240,
        width: Dimensions.get('window').width * 0.85,
        marginVertical: 6,
        padding: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor: '#e5e5e5',
        overflow: 'hidden'
    },
    title: {
        backgroundColor: '#d4d4d4',
        padding: 4,
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: 'open-sans-bold'
    },
    rating: {
        backgroundColor: '#d4d4d4',
        marginVertical: 6,
        borderRadius: 10
    }
});

export default ActivityItem;