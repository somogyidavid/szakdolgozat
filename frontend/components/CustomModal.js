import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    Platform
} from 'react-native';
import Button from './Button';
import i18n from 'i18n-js';
import Colors from '../constants/Colors';
import Title from './Title';
import { Entypo, Ionicons } from '@expo/vector-icons';

const CustomModal = props => {
    const { weather, address, iconHandler } = props;
    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const currentDay = i18n.t(weekDays[currentDate.getDay()]);

    const sunHandler = () => {
        if (currentTime < weather.current.sunset * 1000) {
            const sunset = new Date(weather.current.sunset * 1000).toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute: '2-digit'
            });
            return (
                <Text style={ styles.smallText }>{ i18n.t('sunset') } { sunset }</Text>
            );
        } else {
            const sunrise = new Date(weather.current.sunrise * 1000).toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute: '2-digit'
            }).substring(0, 5);
            return (
                <Text style={ styles.smallText }>{ i18n.t('sunrise') } { sunrise }</Text>
            );
        }
    };

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
                        content={ i18n.t('weatherForecast') }
                        style={ styles.title }
                        titleStyle={ styles.titleStyle }
                    />
                    <View style={ { flex: 1, flexDirection: 'row' } }>
                        <View style={ { flex: 1, alignItems: 'flex-end' } }>{ iconHandler() }</View>
                        <View style={ { flex: 1, flexDirection: 'column', paddingTop: 10 } }>
                            <Text style={ styles.currentDay }>{ currentDay }</Text>
                            <Text style={ styles.smallText }>{ currentDate.toISOString().slice(0, 10).replace(/-/g, '.') }</Text>
                        </View>
                    </View>
                    <View style={ styles.temperatureContainer }>
                        <Text style={ styles.temperature }>{ weather.current.temp.toFixed(0) }</Text>
                        <Text style={ styles.superscript }>{ String.fromCharCode(8451) }</Text>
                    </View>
                    <View style={ { flex: 1 } }>
                        <Text style={ styles.smallText }>{ address.formattedAddress }</Text>
                    </View>
                    <View style={ { flex: 1, flexDirection: 'row' } }>
                        <Text style={ styles.smallText }>{ i18n.t('feelsLike') + ' ' + weather.current.feels_like.toFixed(0) }{ String.fromCharCode(8451) }</Text>
                        <Entypo
                            name={ 'flow-line' }
                            size={ 23 }
                            color='white'
                            style={ { marginHorizontal: 10 } }
                        />
                        { sunHandler() }
                    </View>
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
    title: {
        marginVertical: 10
    },
    titleStyle: {
        color: 'white',
        fontSize: 18,
        paddingHorizontal: 10
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalContent: {
        width: '90%',
        height: '95%',
        alignItems: 'center',
        backgroundColor: Colors.dark,
        borderRadius: 40,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    closeButton: {
        marginVertical: 20,
        height: 50
    },
    temperatureContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center'
    },
    temperature: {
        color: 'white',
        fontSize: 60,
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
        fontFamily: 'open-sans'
    }
});

export default CustomModal;