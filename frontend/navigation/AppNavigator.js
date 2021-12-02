import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AboutAppNavigator, ActivityNavigator, AuthNavigator } from './ActivityNavigator';
import StartupScreen from '../screens/user/StartupScreen';
import { useSelector } from 'react-redux';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const triedToAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    if (isAuth) {
        Toast.show({
            title: 'Siker',
            description: 'Sikeres bejelentkezés!',
            status: 'success',
            placement: 'top'
        });
    }

    return (
        <NavigationContainer>
            { isAuth && <ActivityNavigator /> }
            { !isAuth && triedToAutoLogin && <AuthNavigator /> }
            { !isAuth && !triedToAutoLogin && <StartupScreen /> }
        </NavigationContainer>
    );
};

export default AppNavigator;