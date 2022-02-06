import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import SeparatorLine from '../../components/ui/SeparatorLine';
import i18n from 'i18n-js';

const StatisticsScreen = props => {
    return (
        <View style={ styles.container }>
            <SeparatorLine text={ 'Statisztika' } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.darkPurple
    }
});

export default StatisticsScreen;