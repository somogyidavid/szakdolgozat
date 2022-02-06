import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList, HStack, Image, Text, View, VStack } from 'native-base';
import { AirbnbRating, Rating } from 'react-native-ratings';
import ENV from '../../constants/env';
import Label from './Label';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const ActivityItem = props => {
    const { item, setSelectedActivity, selected, touchable } = props;

    const TouchableComponent = touchable ? TouchableOpacity : View;

    return (
        <TouchableComponent
            style={ selected ?
                {
                    ...styles.container,
                    backgroundColor: '#a5b4fc',
                    height: item.name.length > 30 ? 275 : 250,
                    borderColor: '#000'
                } :
                { ...styles.container, height: item.name.length > 30 ? 275 : 250 } }
            activeOpacity={ 0.65 }
            onPress={ () => setSelectedActivity(item.place_id) }
        >
            <VStack>
                <HStack justifyContent='flex-start'>
                    <Text
                        style={ selected ? {
                            ...styles.title,
                            backgroundColor: '#6366f1',
                            color: 'white'
                        } : styles.title }
                    >{ item.name }</Text>
                </HStack>
                <HStack
                    justifyContent='flex-start'
                    alignItems='center'
                >
                    { item.rating && <AirbnbRating
                        starContainerStyle={ selected ? {
                            ...styles.rating,
                            backgroundColor: '#6366f1'
                        } : styles.rating }
                        selectedColor='#fbbf24'
                        unSelectedColor={ selected ? '#e5e5e5' : '#a3a3a3' }
                        defaultRating={ Math.ceil(item.rating / 0.5) * 0.5 }
                        count={ 5 }
                        size={ 16 }
                        showRating={ false }
                        isDisabled={ true }
                    /> }
                    { item.price_level && <AirbnbRating
                        starContainerStyle={ selected ? {
                            ...styles.rating,
                            backgroundColor: '#6366f1'
                        } : styles.rating }
                        selectedColor={ selected ? '#4ade80' : '#16a34a' }
                        unSelectedColor={ selected ? '#e5e5e5' : '#a3a3a3' }
                        defaultRating={ Math.ceil(item.price_level / 0.5) * 0.5 }
                        count={ 5 }
                        size={ 16 }
                        showRating={ false }
                        isDisabled={ true }
                        starImage={ require('../../assets/images/money.png') }
                    /> }
                    { item.opening_hours && <HStack
                        alignItems='center'
                        style={ selected ? {
                            ...styles.opening,
                            backgroundColor: '#6366f1'
                        } : styles.opening }
                        space={ 1 }
                    >
                        <Text style={ selected ? { color: '#FFF' } : { color: '#000' } }>
                            { item.opening_hours.open_now ? 'Nyitva' : 'Zárva' }
                        </Text>
                        <FontAwesome5
                            name={ item.opening_hours.open_now ? 'door-open' : 'door-closed' }
                            color={ selected ? '#FFF' : '#000' }
                        />
                    </HStack> }
                </HStack>
                <HStack
                    space={ 2 }
                    alignItems='center'
                >
                    { item.user_ratings_total && <HStack
                        style={ selected ? {
                            ...styles.userRatings,
                            backgroundColor: '#6366f1'
                        } : styles.userRatings }
                    >
                        <MaterialIcons
                            name='rate-review'
                            size={ 24 }
                            color={ selected ? '#FFF' : '#000' }
                        />
                        <Text style={ selected ? { color: '#FFF' } : { color: '#000' } }>
                            { item.user_ratings_total }
                        </Text>
                    </HStack> }
                    <Text style={ styles.address }>
                        { item.vicinity.includes('(') ?
                          item.vicinity.substring(0, item.vicinity.indexOf('(')) : item.vicinity }
                    </Text>
                </HStack>
                <HStack>
                    { item.photos ?
                      <Image
                          source={ { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ item.photos[0].photo_reference }&key=${ ENV().googleApiKey }` } }
                          alt='Image'
                          width={ 120 }
                          height={ 120 }
                          borderWidth={ 1 }
                          borderColor={ '#000' }
                          borderRadius={ 10 }
                          overflow='hidden'
                          style={ { marginTop: 4 } }
                      /> :
                      <Entypo
                          name='image'
                          size={ 120 }
                          color='black'
                          style={ styles.icon }
                      />
                    }
                    <FlatList
                        data={ item.types.slice(0, 4) }
                        renderItem={ ({ index, item }) => <Label
                            text={ item }
                            color={ 'hsl(' + Math.floor(Math.random() * 361) + ',50%,75%)' }
                        /> }
                        keyExtractor={ (item, index) => index.toString() }
                    />
                </HStack>
            </VStack>
        </TouchableComponent>
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
        marginRight: 6,
        borderRadius: 10
    },
    address: {
        fontFamily: 'open-sans',
        fontSize: 12
    },
    opening: {
        backgroundColor: '#d4d4d4',
        paddingVertical: 1,
        paddingHorizontal: 6,
        marginVertical: 6,
        borderRadius: 10
    },
    userRatings: {
        backgroundColor: '#d4d4d4',
        padding: 2,
        borderRadius: 10
    },
    icon: {
        backgroundColor: '#d4d4d4',
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        padding: 4,
        borderRadius: 10
    }
});

export default ActivityItem;