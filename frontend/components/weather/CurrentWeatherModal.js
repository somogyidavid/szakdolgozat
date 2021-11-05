import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    Platform,
    FlatList, ScrollView
} from 'react-native';
import Button from '../ui/Button';
import i18n from 'i18n-js';
import Colors from '../../constants/Colors';
import Title from '../ui/Title';
import { Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import WeatherDetailsCard from './WeatherDetailsCard';
import Card from '../ui/Card';
import { LinearGradient } from 'expo-linear-gradient';

const CurrentWeatherModal = props => {
    const { weather, address, iconHandler } = props;
    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const currentDay = i18n.t(weekDays[currentDate.getDay()]);

    const [isToday, setIsToday] = useState(true);
    const [uvLevel, setUvLevel] = useState('LOW');
    const flatListRef = useRef(null);

    useEffect(() => {
        uvLevelHandler();
    }, [weather.current.uvi]);

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    });

    const onViewableItemsChanged = useRef(({ changed, viewableItems }) => {
        if (changed && changed.length > 0) {
            changed.forEach(item => {
                if (item.isViewable) {
                    if (item.index > 24) {
                        setIsToday(false);
                    } else {
                        setIsToday(true);
                    }
                }
            });
        }
    });

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

    const windIconHandler = () => {
        const degree = weather.current.wind_deg;
        const value = Math.floor((degree / 45) + 0.5);
        let iconNames = ['arrow-up', 'arrow-up-right', 'arrow-right', 'arrow-down-right', 'arrow-down', 'arrow-down-left', 'arrow-left', 'arrow-up-left'];
        let iconName = iconNames[(value % 8)];

        return (
            <Feather
                name={ iconName }
                size={ 24 }
                color='white'
            />
        );
    };

    const uvArrowHandler = () => {
        const uvi = weather.current.uvi;

        if (uvi < 4) {
            return {
                paddingRight: `${ 80 - uvi * 2 * 10 }%`
            };
        } else if (uvi > 4 && uvi <= 8) {
            return {
                paddingLeft: `${ 80 - uvi * 2 * 10 }%`
            };
        } else {
            return {
                paddingLeft: '80%'
            };
        }
    };

    const uvLevelHandler = () => {
        const uvi = weather.current.uvi;

        if (uvi >= 0 && uvi < 3) {
            setUvLevel(i18n.t('low'));
        } else if (uvi >= 3 && uvi < 5) {
            setUvLevel(i18n.t('moderate'));
        } else if (uvi >= 5 && uvi < 7) {
            setUvLevel(i18n.t('high'));
        } else if (uvi >= 7 && uvi < 8) {
            setUvLevel('veryHigh');
        } else if (uvi >= 8) {
            setUvLevel('extreme');
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
                    <ScrollView
                        showsVerticalScrollIndicator={ false }
                        directionalLockEnabled={ false }
                        horizontal={ false }
                    >
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
                            <Text style={ styles.smallText }>{ i18n.t('feelsLike') } { weather.current.feels_like.toFixed(0) + String.fromCharCode(8451) }</Text>
                            <Entypo
                                name='flow-line'
                                size={ 24 }
                                color='white'
                            />
                            { sunHandler() }
                        </View>
                        <View style={ styles.rowContainer }>
                            <View>
                                <Button
                                    title={ i18n.t('today') }
                                    onPress={ () => {
                                        if (flatListRef.current) {
                                            flatListRef.current.scrollToIndex({ index: 0 });
                                        }
                                    } }
                                    titleStyle={ isToday ? { color: 'white' } : { color: Colors.light } }
                                />
                                { isToday && <View style={ styles.centered }><Entypo
                                    name='dot-single'
                                    size={ 22 }
                                    color='white'
                                /></View> }
                            </View>
                            <View>
                                <Button
                                    title={ i18n.t('tomorrow') }
                                    onPress={ () => {
                                        if (flatListRef.current) {
                                            flatListRef.current.scrollToIndex({ index: 25 });
                                        }
                                    } }
                                    titleStyle={ !isToday ? { color: 'white' } : { color: Colors.light } }
                                />
                                { !isToday && <View style={ styles.centered }><Entypo
                                    name='dot-single'
                                    size={ 22 }
                                    color='white'
                                /></View> }
                            </View>
                        </View>
                        <View style={ styles.flatListContainer }>
                            <FlatList
                                ref={ flatListRef }
                                data={ weather.hourly }
                                renderItem={ ({ index }) => <WeatherDetailsCard
                                    weather={ weather.hourly[index] }
                                /> }
                                keyExtractor={ (item, index) => index.toString() }
                                horizontal={ true }
                                showsHorizontalScrollIndicator={ false }
                                overScrollMode='never'
                                viewabilityConfig={ viewabilityConfig.current }
                                onViewableItemsChanged={ onViewableItemsChanged.current }
                            />
                        </View>
                        <View style={ { alignItems: 'center', marginTop: 10 } }>
                            <View style={ styles.row }>
                                <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <Feather
                                            name='wind'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('wind') }</Text>
                                    </View>
                                    { windIconHandler() }
                                    <Text style={ styles.smallText }>{ weather.current.wind_speed } km/h</Text>
                                </Card>
                                <Card style={ styles.card }>
                                    <View style={ { ...styles.row, paddingVertical: '10%' } }>
                                        <Feather
                                            name='sun'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('uvIndex') }</Text>
                                    </View>
                                    <LinearGradient
                                        colors={ ['green', 'yellow', 'orange', 'red', 'magenta'] }
                                        start={ { x: 0, y: 1 } }
                                        end={ { x: 1, y: 0 } }
                                        style={ { width: '80%', height: '10%' } }
                                    >
                                        <View />
                                    </LinearGradient>
                                    <Ionicons
                                        name='caret-up-outline'
                                        size={ 16 }
                                        color='white'
                                        style={ uvArrowHandler() }
                                    />
                                    <Text style={ styles.smallText }>{ weather.current.uvi }</Text>
                                    <Text style={ styles.smallText }>{ uvLevel }</Text>
                                </Card>
                            </View>
                            <View style={ styles.row }>
                                <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <Entypo
                                            name='water'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('humidity') }</Text>
                                    </View>
                                    <Text style={ styles.smallText }>{ weather.current.humidity }%</Text>
                                    <Text style={ styles.cardText }>
                                        { i18n.t('dewPoint', { value: weather.current.dew_point }) }
                                    </Text>
                                </Card>
                                <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <Ionicons
                                            name='rainy'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('rain') }</Text>
                                    </View>
                                    <Text style={ styles.cardText }>
                                        { i18n.t('expectedRain', { value: weather.current.rain ? weather.current.rain : 0 }) }
                                    </Text>
                                </Card>
                            </View>
                            <View style={ styles.row }>
                                <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <Ionicons
                                            name='cloudy'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('clouds') }</Text>
                                    </View>
                                    <Text style={ styles.cardText }>
                                        { i18n.t('cloudiness', { value: weather.current.clouds }) }
                                    </Text>
                                </Card>
                                <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <Entypo
                                            name='eye'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('visibility') }</Text>
                                    </View>
                                    <Text style={ styles.cardText }>{ weather.current.visibility / 1000 } km</Text>
                                </Card>
                            </View>
                            <View style={ styles.row }>
                                { weather.current.snow && <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <Ionicons
                                            name='snow'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('snow').toUpperCase() }</Text>
                                    </View>
                                    <Text style={ styles.cardText }>
                                        { i18n.t('expectedSnow', { value: weather.current.snow ? weather.current.snow : 0 }) }
                                    </Text>
                                </Card> }
                                <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <FontAwesome
                                            name='tachometer'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('pressure') }</Text>
                                    </View>
                                    <Text style={ styles.cardText }>{ weather.current.pressure } hPA</Text>
                                </Card>
                            </View>
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
    )
        ;
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
    }
});

export default CurrentWeatherModal;