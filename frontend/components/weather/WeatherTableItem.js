import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import i18n from 'i18n-js';
import Colors from '../../constants/Colors';
import Button from '../ui/Button';
import { Ionicons } from '@expo/vector-icons';
import WeeklyWeatherModal from './WeeklyWeatherModal';

const WeatherTableItem = props => {
    const { weather } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const date = new Date(weather.dt * 1000);
    const day = i18n.t(shortDays[date.getDay()]);

    return (
        <View style={ styles.container }>
            <WeeklyWeatherModal
                visible={ modalVisible }
                closeModal={ () => setModalVisible(false) }
                weather={ weather }
            />
            <Text style={ styles.text }>{ day }</Text>
            <Image
                source={ { uri: `http://openweathermap.org/img/wn/${ weather.weather[0].icon }@2x.png` } }
                style={ styles.icon }
            />
            <View style={ styles.maxTemp }>
                <Text style={ styles.text }>{ weather.temp.max.toFixed(0) }</Text>
            </View>
            <View style={ styles.minTemp }>
                <Text style={ styles.text }>{ weather.temp.min.toFixed(0) }</Text>
            </View>
            <View style={ styles.rainContainer }>
                <Ionicons
                    name='rainy'
                    size={ 20 }
                    color='white'
                    style={ { padding: 5 } }
                />
                <Text style={ styles.text }>{ (weather.pop * 100).toFixed(0) }%</Text>
            </View>
            <Button
                title='...'
                style={ styles.detailsButton }
                onPress={ () => setModalVisible(true) }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.lightPurple,
        borderColor: Colors.darkPurple,
        borderWidth: 4,
        marginHorizontal: 6,
        padding: 6,
        borderRadius: 20,
        width: 120,
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans'
    },
    icon: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: Colors.darkPurple,
        borderWidth: 2,
        borderRadius: 20,
        margin: 10
    },
    maxTemp: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: Colors.coral,
        padding: 10,
        marginVertical: 10,
        borderRadius: 40,
    },
    minTemp: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: Colors.cobalt,
        padding: 10,
        marginVertical: 10,
        borderRadius: 40
    },
    rainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        borderRadius: 20,
        padding: 8
    },
    detailsButton: {
        flex: 1,
        marginTop: 5,
    }
});

export default WeatherTableItem;