import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import i18n from 'i18n-js';
import { fetchLocation } from '../../services/LocationService';
import AppLoading from 'expo-app-loading';

const OverviewScreen = props => {
    const isLoading = useSelector(state => state.location.isLoading);

    const verifyPermissions = async () => {
        const hasPermissions = Location.getForegroundPermissionsAsync();

        if (!hasPermissions) {
            const result = Location.requestForegroundPermissionsAsync();

            if (result.status !== 'granted') {
                Alert.alert(i18n.t('error'), i18n.t('locationPermissionDenied'), [{ text: i18n.t('okay') }]);
                return false;
            }
        }

        return true;
    };

    const getLocationHandler = async () => {
        const hasPermissions = verifyPermissions();
        if (!hasPermissions) {
            return;
        }

        const location = await Location.getLastKnownPositionAsync();
        fetchLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', getLocationHandler);

        return () => {
            unsubscribe();
        };
    }, [getLocationHandler]);

    if (isLoading) {
        return <AppLoading />;
    }

    return (
        <View>
            <Text>OverviewScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default OverviewScreen;
