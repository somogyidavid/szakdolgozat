import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AboutAppNavigator, ActivityNavigator, AuthNavigator } from './ActivityNavigator';
import StartupScreen from '../screens/user/StartupScreen';
import { useSelector } from 'react-redux';
import { Toast } from 'native-base';
import i18n from 'i18n-js';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const triedToAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    if (isAuth) {
        Toast.show({
            title: i18n.t('success'),
            description: i18n.t('successfulLogin'),
            status: 'success',
            placement: 'bottom'
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