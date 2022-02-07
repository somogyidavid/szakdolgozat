import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import SeparatorLine from '../../components/ui/SeparatorLine';
import { Button, FormControl, Icon, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import InputSpinner from 'react-native-input-spinner';
import i18n from 'i18n-js';

const ProfileScreen = props => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(18);

    return (
        <View style={ styles.container }>
            <SeparatorLine text={ 'Adatok' } />
            <FormControl ml={ 12 }>
                <FormControl.Label _text={ { style: styles.label } }>
                    Teljes név
                </FormControl.Label>
                <Input
                    value={ name }
                    variant='rounded'
                    width={ Dimensions.get('window').width * 0.9 }
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
                    Életkor
                </FormControl.Label>
                <InputSpinner
                    value={ age }
                    min={ 1 }
                    max={ 120 }
                    step={ 1 }
                    style={ styles.inputSpinner }
                    color='#FFF'
                    textColor='#FFF'
                    selectionColor='#FFF'
                    showBorder={ true }
                    rounded={ false }
                    onChange={ (value) => setAge(value) }
                />
            </FormControl>
            <Button
                mt={ 4 }
                style={ styles.saveButton }
                _text={ { style: styles.buttonText } }
                _pressed={ { style: styles.pressedButton } }
            >
                { i18n.t('save') }
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.darkPurple
    },
    label: {
        color: Colors.dark,
        backgroundColor: '#FFF',
        padding: 6,
        borderRadius: 10,
        overflow: 'hidden',
        fontSize: 16,
        fontFamily: 'open-sans'
    },
    inputSpinner: {
        width: Dimensions.get('window').width * 0.9
    },
    saveButton: {
        backgroundColor: '#FFF'
    },
    buttonText: {
        color: Colors.dark,
        fontFamily: 'open-sans-bold'
    },
    pressedButton: {
        backgroundColor: Colors.light
    }
});

export default ProfileScreen;