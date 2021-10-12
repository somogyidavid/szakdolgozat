import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import Card from './Card';
import { weatherHandler } from '../helpers/weatherHandler';
import i18n from 'i18n-js';
import * as Location from 'expo-location';
import { fetchLocation } from '../services/LocationService';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import CustomModal from './CustomModal';
import Title from './Title';

const WeatherCard = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.location.isLoading);
    const address = useSelector(state => state.location.address);
    const weather = useSelector(state => state.location.weather);
    const currentTime = new Date().getTime();

    const verifyPermissions = async () => {
        const hasPermissions = await Location.getForegroundPermissionsAsync();

        if (hasPermissions.status !== 'granted') {
            const result = await Location.requestForegroundPermissionsAsync();

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

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', getLocationHandler);
        return () => {
            unsubscribe();
        };
    }, [getLocationHandler]);

    const iconHandler = () => {
        if (weather.current.weather[0].main === 'Clear') {
            if (currentTime > weather.current.sunset * 1000) {
                return (
                    <Ionicons
                        name={ Platform.OS === 'android' ? 'md-moon-outline' : 'ios-moon-outline' }
                        size={ 40 }
                        color='white'
                        style={ { ...styles.icon, padding: 20 } }
                    />
                );
            } else if (currentTime > weather.current.sunrise * 1000) {
                return (
                    <Ionicons
                        name={ Platform.OS === 'android' ? 'md-sunny-outline' : 'ios-sunny-outline' }
                        size={ 40 }
                        color='white'
                        style={ { ...styles.icon, padding: 20 } }
                    />
                );
            }
        } else {
            return (
                <Image
                    source={ { uri: `http://openweathermap.org/img/wn/${ weather.current.weather[0].icon }@2x.png` } }
                    style={ styles.icon }
                />
            );
        }
    };

    return (
        <View style={ styles.container }>
            <CustomModal
                visible={ modalVisible }
                closeModal={ () => setModalVisible(false) }
                weather={ weather }
                address={ address }
                iconHandler={ iconHandler }
            />
            <ScrollView
                contentContainerStyle={ styles.weatherContainer }
                refreshControl={ <RefreshControl
                    refreshing={ isLoading }
                    onRefresh={ getLocationHandler }
                /> }
            >
                <Title content={ address.city } />
                <Card
                    style={ styles.weatherCard }
                    touchable
                >
                    <View style={ styles.currentWeather }>
                        { iconHandler() }
                        <Text style={ styles.weatherDetail }>{ weatherHandler(weather.current.weather[0].id) }</Text>
                    </View>
                    <View style={ styles.currentTemperature }>
                        <Text style={ styles.temperature }>{ weather.current.temp.toFixed(0) }{ String.fromCharCode(8451) }</Text>
                        <Text style={ styles.feelsLike }>
                            { i18n.t('feelsLike') } { weather.current.feels_like.toFixed(0) }{ String.fromCharCode(8451) }
                        </Text>
                    </View>
                </Card>
                <View style={ styles.buttonContainer }>
                    <Button
                        title={ i18n.t('details') }
                        onPress={ () => setModalVisible(true) }
                        icon
                        iconName={ Platform.OS === 'android' ? 'md-arrow-down-circle-outline' : 'ios-arrow-down-circle-outline' }
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark,
        borderRadius: 30,
        margin: 10
    },
    weatherCard: {
        backgroundColor: 'lightblue',
        marginHorizontal: '3%',
        marginVertical: 20,
        flexDirection: 'row',
    },
    weatherContainer: {
        width: '100%'
    },
    currentWeather: {
        width: '50%',
        alignItems: 'flex-start',
    },
    weatherDetail: {
        marginBottom: 10,
        marginLeft: 16,
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    currentTemperature: {
        width: '50%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginRight: 10
    },
    temperature: {
        fontFamily: 'open-sans-bold',
        fontSize: 50,
        color: 'white',
        backgroundColor: 'rgba(52, 52, 52, 0.25)',
        marginRight: 20,
        marginTop: 10,
        borderRadius: 20,
        paddingHorizontal: 5
    },
    feelsLike: {
        marginBottom: 10,
        marginRight: 30,
        fontFamily: 'open-sans',
        fontSize: 15,
        color: 'white'
    },
    icon: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(52, 52, 52, 0.25)',
        borderRadius: 20,
        margin: 10
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    }
});

export default WeatherCard;