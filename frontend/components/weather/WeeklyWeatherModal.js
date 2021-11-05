import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Platform, Image, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import Button from '../ui/Button';
import i18n from 'i18n-js';
import { useSelector } from 'react-redux';
import Title from '../ui/Title';
import { Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import Card from '../ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import WeatherChart from 'react-native-weather-chart/src/WeatherChart/WeatherChart';
import SeparatorLine from '../ui/SeparatorLine';

const WeeklyWeatherModal = props => {
    const { weather } = props;
    const [uvLevel, setUvLevel] = useState();
    const address = useSelector(state => state.location.address);

    useEffect(() => {
        uvLevelHandler();
    }, [weather.uvi]);

    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const date = new Date(weather.dt * 1000);
    const day = i18n.t(weekDays[date.getDay()]);
    const data = {
        values: [weather.temp.morn, weather.temp.day, weather.temp.eve, weather.temp.night],
        textTop: [
            weather.temp.morn + String.fromCharCode(8451),
            weather.temp.day + String.fromCharCode(8451),
            weather.temp.eve + String.fromCharCode(8451),
            weather.temp.night + String.fromCharCode(8451)
        ],
        textBottom: ['Morning', 'Day', 'Evening', 'Night']
    };

    const settings = {
        showTextTop: true,
        showTextBottom: true,
        showIconTop: false,
        showIconBottom: false,
        colSpace: 100,
        fontSizeTop: 16,
        fontSizeBottom: 16,
        markerSize: 6,
        markerStrokeSize: 2,
        lineColor: 'white',
        vlineColor: 'white',
        topTextColor: 'white',
        bottomTextColor: 'white',
        noDataText: 'ERROR',
        noDataTextColor: 'white'
    };

    const moonHandler = () => {
        const phase = weather.moon_phase;
        let moon = 'moon-full';

        if (phase === 1 || phase === 0) {
            moon = 'moon-new';
        } else if (phase > 0 && phase < 0.25) {
            moon = 'moon-waxing-crescent';
        } else if (phase === 0.25) {
            moon = 'moon-first-quarter';
        } else if (phase > 0.25 && phase < 0.5) {
            moon = 'moon-waxing-gibbous';
        } else if (phase === 0.5) {
            moon = 'moon-full';
        } else if (phase > 0.5 && phase < 0.75) {
            moon = 'moon-waning-gibbous';
        } else if (phase === 0.75) {
            moon = 'moon-last-quarter';
        } else if (phase > 0.75 && phase < 1) {
            moon = 'moon-waning-crescent';
        }

        return (
            <MaterialCommunityIcon
                name={ moon }
                color='white'
                size={ 50 }
                direction={ 1 }
            />
        );
    };

    const windIconHandler = () => {
        const degree = weather.wind_deg;
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
        const uvi = weather.uvi;

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
        const uvi = weather.uvi;

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
                    <Title
                        content={ address.city }
                        titleStyle={ styles.title }
                    />
                    <ScrollView>
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
                        <SeparatorLine />
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
                            { moonHandler() }
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
                        <SeparatorLine text={ i18n.t('temperature') } />
                        <View style={ styles.chart }>
                            <WeatherChart
                                data={ data }
                                settings={ settings }
                            />
                        </View>
                        <SeparatorLine text={ i18n.t('details') } />
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
                                    <Text style={ styles.smallText }>{ weather.wind_speed } km/h</Text>
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
                                    <Text style={ styles.smallText }>{ weather.uvi }</Text>
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
                                    <Text style={ styles.smallText }>{ weather.humidity }%</Text>
                                    <Text style={ styles.cardText }>
                                        { i18n.t('dewPointFuture', { value: weather.dew_point }) }
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
                                        { i18n.t('expectedRainFuture', { value: weather.rain ? weather.rain : 0 }) }
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
                                        { i18n.t('cloudinessFuture', { value: weather.clouds }) }
                                    </Text>
                                </Card>
                                <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <FontAwesome
                                            name='tachometer'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('pressure') }</Text>
                                    </View>
                                    <Text style={ styles.cardText }>{ weather.pressure } hPA</Text>
                                </Card>
                            </View>
                            <View style={ styles.row }>
                                { weather.snow && <Card style={ styles.card }>
                                    <View style={ styles.row }>
                                        <Ionicons
                                            name='snow'
                                            size={ 20 }
                                            color='white'
                                        />
                                        <Text style={ styles.smallText }> { i18n.t('snow').toUpperCase() }</Text>
                                    </View>
                                    <Text style={ styles.cardText }>
                                        { i18n.t('expectedSnowFuture', { value: weather.snow ? weather.snow : 0 }) }
                                    </Text>
                                </Card> }
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    today: {
        justifyContent: 'center',
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
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: '40%',
        marginVertical: 14
    },
    chart: {
        marginVertical: 26
    }
});

export default WeeklyWeatherModal;