import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityNavigator, AuthNavigator } from './ActivityNavigator';
import StartupScreen from '../screens/user/StartupScreen';
import { StatusBar } from 'react-native';
import Colors from '../constants/Colors';

const AppNavigator = props => {
    const isAuth = true;
    const triedToAutoLogin = false;

    return (
        <NavigationContainer>
            { isAuth && <ActivityNavigator /> }
            { isAuth && triedToAutoLogin && <AuthNavigator /> }
            { /*!isAuth && !triedToAutoLogin && <StartupScreen />*/ }
        </NavigationContainer>
    );
};

export default AppNavigator;