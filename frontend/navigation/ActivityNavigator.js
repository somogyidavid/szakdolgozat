import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Colors from '../constants/Colors';
import OverviewScreen from '../screens/activities/OverviewScreen';
import UserActivitiesScreen from '../screens/activities/UserActivitiesScreen';
import CalendarScreen from '../screens/activities/CalendarScreen';
import SightsScreen from '../screens/activities/SightsScreen';
import OptionsScreen from '../screens/OptionsScreen';
import InterestsScreen from '../screens/user/InterestsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import i18n from 'i18n-js';
import { Ionicons } from '@expo/vector-icons';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.dark
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Colors.light
};

const OverviewTabNavigator = createMaterialBottomTabNavigator();

export const OverviewNavigator = () => {
    return (
        <OverviewTabNavigator.Navigator
            screenOptions={ { tabBarColor: Colors.light } }
            activeColor={ Colors.dark }
        >
            <OverviewTabNavigator.Screen
                name='Overview'
                component={ OverviewScreen }
                options={ {
                    tabBarLabel: i18n.t('overview'),
                    tabBarIcon: props => (
                        <Ionicons
                            name='md-home'
                            size={ 23 }
                            color={ Colors.dark }
                        />
                    ),
                    tabBarColor: Colors.light,
                } }
            />
            <OverviewTabNavigator.Screen
                name='UserActivities'
                component={ UserActivitiesScreen }
            />
            <OverviewTabNavigator.Screen
                name='Calendar'
                component={ CalendarScreen }
            />
            <OverviewTabNavigator.Screen
                name='Sights'
                component={ SightsScreen }
            />
        </OverviewTabNavigator.Navigator>
    );
};

const OptionsStackNavigator = createStackNavigator();

export const OptionsNavigator = () => {
    return (
        <OptionsStackNavigator.Navigator>
            <OptionsStackNavigator.Screen
                name='Options'
                component={ OptionsScreen }
            />
            <OptionsStackNavigator.Screen
                name='Interests'
                component={ InterestsScreen }
            />
        </OptionsStackNavigator.Navigator>
    );
};

const ActivityDrawerNavigator = createDrawerNavigator();

export const ActivityNavigator = () => {
    return (
        <ActivityDrawerNavigator.Navigator screenOptions={ defaultNavOptions }>
            <ActivityDrawerNavigator.Screen
                name='OverviewTab'
                component={ OverviewNavigator }
            />
            <ActivityDrawerNavigator.Screen
                name='Activity'
                component={ OptionsNavigator }
            />
        </ActivityDrawerNavigator.Navigator>
    );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name='Auth'
                component={ AuthScreen }
            />
        </AuthStackNavigator.Navigator>
    );
};