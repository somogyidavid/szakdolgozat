import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import i18n from 'i18n-js';
import { fetchLocation } from '../../services/LocationService';
import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LocationAccuracy } from 'expo-location';

const OverviewScreen = props => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.location.isLoading);
    const address = useSelector(state => state.location.address);
    const location = useSelector(state => state.location.location);
    const weather = useSelector(state => state.location.weather);


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

        const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: LocationAccuracy.Lowest
        });

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
    }, []);

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
            <View style={ styles.titleContainer }>
                <Card style={ styles.titleCard }>
                    <Text style={ styles.title }>{ address.city }</Text>
                </Card>
            </View>
            <ScrollView contentContainerStyle={ styles.weatherContainer }>
                <Card style={ styles.weatherCard }>
                    <View style={ styles.currentWeather }>
                        <Ionicons
                            name={ Platform.OS === 'android' ? 'md-partly-sunny-outline' : 'ios-partly-sunny-outline' }
                            size={ 60 }
                            style={ styles.icon }
                        />
                        <Text style={ styles.weatherDetail }>Partly sunny</Text>
                    </View>
                    <View style={ styles.currentTemperature }>
                        <Text style={ styles.temperature }>{ weather.current.temp.toFixed(0) }{ String.fromCharCode(8451) }</Text>
                        <Text style={ styles.feelsLike }>
                            { i18n.t('feelsLike') } { weather.current.temp.toFixed(0) }{ String.fromCharCode(8451) }
                        </Text>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
        color: Colors.light,
        padding: 5
    },
    weatherContainer: {
        width: '100%',
    },
    weatherCard: {
        backgroundColor: 'lightblue',
        marginHorizontal: '5%',
        marginVertical: 20,
        flexDirection: 'row'
    },
    currentWeather: {
        width: '50%',
        alignItems: 'flex-start',
        paddingLeft: 15
    },
    weatherDetail: {
        marginBottom: 10,
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        color: Colors.dark
    },
    currentTemperature: {
        width: '50%',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    temperature: {
        fontFamily: 'open-sans-bold',
        fontSize: 50,
        color: Colors.dark,
        marginRight: 20,
        marginTop: 10
    },
    feelsLike: {
        marginBottom: 10,
        marginRight: 15,
        fontFamily: 'open-sans',
        fontSize: 15
    },
    icon: {
        marginVertical: 10,
        marginLeft: 5,
        color: Colors.dark
    },
    loadingSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OverviewScreen;
