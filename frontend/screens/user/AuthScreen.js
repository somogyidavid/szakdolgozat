import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../services/AuthService';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';

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

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

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
        if (error) {
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        
        if (isSignUp) {
            action = signup(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = login(formState.inputValues.email, formState.inputValues.password);
        }

        setError(null);
        setIsLoading(true);

        try {
            await dispatch(action);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
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
                            errorText='Please enter a valid e-mail address.'
                            onInputChange={ inputChangeHandler }
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={ 5 }
                            autoCapitalize='none'
                            errorText='Please enter a valid password.'
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
                                  title={ isSignUp ? 'Sign Up' : 'Login' }
                                  onPress={ authHandler }
                              />
                            }
                        </View>
                        <View style={ styles.buttonContainer }>
                            <Button
                                title={ `Switch to ${ isSignUp ? 'Login' : 'Sign up' }` }
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