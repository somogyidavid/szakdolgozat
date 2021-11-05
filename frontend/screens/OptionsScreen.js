import React, { useState } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import i18n from 'i18n-js';
import SeparatorLine from '../components/ui/SeparatorLine';

const OptionsScreen = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(prevState => !prevState);
    };

    return (
        <View style={ styles.container }>
            <SeparatorLine text={ i18n.t('general') } />
            <View style={ styles.itemContainer }>
                <View>
                    <Text style={ styles.text }>{ i18n.t('darkMode') }</Text>
                </View>
                <View>
                    <Switch
                        value={ isEnabled }
                        onValueChange={ toggleSwitch }
                        trackColor={ { false: Colors.dark, true: Colors.light } }
                        thumbColor='white'
                        ios_backgroundColor={ Colors.dark }
                    />
                </View>
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
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default OptionsScreen;