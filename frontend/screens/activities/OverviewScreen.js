import React, { useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import i18n from 'i18n-js';
import { fetchLocation } from '../../services/LocationService';
import AppLoading from 'expo-app-loading';

const OverviewScreen = props => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.location.isLoading);
    const address = useSelector(state => state.location.address);

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

        const currentLocation = await Location.getLastKnownPositionAsync();
        dispatch(fetchLocation({
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude
        }));
    };

    const addressHandler = () => {
        console.log(address);
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
            <Button
                title='Press me'
                onPress={ addressHandler }
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default OverviewScreen;
