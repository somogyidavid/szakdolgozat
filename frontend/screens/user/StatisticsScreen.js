import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import SeparatorLine from '../../components/ui/SeparatorLine';
import i18n from 'i18n-js';
import { useSelector } from 'react-redux';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { View } from 'native-base';

const StatisticsScreen = props => {
    const activities = useSelector(state => state.userActivities.activities);

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${ opacity })`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    const data = [
        {
            name: 'Park',
            count: 4,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'Zoo',
            count: 2,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'Tourist Attraction',
            count: 12,
            color: 'green',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'Spa',
            count: 5,
            color: '#ffffff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'Cafe',
            count: 4,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        }
    ];

    const dateData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [2, 4, 6, 12, 15, 20],
                color: (opacity = 1) => `rgba(134, 65, 244, ${ opacity })`, // optional
                strokeWidth: 3 // optional
            }
        ],
        legend: ['Activities'] // optional
    };

    return (
        <View style={ styles.container }>
            <SeparatorLine text='Érdeklődési körök' />
            <PieChart
                data={ data }
                width={ Dimensions.get('window').width * 0.9 }
                height={ 220 }
                chartConfig={ chartConfig }
                accessor={ 'count' }
                backgroundColor={ 'transparent' }
            />
            <SeparatorLine text='Aktivitás' />
            <LineChart
                data={ dateData }
                width={ Dimensions.get('window').width * 0.9 }
                height={ 256 }
                verticalLabelRotation={ 30 }
                chartConfig={ chartConfig }
                bezier
                fromZero
            />
            <SeparatorLine text=' ' />
            <TouchableOpacity
                activeOpacity={ 0.65 }
                onPress={ () => props.navigation.navigate('OverviewTab' +
                    '') }
            >
                <Text style={ styles.backButton }>{ i18n.t('back') }</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.darkPurple
    },
    backButton: {
        color: '#FFF',
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        backgroundColor: Colors.irisPurple,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default StatisticsScreen;