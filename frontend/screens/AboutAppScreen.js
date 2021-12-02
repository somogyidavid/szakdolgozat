import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveFirstLaunchToStorage, saveVisibleToStorage } from '../services/AuthService';
import Colors from '../constants/Colors';
import i18n from 'i18n-js';

const slides = [
    {
        key: '1',
        title: i18n.t('tripAdvising'),
        text: i18n.t('tripAdvisingDescription'),
        image: require('../assets/images/travel.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: '2',
        title: i18n.t('countlessOpportunities'),
        text: i18n.t('countlessOpportunitiesDescription'),
        image: { uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/road-trip-771921.png' },
        backgroundColor: '#febe29',
    },
    {
        key: '3',
        title: i18n.t('calendar'),
        text: i18n.t('calendarDescription'),
        image: require('../assets/images/calendar.jpg'),
        backgroundColor: '#22bcb5',
    },
    {
        key: '4',
        title: i18n.t('statistics'),
        text: i18n.t('statisticsDescription'),
        image: require('../assets/images/statistics.jpg'),
        backgroundColor: '#febe29'
    },
    {
        key: '5',
        title: 'To be continued...',
        text: 'To be continued...',
        image: { uri: 'https://png.pngitem.com/pimgs/s/207-2073499_translate-platform-from-english-to-spanish-work-in.png' },
        backgroundColor: '#22bcb5'
    }
];

const AboutAppScreen = props => {
    const renderItem = ({ item }) => {
        return (
            <View style={ { ...styles.itemContainer, backgroundColor: item.backgroundColor } }>
                <Text style={ styles.title }>{ item.title }</Text>
                <Image
                    source={ item.image }
                    style={ styles.image }
                />
                <Text style={ styles.description }>{ item.text }</Text>
            </View>
        );
    };

    return (
        <View style={ styles.container }>
            <AppIntroSlider
                data={ slides }
                renderItem={ renderItem }
                showPrevButton={ true }
                showSkipButton={ true }
                nextLabel={ i18n.t('next') }
                skipLabel={ i18n.t('skip') }
                doneLabel={ i18n.t('done') }
                prevLabel={ i18n.t('back') }
                onDone={ () => {
                    console.log('Done');
                } }
                onSkip={ () => {
                    console.log('Skip');
                } }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue'
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 40
    },
    title: {
        marginTop: 50,
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: 'white'
    },
    description: {
        marginBottom: 100,
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 16,
        textAlign: 'center'
    },
    loadingSpinner: {
        flex: 1,
        backgroundColor: Colors.palePurple,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AboutAppScreen;