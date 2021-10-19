import React from 'react';
import { View, Text, StyleSheet, Modal, Platform, Image, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import Button from './Button';
import i18n from 'i18n-js';
import { useSelector } from 'react-redux';
import Title from './Title';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';

const WeeklyWeatherModal = props => {
    const { weather } = props;
    const address = useSelector(state => state.location.address);

    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const date = new Date(weather.dt * 1000);
    const day = i18n.t(weekDays[date.getDay()]);

    return (
        <Modal
            animationType={ Platform.OS === 'android' ? 'slide' : 'fade' }
            transparent={ true }
            visible={ props.visible }
            statusBarTranslucent={ false }
        >
            <View style={ styles.modalContainer }>
                <View style={ styles.modalContent }>
                    <Title
                        content={ address.city }
                        titleStyle={ styles.title }
                    />
                    <ScrollView contentContainerStyle={ styles.modalContent }>
                        <View style={ styles.headerContainer }>
                            <View>
                                <Image
                                    source={ { uri: `http://openweathermap.org/img/wn/${ weather.weather[0].icon }@2x.png` } }
                                    style={ styles.icon }
                                />
                            </View>
                            <View style={ styles.today }>
                                <Text style={ styles.currentDay }>{ day }</Text>
                                <Text style={ styles.smallText }>{ date.toISOString().slice(0, 10).replace(/-/g, '.') }</Text>
                            </View>
                        </View>
                        <View>
                            <View style={ styles.headerContainer }>
                                <Text style={ styles.temperature }>{ weather.temp.day.toFixed(0) }</Text>
                                <Text style={ styles.superscript }>{ String.fromCharCode(8451) }</Text>
                            </View>
                        </View>
                        <View style={ styles.row }>
                            <Text style={ styles.smallText }>{ i18n.t('sunrise') + ' ' }
                                { new Date(weather.sunrise * 1000).toLocaleTimeString(navigator.language, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).substring(0, 5) }
                            </Text>
                            <Feather
                                name='sun'
                                size={ 30 }
                                color='white'
                                style={ { paddingHorizontal: 10 } }
                            />
                            <Text style={ styles.smallText }>{ i18n.t('sunset') + ' ' }
                                { new Date(weather.sunset * 1000).toLocaleTimeString(navigator.language, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).substring(0, 5) }
                            </Text>
                        </View>
                        <View
                            style={ styles.moonIcon }
                        >
                            <MaterialCommunityIcon
                                name='moon-waning-gibbous'
                                color='white'
                                size={ 50 }
                                direction={ 1 }
                            />
                        </View>
                        <View style={ styles.row }>
                            <Text style={ styles.smallText }>{ i18n.t('moonrise') + ' ' }
                                { new Date(weather.moonrise * 1000).toLocaleTimeString(navigator.language, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).substring(0, 5) }
                            </Text>
                            <Feather
                                name='moon'
                                size={ 30 }
                                color='white'
                                style={ { paddingHorizontal: 10 } }
                            />
                            <Text style={ styles.smallText }>{ i18n.t('moonset') + ' ' }
                                { new Date(weather.moonset * 1000).toLocaleTimeString(navigator.language, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).substring(0, 5) }
                            </Text>
                        </View>
                    </ScrollView>
                    <Button
                        title={ i18n.t('back') }
                        style={ styles.closeButton }
                        onPress={ props.closeModal }
                        icon
                        iconName={ Platform.OS === 'android' ? 'md-arrow-back-circle-outline' : 'ios-arrow-back-circle-outline' }
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalContent: {
        width: '95%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.dark,
        borderRadius: 40,
        padding: 10,
        overflow: 'hidden'
    },
    title: {
        paddingHorizontal: 10
    },
    titleContainer: {
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
        alignItems: 'center'
    },
    flatListContainer: {
        margin: 10,
        backgroundColor: Colors.dark
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    today: {
        justifyContent: 'center',
    },
    titleStyle: {
        color: 'white',
        fontSize: 18,
        paddingHorizontal: 10
    },
    temperature: {
        color: 'white',
        fontSize: 80,
        fontFamily: 'open-sans-bold'
    },
    superscript: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'open-sans-bold'
    },
    currentDay: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'open-sans'
    },
    smallText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'open-sans',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Colors.lightPurple,
        width: '40%',
        height: 120,
        margin: 10
    },
    cardText: {
        color: 'white',
        paddingHorizontal: '5%'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeButton: {
        marginVertical: 5,
        height: 45
    },
    icon: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(52, 52, 52, 0.25)',
        borderRadius: 20,
        margin: 10
    },
    moonIcon: {
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        borderRadius: 10,
        padding: 5
    }
});

export default WeeklyWeatherModal;