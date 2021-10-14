import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    Platform,
    FlatList, ScrollView
} from 'react-native';
import Button from './Button';
import i18n from 'i18n-js';
import Colors from '../constants/Colors';
import Title from './Title';
import { Entypo } from '@expo/vector-icons';
import WeatherDetailsCard from './WeatherDetailsCard';

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
            }).substring(0, 5);
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
                    <View style={ styles.titleContainer }>
                        <Title
                            content={ i18n.t('weatherForecast') }
                            style={ styles.title }
                            titleStyle={ styles.titleStyle }
                        />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <View style={ styles.headerContainer }>
                            <View>
                                { iconHandler() }
                            </View>
                            <View style={ styles.today }>
                                <Text style={ styles.currentDay }>{ currentDay }</Text>
                                <Text style={ styles.smallText }>{ currentDate.toISOString().slice(0, 10).replace(/-/g, '.') }</Text>
                            </View>
                        </View>
                        <View>
                            <View style={ styles.headerContainer }>
                                <Text style={ styles.temperature }>{ weather.current.temp.toFixed(0) }</Text>
                                <Text style={ styles.superscript }>{ String.fromCharCode(8451) }</Text>
                            </View>
                        </View>
                        <View style={ styles.centered }>
                            <Text style={ styles.smallText }>{ address.city }</Text>
                        </View>
                        <View style={ styles.rowContainer }>
                            <Text style={ styles.smallText }>{ i18n.t('feelsLike') + ' ' + weather.current.feels_like + String.fromCharCode(8451) }</Text>
                            <Entypo
                                name='flow-line'
                                size={ 24 }
                                color='white'
                            />
                            { sunHandler() }
                        </View>
                        <View style={ styles.rowContainer }>
                            <Button title='Today' />

                            <Button title='Tomorrow' />
                        </View>
                        <View style={ styles.flatListContainer }>
                            <FlatList
                                data={ weather.hourly }
                                renderItem={ () => <WeatherDetailsCard weather={ weather.hourly } /> }
                                keyExtractor={ item => item.dt.toString() }
                                horizontal={ true }
                                showsHorizontalScrollIndicator={ false }
                                overScrollMode='never'
                            />
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
        width: '90%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.dark,
        borderRadius: 40,
        padding: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
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
    title: {
        marginVertical: 10,
        width: '100%',
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
    closeButton: {
        marginVertical: 5,
        height: 45
    }
});

export default CustomModal;