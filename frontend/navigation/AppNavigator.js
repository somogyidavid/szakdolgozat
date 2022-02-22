import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityNavigator, AuthNavigator } from './ActivityNavigator';
import StartupScreen from '../screens/user/StartupScreen';
import { useSelector } from 'react-redux';
import { Toast } from 'native-base';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const triedToAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    useEffect(() => {
        const languageHandler = async () => {
            const result = await AsyncStorage.getItem('language');

            if (result) {
                i18n.locale = JSON.parse(result).language;
            } else {
                i18n.locale = Localization.locale;
            }
        };
    }, []);

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