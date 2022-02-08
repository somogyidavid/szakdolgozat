import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';

const ProfileCard = props => {
    const { name, age, description, interests } = props;

    return (
        <View style={ styles.card }>
            <Ionicons
                name='person-circle-outline'
                size={ 80 }
                color='#FFF'
            />
            { name !== '' && <Text style={ styles.text }>{ name }</Text> }
            { age > 0 && <Text style={ styles.text }>Kor: { age } év</Text> }
            { description !== '' && <Text style={ styles.text }>{ 'Leírás:\n' + description }</Text> }
            <Text style={ styles.text }>
                { 'Érdeklődési körök:\n' }
                { i18n.t(interests[0]) }, { i18n.t(interests[1]) }, { i18n.t(interests[2]) }, { i18n.t(interests[3]) }, { i18n.t(interests[4]) }
            </Text>
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
        padding: 4,
        marginVertical: 2,
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: Colors.darkPurple
    }
});

export default ProfileCard;