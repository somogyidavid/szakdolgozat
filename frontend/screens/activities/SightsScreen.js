import React, { useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import Title from '../../components/ui/Title';
import i18n from 'i18n-js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSights } from '../../services/SightsService';
import ActivityItem from '../../components/ui/ActivityItem';
import { useIsFocused } from '@react-navigation/native';
import { Toast } from 'native-base';

const SightsScreen = props => {
    const dispatch = useDispatch();
    const location = useSelector(state => state.location.location);
    const isLoading = useSelector(state => state.sights.isLoading);
    const sights = useSelector(state => state.sights.sights);

    const getSightsHandler = async () => {
        dispatch(fetchSights({
            latitude: location.lat,
            longitude: location.lng
        }));
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', getSightsHandler);

        return () => {
            unsubscribe();
        };
    }, [getSightsHandler]);

    return (
        <View style={ styles.container }>
            <Title
                cardStyle={ { backgroundColor: '#86198f' } }
                content={ i18n.t('sights') }
            />
            <Text style={ styles.text }>Néhány hely a közeledben, amit érdemes lehet meglátogatni!</Text>
            { isLoading ?
              <View style={ styles.loadingSpinner }>
                  <ActivityIndicator
                      size='large'
                      color='#86198f'
                  />
              </View> :
              <SafeAreaView style={ styles.flatListContainer }>
                  { sights.length > 0 ? <FlatList
                                          contentContainerStyle={ styles.flatList }
                                          showsVerticalScrollIndicator={ false }
                                          data={ sights.filter(item => {
                                              return item.photos;
                                          }) }
                                          renderItem={ ({ index, item }) => {
                                              return (
                                                  <TouchableOpacity
                                                      onPress={ () => console.log('pressed') }
                                                      activeOpacity={ 0.6 }
                                                  >
                                                      <ActivityItem
                                                          item={ item }
                                                          touchable={ false }
                                                      />
                                                  </TouchableOpacity>
                                              );
                                          } }
                                          keyExtractor={ (item, index) => index.toString() }
                                          onRefresh={ getSightsHandler }
                                          refreshing={ isLoading }
                                      /> :
                    <Text>
                        Sajnos nem található nevezetesség a környezetedben!
                    </Text> }
              </SafeAreaView> }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fbcfe8',
        padding: 4
    },
    text: {
        textAlign: 'center',
        backgroundColor: '#86198f',
        color: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 6,
        paddingVertical: 4,
        fontFamily: 'open-sans',
        fontSize: 14
    },
    loadingSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    flatListContainer: {
        flex: 1,
        marginTop: 10,
    }
});

export default SightsScreen;