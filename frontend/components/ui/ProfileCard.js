import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const ProfileCard = props => {
    const { name, age, description } = props;

    return (
        <View style={ styles.card }>
            <Ionicons
                name='person-circle-outline'
                size={ 80 }
                color='#FFF'
            />
            <Text style={ styles.text }>{ name }</Text>
            <Text style={ styles.text }>Kor: { age } év</Text>
            <Text style={ styles.text }>{ 'Leírás:\n' + description }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.irisPurple,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        paddingVertical: 6,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    text: {
        color: '#FFF',
        fontFamily: 'open-sans',
        fontSize: 16,
        paddingVertical: 2,
        textAlign: 'center'
    }
});

export default ProfileCard;