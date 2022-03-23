import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import Colors from '../../constants/Colors';

const Title = props => {
    return (
        <View style={ { ...styles.titleContainer, ...props.style } }>
            <Card style={ { ...styles.titleCard, ...props.cardStyle } }>
                <Text
                    style={ { ...styles.title, ...props.titleStyle } }
                >{ props.content }</Text>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: '10%'
    },
    titleCard: {
        backgroundColor: Colors.darkPurple,
        width: '90%',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: '#FFF',
        padding: 5
    },
});

export default Title;