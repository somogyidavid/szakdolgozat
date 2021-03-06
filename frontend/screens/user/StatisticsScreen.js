import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import SeparatorLine from '../../components/ui/SeparatorLine';
import i18n from 'i18n-js';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { View } from 'native-base';
import { getActivitiesCountForSeasons, getActivitiesForMonths } from '../../services/StatisticsService';

const StatisticsScreen = props => {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.statistics.statistics);

    const getStatisticsHandler = async () => {
        dispatch(getActivitiesForMonths());
        dispatch(getActivitiesCountForSeasons());
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', getStatisticsHandler);

        return () => {
            unsubscribe();
        };
    }, [getStatisticsHandler]);

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0.15,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.6,
        color: (opacity = 1) => `rgba(26, 255, 146, ${ opacity })`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        decimalPlaces: 0
    };

    const data = [
        {
            name: i18n.t('spring'),
            count: 0,
            color: 'green',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: i18n.t('summer'),
            count: 0,
            color: 'cyan',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: i18n.t('autumn'),
            count: 0,
            color: 'orange',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: i18n.t('winter'),
            count: 0,
            color: 'blue',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        }
    ];

    const dateData = {
        labels: ['Jan', 'Feb', 'M??r', '??pr', 'M??j', 'J??n', 'J??l', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                color: (opacity = 1) => `rgba(134, 65, 244, ${ opacity })`,
                strokeWidth: 3
            }
        ],
        legend: [i18n.t('countOfActivities')]
    };

    if (statistics.length > 0 && statistics[0].length && statistics[0]) {
        statistics[0].map((item) => {
            dateData.datasets[0].data[item.month - 1] = item.count;
        });
    }

    if (statistics.length > 1 && statistics[1]) {
        data[0].count = statistics[1].spring;
        data[1].count = statistics[1].summer;
        data[2].count = statistics[1].autumn;
        data[3].count = statistics[1].winter;
    }

    return (
        <View style={ styles.container }>
            <SeparatorLine text={ i18n.t('seasonsTitle') } />
            <PieChart
                data={ data }
                width={ Dimensions.get('window').width * 0.9 }
                height={ 220 }
                chartConfig={ chartConfig }
                accessor={ 'count' }
                backgroundColor={ 'transparent' }
                paddingLeft={ 0 }
            />
            <SeparatorLine text={ i18n.t('activity') } />
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