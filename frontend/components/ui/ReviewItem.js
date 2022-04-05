import React from 'react';
import { StyleSheet } from 'react-native';
import { HStack, Text, View } from 'native-base';
import moment from 'moment';

const ReviewItem = props => {
    const { item } = props;

    return (
        <View style={ styles.card }>
            <HStack space={ 3 }>
                <Text style={ styles.author }>{ item.author_name }</Text>
                <Text>{ moment(item.time * 1000).format('YYYY.MM.DD') }</Text>
            </HStack>
            <Text style={ styles.description }>{ item.text }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 6,
        marginVertical: 4
    },
    author: {
        fontFamily: 'open-sans-bold'
    },
    description: {}
});

export default ReviewItem;