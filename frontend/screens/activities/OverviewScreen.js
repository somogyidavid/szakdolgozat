import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import WeatherCard from '../../components/weather/WeatherCard';
import InterestsSelectorModal from '../../components/activity/InterestsSelectorModal';

const OverviewScreen = props => {
    const isLoading = useSelector(state => state.location.isLoading);

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
            <InterestsSelectorModal navigation={ props.navigation } />
            <WeatherCard navigation={ props.navigation } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    loadingSpinner: {
        flex: 1,
        backgroundColor: Colors.palePurple,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OverviewScreen;
