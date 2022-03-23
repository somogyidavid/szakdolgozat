import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserActivities } from '../../services/UserActivitiesService';
import { FlatList } from 'native-base';
import Title from '../../components/ui/Title';
import i18n from 'i18n-js';
import UserActivityItem from '../../components/activity/UserActivityItem';

const UserActivitiesScreen = props => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.userActivities.isLoading);
    const activities = useSelector(state => state.userActivities.activities);

    const getUserActivitiesHandler = async () => {
        dispatch(fetchUserActivities());
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', getUserActivitiesHandler);

        return () => {
            unsubscribe();
        };
    }, [getUserActivitiesHandler]);

    return (
        <View style={ styles.container }>
            <Title
                cardStyle={ { backgroundColor: '#047857' } }
                content={ i18n.t('userActivities') }
            />
            { isLoading ?
              <View style={ styles.loadingSpinner }>
                  <ActivityIndicator
                      size='large'
                      color='#000'
                  />
              </View> :
              <FlatList
                  contentContainerStyle={ styles.flatList }
                  data={ activities }
                  renderItem={ ({ index, item }) => <UserActivityItem item={ item } /> }
                  keyExtractor={ (item, index) => index.toString() }
                  onRefresh={ getUserActivitiesHandler }
                  refreshing={ isLoading }
              /> }
            <TouchableOpacity
                activeOpacity={ 0.65 }
                onPress={ () => props.navigation.navigate('StatisticsStack') }
            >
                <Text style={ styles.statisticsButton }>
                    { i18n.t('statisticsButton') }
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d1fae5',
        padding: 4
    },
    loadingSpinner: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatList: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    statisticsButton: {
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        paddingVertical: 6,
        paddingHorizontal: 4,
        margin: 6,
        backgroundColor: '#047857',
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default UserActivitiesScreen;