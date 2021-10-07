import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    Text,
    ScrollView,
    StyleSheet,
    View, Image,
    RefreshControl
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import i18n from 'i18n-js';
import { fetchLocation } from '../../services/LocationService';
import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import { weatherHandler } from '../../helpers/weatherHandler';
import WeatherCard from '../../components/WeatherCard';

const OverviewScreen = props => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.location.isLoading);

    if (isLoading) {
        return (
            <View style={ styles.loadingSpinner }>
                <ActivityIndicator
                    size='large'
                    color={ Colors.dark }
                />
            </View>
        );
    }

    return (
        <View style={ styles.container }>
            <WeatherCard navigation={ props.navigation } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    loadingSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OverviewScreen;
