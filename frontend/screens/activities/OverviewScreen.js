import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import WeatherCard from '../../components/WeatherCard';

const OverviewScreen = props => {
    const dispatch = useDispatch();
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
            <WeatherCard navigation={ props.navigation } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(52, 52, 52, 0.3)'
    },
    loadingSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OverviewScreen;
