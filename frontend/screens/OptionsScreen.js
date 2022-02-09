import React, { useState } from 'react';
import { Text, View, Linking, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import i18n from 'i18n-js';
import SeparatorLine from '../components/ui/SeparatorLine';
import { Button, HStack, PresenceTransition, Switch, VStack } from 'native-base';
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OptionsScreen = props => {
    const dispatch = useDispatch();
    const [creditsVisible, setCreditsVisible] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);

    return (
        <View style={ styles.container }>
            <View style={ { flex: 12 } }>
                <TouchableOpacity
                    onPress={ () => setNotificationVisible(!notificationVisible) }
                    activeOpacity={ 0.65 }
                >
                    <VStack style={ styles.itemContainer }>
                        <HStack>
                            <HStack style={ { flex: 12 } }>
                                <Ionicons
                                    name='notifications'
                                    size={ 26 }
                                    color='#FFF'
                                />
                                <Text style={ styles.text }>Értesítések</Text>
                            </HStack>
                            <HStack style={ { flex: 1 } }>
                                <Ionicons
                                    name='chevron-forward'
                                    size={ 26 }
                                    color='#FFF'
                                />
                            </HStack>
                        </HStack>
                        <PresenceTransition
                            visible={ notificationVisible }
                            initial={ { scale: 0, opacity: 0 } }
                            animate={ {
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    duration: 250
                                }
                            } }
                        >
                            <HStack style={ styles.item }>
                                <Entypo
                                    name='notification'
                                    size={ 24 }
                                    color='#FFF'
                                />
                                <Text style={ styles.smallText }>Push notifications</Text>
                                <Switch
                                    size='lg'
                                    marginLeft={ 8 }
                                    colorScheme='violet'
                                    isChecked={ pushNotifications }
                                    onToggle={ () => setPushNotifications(!pushNotifications) }
                                />
                            </HStack>
                        </PresenceTransition>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={ 0.65 }
                    onPress={ () => console.log('change password') }
                >
                    <VStack style={ styles.itemContainer }>
                        <HStack>
                            <HStack style={ { flex: 12 } }>
                                <Ionicons
                                    name='md-key-sharp'
                                    size={ 24 }
                                    color='#FFF'
                                />
                                <Text style={ styles.text }>Jelszó változtatás</Text>
                            </HStack>
                            <HStack style={ { flex: 1 } }>
                                <Ionicons
                                    name='chevron-forward'
                                    size={ 26 }
                                    color='#FFF'
                                />
                            </HStack>
                        </HStack>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={ 0.65 }
                    onPress={ () => {
                        AsyncStorage.removeItem('firstLaunch');
                        props.navigation.navigate('OverviewTab');
                    } }
                >
                    <VStack style={ styles.itemContainer }>
                        <HStack>
                            <HStack style={ { flex: 12 } }>
                                <MaterialIcons
                                    name='local-attraction'
                                    size={ 26 }
                                    color='#FFF'
                                />
                                <Text style={ styles.text }>Érdeklődési körök módosítása</Text>
                            </HStack>
                            <HStack style={ { flex: 1 } }>
                                <Ionicons
                                    name='chevron-forward'
                                    size={ 26 }
                                    color='#FFF'
                                />
                            </HStack>
                        </HStack>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={ 0.65 }
                    onPress={ () => setCreditsVisible(!creditsVisible) }
                >
                    <VStack style={ styles.itemContainer }>
                        <HStack>
                            <HStack style={ { flex: 12 } }>
                                <AntDesign
                                    name='questioncircleo'
                                    size={ 24 }
                                    color='#FFF'
                                />
                                <Text style={ styles.text }>Credits
                                </Text>
                            </HStack>
                            <HStack style={ { flex: 1 } }>
                                <Ionicons
                                    name='chevron-forward'
                                    size={ 26 }
                                    color='#FFF'
                                />
                            </HStack>
                        </HStack>
                        <PresenceTransition
                            visible={ creditsVisible }
                            initial={ { scale: 0, opacity: 0 } }
                            animate={ { scale: 1, opacity: 1, transition: { duration: 250 } } }
                        >
                            <Text
                                style={ styles.creditText }
                                onPress={ () => Linking.openURL('https://github.com/somogyidavid/szakdolgozat') }
                            >
                                Szakdolgozatot készítette:{ '\n' }Somogyi Dávid - EQDGRJ
                            </Text>
                            <Text
                                style={ styles.creditText }
                                onPress={ () => Linking.openURL('https://www.freepik.com/vectors/calendar') }
                            >
                                Calendar vector created by freepik - www.freepik.com
                            </Text>
                        </PresenceTransition>
                    </VStack>
                </TouchableOpacity>
            </View>
            <View style={ { flex: 1 } }>
                <Button
                    colorScheme='violet'
                    _text={ { style: styles.logoutButtonText } }
                    onPress={ () => dispatch(logout()) }
                >
                    { i18n.t('logout') }
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.darkPurple,
        padding: 4
    },
    itemContainer: {
        backgroundColor: Colors.irisPurple,
        padding: 8,
        margin: 6,
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.9,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        overflow: 'hidden'
    },
    item: {
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 24
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans',
        marginLeft: 12
    },
    smallText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'open-sans',
        marginLeft: 12
    },
    creditText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'open-sans',
        fontSize: 14,
        textDecorationLine: 'underline',
        backgroundColor: Colors.light,
        marginHorizontal: 14,
        marginVertical: 8,
        padding: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    logoutButtonText: {
        color: '#FFF',
        fontFamily: 'open-sans',
        fontSize: 16
    }
});

export default OptionsScreen;