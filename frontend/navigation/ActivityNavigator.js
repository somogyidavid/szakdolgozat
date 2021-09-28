import React from 'react';
import { View, SafeAreaView, Text, Button, StyleSheet, StatusBar } from 'react-native';
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
import { Dimensions, Platform } from 'react-native';

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
            labeled={ Dimensions.get('window').width > 300 }
        >
            <OverviewTabNavigator.Screen
                name='Overview'
                component={ OverviewScreen }
                options={ {
                    tabBarLabel: i18n.t('overview'),
                    tabBarIcon: props => (
                        <Ionicons
                            name={ Platform.OS === 'android' ?
                                   (props.focused ? 'md-home' : 'md-home-outline') :
                                   (props.focused ? 'ios-home' : 'ios-home-outline') }
                            size={ props.focused ? 25 : 20 }
                            color={ Colors.dark }
                        />
                    ),
                    tabBarColor: Colors.light
                } }
            />
            <OverviewTabNavigator.Screen
                name='UserActivities'
                component={ UserActivitiesScreen }
                options={ {
                    tabBarLabel: i18n.t('userActivities'),
                    tabBarIcon: props => (
                        <Ionicons
                            name={ Platform.OS === 'android' ?
                                   (props.focused ? 'md-compass' : 'md-compass-outline') :
                                   (props.focused ? 'ios-compass' : 'ios-compass-outline') }
                            size={ props.focused ? 25 : 20 }
                            color={ Colors.dark }
                        />
                    ),
                    tabBarColor: Colors.green
                } }
            />
            <OverviewTabNavigator.Screen
                name='Calendar'
                component={ CalendarScreen }
                options={ {
                    tabBarLabel: i18n.t('calendar'),
                    tabBarIcon: props => (
                        <Ionicons
                            name={ Platform.OS === 'android' ?
                                   (props.focused ? 'md-calendar' : 'md-calendar-outline') :
                                   (props.focused ? 'ios-calendar' : 'ios-calendar-outline') }
                            size={ props.focused ? 25 : 20 }
                            color={ Colors.dark }
                        />
                    ),
                    tabBarColor: Colors.cyan
                } }
            />
            <OverviewTabNavigator.Screen
                name='Sights'
                component={ SightsScreen }
                options={ {
                    tabBarLabel: i18n.t('sights'),
                    tabBarIcon: props => (
                        <Ionicons
                            name={ Platform.OS === 'android' ?
                                   (props.focused ? 'md-flame' : 'md-flame-outline') :
                                   (props.focused ? 'ios-flame' : 'ios-flame-outline') }
                            size={ props.focused ? 25 : 20 }
                            color={ Colors.dark }
                        />
                    ),
                    tabBarColor: Colors.magenta
                } }
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
                options={ {
                    headerShown: false
                } }
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
        <ActivityDrawerNavigator.Navigator
            screenOptions={ defaultNavOptions }
            drawerContent={ props => {
                return (
                    <View>
                        <SafeAreaView>
                            <View
                                style={ {
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: StatusBar.currentHeight - 20,
                                    marginHorizontal: 10,
                                    paddingVertical: 20,
                                    borderWidth: 2,
                                    borderRadius: 10
                                } }
                            >
                                <Text style={ { fontFamily: 'open-sans-bold' } }>{ i18n.t('label') }</Text>
                            </View>
                            <DrawerItemList { ...props } />
                            <View style={ { marginHorizontal: 10 } }>
                                <Button
                                    title={ i18n.t('logout') }
                                    color={ Colors.darkPurple }
                                />
                            </View>
                        </SafeAreaView>
                    </View>
                );
            } }
        >
            <ActivityDrawerNavigator.Screen
                name='OverviewTab'
                component={ OverviewNavigator }
                options={ {
                    title: i18n.t('title')
                } }
            />
            <ActivityDrawerNavigator.Screen
                name='OptionsStack'
                component={ OptionsNavigator }
                options={ {
                    title: i18n.t('options')
                } }
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