import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import SeparatorLine from '../../components/ui/SeparatorLine';
import { Button, FormControl, Icon, Input, PresenceTransition, ScrollView } from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import InputSpinner from 'react-native-input-spinner';
import i18n from 'i18n-js';
import ProfileCard from '../../components/ui/ProfileCard';
import { fetchUser, editUser } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';

const ProfileScreen = props => {
    const dispatch = useDispatch();
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const [visible, setVisible] = useState(true);
    const [name, setName] = useState('');
    const [age, setAge] = useState(18);
    const [description, setDescription] = useState('');

    const isLoading = useSelector(state => state.user.isLoading);
    const user = useSelector(state => state.user.user);
    const userId = useSelector(state => state.auth.userId);

    const getUserHandler = async () => {
        dispatch(fetchUser(userId));
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', getUserHandler);

        return () => {
            unsubscribe();
        };
    }, [getUserHandler]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAge(user.age);
            setDescription(user.description);
        }
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={ () => {
                descriptionInputRef.current.blur();
                nameInputRef.current.blur();
            } }
        >
            <ScrollView style={ styles.container }>
                { isLoading ?
                  <View style={ styles.loadingSpinner }>
                      <ActivityIndicator
                          size='large'
                          color='#FFF'
                      />
                  </View> :
                  <PresenceTransition
                      visible={ visible }
                      initial={ { opacity: 0, scale: 0 } }
                      animate={ { opacity: 1, scale: 1, transition: { duration: 250 } } }
                  >
                      <ProfileCard
                          name={ user.name }
                          age={ user.age }
                          description={ user.description }
                          interests={ user.interests }
                      />
                  </PresenceTransition> }
                <View style={ styles.formContainer }>
                    <SeparatorLine text={ i18n.t('details') } />
                    <FormControl ml={ 12 }>
                        <FormControl.Label _text={ { style: styles.label } }>
                            { i18n.t('fullName') }
                        </FormControl.Label>
                        <Input
                            value={ name }
                            ref={ nameInputRef }
                            variant='rounded'
                            width={ Dimensions.get('window').width * 0.7 }
                            _focus={ {
                                borderWidth: 2,
                                borderColor: '#FFF'
                            } }
                            borderColor='#FFF'
                            color='#FFF'
                            selectionColor='#FFF'
                            mb={ 2 }
                            InputLeftElement={
                                <Icon
                                    as={ <Ionicons name={ 'person' } /> }
                                    size={ 6 }
                                    ml={ 2 }
                                    color='#FFF'
                                />
                            }
                            onChangeText={ (text) => setName(text) }
                        />
                        <FormControl.Label _text={ { style: styles.label } }>
                            { i18n.t('age') }
                        </FormControl.Label>
                        <InputSpinner
                            value={ age }
                            initialValue={ 18 }
                            min={ 1 }
                            max={ 120 }
                            step={ 1 }
                            selectTextOnFocus={ false }
                            style={ styles.inputSpinner }
                            color='#FFF'
                            textColor='#FFF'
                            selectionColor='#FFF'
                            showBorder={ true }
                            rounded={ false }
                            onChange={ (value) => setAge(value) }
                            buttonPressStyle={ { backgroundColor: Colors.palePurple } }
                        />
                        <FormControl.Label _text={ { style: styles.label } }>
                            { i18n.t('description') }
                        </FormControl.Label>
                        <Input
                            value={ description }
                            ref={ descriptionInputRef }
                            variant='rounded'
                            multiline={ true }
                            numberOfLines={ 8 }
                            width={ Dimensions.get('window').width * 0.7 }
                            _focus={ {
                                borderWidth: 2,
                                borderColor: '#FFF'
                            } }
                            borderColor='#FFF'
                            color='#FFF'
                            selectionColor='#FFF'
                            mb={ 2 }
                            InputLeftElement={
                                <Icon
                                    as={ <MaterialIcons name={ 'description' } /> }
                                    size={ 6 }
                                    ml={ 2 }
                                    color='#FFF'
                                />
                            }
                            onChangeText={ (text) => setDescription(text) }
                            onFocus={ () => setVisible(false) }
                            onBlur={ () => setVisible(true) }
                        />
                    </FormControl>
                    <Button
                        mt={ 4 }
                        style={ styles.saveButton }
                        _text={ { style: styles.buttonText } }
                        _pressed={ { style: styles.pressedButton } }
                        onPress={ () => {
                            dispatch(editUser({
                                userId: userId,
                                email: user.email,
                                name,
                                age,
                                description
                            }));
                            setVisible(true);
                        } }
                    >
                        { i18n.t('save') }
                    </Button>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darkPurple
    },
    loadingSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40
    },
    formContainer: {
        backgroundColor: Colors.irisPurple,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    label: {
        color: Colors.dark,
        backgroundColor: '#FFF',
        padding: 4,
        borderRadius: 10,
        overflow: 'hidden',
        fontSize: 16,
        fontFamily: 'open-sans'
    },
    inputSpinner: {
        width: Dimensions.get('window').width * 0.7,
        marginBottom: 6
    },
    saveButton: {
        backgroundColor: '#FFF',
        marginVertical: 20
    },
    buttonText: {
        color: Colors.dark,
        fontFamily: 'open-sans-bold'
    },
    pressedButton: {
        backgroundColor: Colors.palePurple,
        marginVertical: 20
    }
});

export default ProfileScreen;