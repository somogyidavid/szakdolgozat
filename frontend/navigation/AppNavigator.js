import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityNavigator, AuthNavigator } from './ActivityNavigator';
import StartupScreen from '../screens/user/StartupScreen';
import { useSelector } from 'react-redux';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const triedToAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    return (
        <NavigationContainer>
            { isAuth && <ActivityNavigator /> }
            { !isAuth && triedToAutoLogin && <AuthNavigator /> }
            { !isAuth && !triedToAutoLogin && <StartupScreen /> }
        </NavigationContainer>
    );
};

export default AppNavigator;