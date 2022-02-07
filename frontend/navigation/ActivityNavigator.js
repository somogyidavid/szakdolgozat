import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
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
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Dimensions, Platform } from 'react-native';
import FocusAwareStatusBar from '../components/ui/FocusAwareStatusBar';
import ProfileScreen from '../screens/user/ProfileScreen';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import { logout } from '../services/AuthService';
import AboutAppScreen from '../screens/AboutAppScreen';
import StatisticsScreen from '../screens/user/StatisticsScreen';

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

const iconHandler = () => {
    return (
        <Entypo
            name='dot-single'
            size={ 20 }
            color='black'
        />
    );
};

export const OverviewNavigator = () => {
    const isWideEnough = Dimensions.get('window').width > 300;

    return (
        <OverviewTabNavigator.Navigator
            screenOptions={ { tabBarColor: Colors.light } }
            activeColor={ Colors.dark }
        >
            <OverviewTabNavigator.Screen
                name='Overview'
                component={ OverviewScreen }
                options={ {
                    tabBarLabel: isWideEnough ? i18n.t('overview') : iconHandler(),
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
                    tabBarLabel: isWideEnough ? i18n.t('userActivities') : iconHandler(),
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
                    tabBarLabel: isWideEnough ? i18n.t('calendar') : iconHandler(),
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
                    tabBarLabel: isWideEnough ? i18n.t('sights') : iconHandler(),
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

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
    return (
        <ProfileStackNavigator.Navigator>
            <ProfileStackNavigator.Screen
                name='Profile'
                component={ ProfileScreen }
                options={ {
                    headerShown: false
                } }
            />
        </ProfileStackNavigator.Navigator>
    );
};

const AboutAppStackNavigator = createStackNavigator();

export const AboutAppNavigator = () => {
    return (
        <AboutAppStackNavigator.Navigator>
            <AboutAppStackNavigator.Screen
                name={ 'AboutApp' }
                component={ AboutAppScreen }
                options={ { headerShown: false } }
            />
        </AboutAppStackNavigator.Navigator>
    );
};

const StatisticsStackNavigator = createStackNavigator();

export const StatisticsNavigator = () => {
    return (
        <StatisticsStackNavigator.Navigator>
            <StatisticsStackNavigator.Screen
                name={ 'Statistics' }
                component={ StatisticsScreen }
                options={ { headerShown: false } }
            />
        </StatisticsStackNavigator.Navigator>
    );
};

const ActivityDrawerNavigator = createDrawerNavigator();

export const ActivityNavigator = () => {
    const dispatch = useDispatch();

    return (
        <ActivityDrawerNavigator.Navigator
            screenOptions={ {
                ...defaultNavOptions,
                drawerType: 'front',
                drawerStyle: {
                    backgroundColor: Colors.dark
                },
                drawerActiveTintColor: '#FFF',
                drawerInactiveTintColor: '#FFF',
                drawerActiveBackgroundColor: Colors.lightPurple,
                drawerInactiveBackgroundColor: Colors.darkPurple,
                overlayColor: '#21183C80',
                headerTitleAlign: 'center',
                drawerItemStyle: {
                    marginHorizontal: 40,
                    marginVertical: 10,
                    borderRadius: 20
                },
                swipeEdgeWidth: Dimensions.get('window').width / 5,
            } }
            drawerContent={ props => {
                return (
                    <SafeAreaView
                        style={ styles.safeAreaView }
                        forceInset={ { top: 'always', horizontal: 'never' } }
                    >
                        <View style={ styles.mainContainer }>
                            <FocusAwareStatusBar />
                            <DrawerItem
                                label={ i18n.t('label') }
                                onPress={ () => props.navigation.navigate('Overview') }
                                icon={ () => {
                                    return (
                                        <Ionicons
                                            name={ Platform.OS === 'android' ? 'md-compass-outline' : 'ios-compass-outline' }
                                            size={ 30 }
                                            color='#FFF'
                                        />
                                    );
                                } }
                                style={ { ...styles.drawerItemContainer, marginBottom: 10 } }
                                labelStyle={ styles.drawerItem }
                                inactiveBackgroundColor={ Colors.darkPurple }
                            />
                            <DrawerItemList { ...props } />
                        </View>
                        <View style={ styles.secondaryContainer }>
                            <DrawerItem
                                label={ i18n.t('logout') }
                                onPress={ () => {
                                    dispatch(logout());
                                } }
                                icon={ () => {
                                    return (
                                        <Ionicons
                                            name={ Platform.OS === 'android' ? 'md-exit-outline' : 'ios-exit-outline' }
                                            size={ 30 }
                                            color='#FFF'
                                        />
                                    );
                                } }
                                style={ { ...styles.drawerItemContainer, marginTop: 20 } }
                                labelStyle={ styles.drawerItem }
                                inactiveBackgroundColor={ Colors.darkPurple }
                            />
                        </View>
                    </SafeAreaView>
                );
            } }
        >
            <ActivityDrawerNavigator.Screen
                name='OverviewTab'
                component={ OverviewNavigator }
                options={ {
                    title: i18n.t('title'),
                    drawerIcon: () => {
                        return (
                            <Ionicons
                                name={ Platform.OS === 'android' ? 'md-home-outline' : 'ios-home-outline' }
                                size={ 30 }
                                color='#FFF'
                            />
                        );
                    }
                } }
            />
            <ActivityDrawerNavigator.Screen
                name='ProfileStack'
                component={ ProfileNavigator }
                options={ {
                    title: i18n.t('profile'),
                    drawerIcon: () => {
                        return (
                            <Ionicons
                                name={ Platform.OS === 'android' ? 'md-person-circle-outline' : 'ios-person-circle-outline' }
                                size={ 30 }
                                color='#FFF'
                            />
                        );
                    }
                } }
            />
            <ActivityDrawerNavigator.Screen
                name='StatisticsStack'
                component={ StatisticsNavigator }
                options={ {
                    title: 'Statisztikák',
                    drawerIcon: () => {
                        return (
                            <Ionicons
                                name={ Platform.OS === 'android' ? 'md-stats-chart-outline' : 'ios-stats-chart-outline' }
                                size={ 30 }
                                color='#FFF'
                            />
                        );
                    }
                } }
            />
            <ActivityDrawerNavigator.Screen
                name='AboutAppStack'
                component={ AboutAppNavigator }
                options={ {
                    title: 'Tippek',
                    drawerIcon: () => {
                        return (
                            <Entypo
                                name={ 'light-bulb' }
                                size={ 30 }
                                color='#FFF'
                            />
                        );
                    }
                } }
            />
            <ActivityDrawerNavigator.Screen
                name='OptionsStack'
                component={ OptionsNavigator }
                options={ {
                    title: i18n.t('options'),
                    drawerIcon: () => {
                        return (
                            <Ionicons
                                name={ Platform.OS === 'android' ? 'md-options-outline' : 'ios-options-outline' }
                                size={ 30 }
                                color='#FFF'
                            />
                        );
                    }
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
                options={ {
                    title: i18n.t('label'),
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: Colors.darkPurple
                    }
                } }
            />
        </AuthStackNavigator.Navigator>
    );
};

const styles = StyleSheet.create({
    drawerItem: {
        color: '#FFF'
    },
    drawerItemContainer: {
        borderRadius: 20
    },
    logout: {
        color: '#FFF',
        fontFamily: 'open-sans-bold'
    },
    safeAreaView: {
        flex: 1,
        flexDirection: 'column'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    secondaryContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: getStatusBarHeight(),
        marginBottom: 8
    }
});