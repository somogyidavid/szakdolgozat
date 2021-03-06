import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import i18n from 'i18n-js';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../../services/AuthService';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/ui/Input';
import Colors from '../../constants/Colors';
import Button from '../../components/ui/Button';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    const { type } = action;
    if (type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }

    return state;
};

const AuthScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const errors = useSelector(state => state.auth.errors);
    const isLoading = useSelector(state => state.auth.isLoading);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (errors.length > 0) {
            Toast.show({
                title: i18n.t('error'),
                description: errors[0] ? errors[0].data.message : i18n.t('unknownError'),
                status: 'error',
                placement: 'bottom'
            });
        }
    }, [errors]);

    const authHandler = async () => {
        let action;

        if (isSignUp) {
            action = signup(formState.inputValues.email, formState.inputValues.password);
            await AsyncStorage.removeItem('firstLaunch');
        } else {
            action = login(formState.inputValues.email, formState.inputValues.password);
        }

        dispatch(action);
    };

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView style={ styles.screen }>
            <LinearGradient
                colors={ [Colors.dark, Colors.lightPurple] }
                style={ styles.gradient }
            >
                <View style={ styles.authContainer }>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText={ i18n.t('emailError') }
                            onInputChange={ inputChangeHandler }
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label={ i18n.t('password') }
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={ 5 }
                            autoCapitalize='none'
                            errorText={ i18n.t('passwordError') }
                            onInputChange={ inputChangeHandler }
                            initialValue=''
                        />
                        <View style={ styles.buttonContainer }>
                            { isLoading ?
                              <ActivityIndicator
                                  size='small'
                                  color={ Colors.darkPurple }
                              /> :
                              <Button
                                  title={ isSignUp ? i18n.t('signUp') : i18n.t('login') }
                                  onPress={ authHandler }
                              />
                            }
                        </View>
                        <View style={ styles.buttonContainer }>
                            <Button
                                title={ isSignUp ? i18n.t('switchToLogin') : i18n.t('switchToSignUp') }
                                onPress={ () => setIsSignUp(prevState => !prevState) }
                            />
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        backgroundColor: 'lightgrey',
        borderRadius: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;