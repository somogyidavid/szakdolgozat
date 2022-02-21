import React, { useEffect, useState } from 'react';
import { View, Linking, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import i18n from 'i18n-js';
import SeparatorLine from '../components/ui/SeparatorLine';
import { Button, HStack, Input, Switch, Text, Toast, VStack } from 'native-base';
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/AuthService';
import OptionItem from '../components/ui/OptionItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changePassword, deleteUser } from '../services/UserService';

const OptionsScreen = props => {
    const dispatch = useDispatch();
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [interestsVisible, setInterestsVisible] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [deleteUserVisible, setDeleteUserVisible] = useState(false);
    const [creditsVisible, setCreditsVisible] = useState(false);

    const errors = useSelector(state => state.user.errors);

    useEffect(() => {
        if (errors.length > 0) {
            Toast.show({
                title: i18n.t('error'),
                description: errors[0] ? errors[0].data.message : 'Ismeretlen hiba történt!',
                status: 'error',
                placement: 'bottom'
            });
        }
    }, [errors]);

    return (
        <View style={ styles.container }>
            <View style={ { flex: 12 } }>
                <OptionItem
                    visible={ notificationVisible }
                    setVisible={ setNotificationVisible }
                    title='Értesítések'
                    icon={ () => <Ionicons
                        name='notifications'
                        size={ 26 }
                        color='#FFF'
                    /> }
                >
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
                </OptionItem>
                <OptionItem
                    visible={ interestsVisible }
                    setVisible={ setInterestsVisible }
                    title='Érdeklődési körök módosítása'
                    icon={ () => <MaterialIcons
                        name='local-attraction'
                        size={ 26 }
                        color='#FFF'
                    /> }
                >
                    <HStack
                        justifyContent='center'
                        alignItems='center'
                        flex={ 1 }
                    >
                        <AntDesign
                            name='questioncircleo'
                            size={ 24 }
                            color='#FFF'
                        />
                        <VStack
                            mx={ 4 }
                            flex={ 1 }
                        >
                            <Text
                                style={ styles.smallText }
                                mb={ 2 }
                            >
                                Biztos vagy benne? A programajánlás pontossága csökkenhet.
                            </Text>
                            <Button
                                size='md'
                                variant='solid'
                                colorScheme='violet'
                                mx={ 4 }
                                _text={ { color: '#FFF' } }
                                onPress={ async () => {
                                    await AsyncStorage.removeItem('firstLaunch');
                                    setInterestsVisible(false);
                                    props.navigation.navigate('OverviewTab', {
                                        screen: 'Overview'
                                    });
                                } }
                            >
                                Igen!
                            </Button>
                        </VStack>
                    </HStack>
                </OptionItem>
                <OptionItem
                    visible={ changePasswordVisible }
                    setVisible={ setChangePasswordVisible }
                    title='Jelszó változtatás'
                    icon={ () => <Ionicons
                        name='md-key-sharp'
                        size={ 24 }
                        color='#FFF'
                    /> }
                >
                    <HStack
                        alignItems='center'
                        flex={ 1 }
                    >
                        <TouchableOpacity
                            activeOpacity={ 0.65 }
                            style={ styles.hidePasswordButton }
                            onPress={ () => setShowPassword(!showPassword) }
                        >
                            <Entypo
                                name={ showPassword ? 'eye-with-line' : 'eye' }
                                size={ 24 }
                                color='#FFF'
                            />
                        </TouchableOpacity>
                        <VStack
                            flex={ 1 }
                            space={ 3 }
                            alignItems='center'
                        >
                            <Input
                                w={ Dimensions.get('window').width * 0.7 }
                                h={ 10 }
                                placeholder={ 'Jelenlegi jelszó' }
                                placeholderTextColor='#FFF'
                                color='#FFF'
                                selectionColor='#FFF'
                                value={ oldPassword }
                                onChangeText={ (text) => setOldPassword(text) }
                                type={ showPassword ? 'text' : 'password' }
                            />
                            <Input
                                w={ Dimensions.get('window').width * 0.7 }
                                h={ 10 }
                                placeholder={ 'Új jelszó' }
                                placeholderTextColor='#FFF'
                                color='#FFF'
                                selectionColor='#FFF'
                                value={ password }
                                onChangeText={ (text) => setPassword(text) }
                                type={ showPassword ? 'text' : 'password' }
                            />
                            <Input
                                w={ Dimensions.get('window').width * 0.7 }
                                h={ 10 }
                                placeholder={ 'Új jelszó megerősítése' }
                                placeholderTextColor='#FFF'
                                color='#FFF'
                                selectionColor='#FFF'
                                value={ passwordConfirm }
                                onChangeText={ (text) => setPasswordConfirm(text) }
                                type={ showPassword ? 'text' : 'password' }
                            />
                            <Button
                                variant='solid'
                                colorScheme='violet'
                                _text={ { color: '#FFF' } }
                                onPress={ () => {
                                    dispatch(changePassword(oldPassword, password, passwordConfirm));
                                    setOldPassword('');
                                    setPassword('');
                                    setPasswordConfirm('');
                                    setShowPassword(false);
                                    setChangePasswordVisible(false);
                                } }
                            >
                                { i18n.t('save') }
                            </Button>
                        </VStack>
                    </HStack>
                </OptionItem>
                <OptionItem
                    visible={ deleteUserVisible }
                    setVisible={ setDeleteUserVisible }
                    title='Felasználó törlése'
                    icon={ () => <AntDesign
                        name='deleteuser'
                        size={ 24 }
                        color='#FFF'
                    /> }
                >
                    <HStack
                        flex={ 1 }
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Entypo
                            name='warning'
                            size={ 24 }
                            color='#FFF'
                        />
                        <VStack
                            flex={ 1 }
                            mx={ 4 }
                            space={ 3 }
                        >
                            <Text
                                style={ styles.smallText }
                            >
                                Biztosan törlöd a fiókód? Az adataid és beállításaid teljesen elvesznek, és nem{ ' ' }
                                visszaállíthatóak!
                            </Text>
                            <Input
                                w={ Dimensions.get('window').width * 0.7 }
                                h={ 10 }
                                placeholder={ 'Jelszó' }
                                placeholderTextColor='#FFF'
                                color='#FFF'
                                selectionColor='#FFF'
                                value={ password }
                                onChangeText={ (text) => setPassword(text) }
                                type={ showPassword ? 'text' : 'password' }
                                InputRightElement={
                                    <Button
                                        colorScheme='violet'
                                        onPress={ () => setShowPassword(!showPassword) }
                                    >
                                        <Entypo
                                            name={ showPassword ? 'eye-with-line' : 'eye' }
                                            size={ 24 }
                                            color='#FFF'
                                        />
                                    </Button>
                                }
                            />
                            <Input
                                w={ Dimensions.get('window').width * 0.7 }
                                h={ 10 }
                                placeholder={ 'Jelszó megerősítése' }
                                placeholderTextColor='#FFF'
                                color='#FFF'
                                selectionColor='#FFF'
                                value={ passwordConfirm }
                                onChangeText={ (text) => setPasswordConfirm(text) }
                                type={ showPassword ? 'text' : 'password' }
                            />
                            <Button
                                size='md'
                                variant='solid'
                                colorScheme='violet'
                                mx={ 4 }
                                _text={ { color: '#FFF' } }
                                onPress={ () => {
                                    dispatch(deleteUser(password, passwordConfirm));
                                    setPassword('');
                                    setPasswordConfirm('');
                                } }
                            >
                                Igen, biztosan!
                            </Button>
                        </VStack>
                    </HStack>
                </OptionItem>
                <OptionItem
                    visible={ creditsVisible }
                    setVisible={ setCreditsVisible }
                    title='Credits'
                    icon={ () => <AntDesign
                        name='questioncircleo'
                        size={ 24 }
                        color='#FFF'
                    /> }
                >
                    <VStack>
                        <HStack alignItems='center'>
                            <Entypo
                                name='open-book'
                                size={ 24 }
                                color='#FFF'
                            />
                            <Text
                                style={ styles.creditText }
                                onPress={ () => Linking.openURL('https://github.com/somogyidavid/szakdolgozat') }
                            >
                                Szakdolgozatot készítette:{ '\n' }Somogyi Dávid - EQDGRJ
                            </Text>
                        </HStack>
                        <HStack alignItems='center'>
                            <FontAwesome5
                                name='hands-helping'
                                size={ 20 }
                                color='#FFF'
                            />
                            <Text
                                style={ styles.creditText }
                                onPress={ () => Linking.openURL('https://www.freepik.com/vectors/calendar') }
                            >
                                Calendar vector created by freepik{ '\n' }www.freepik.com
                            </Text>
                        </HStack>
                    </VStack>
                </OptionItem>
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
        paddingVertical: 4,
        paddingHorizontal: 8,
        padding: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    logoutButtonText: {
        color: '#FFF',
        fontFamily: 'open-sans',
        fontSize: 16
    },
    hidePasswordButton: {
        backgroundColor: Colors.irisPurple,
        padding: 4,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default OptionsScreen;