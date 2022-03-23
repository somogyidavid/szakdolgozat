import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import i18n from 'i18n-js';

const InterestsSelectorItem = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(prevState => !prevState);
        props.chosenHandler(props.item.type);
    };

    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.text }>{ i18n.t(props.item.type) }</Text>
            </View>
            <View>
                <Switch
                    value={ isEnabled }
                    onValueChange={ toggleSwitch }
                    trackColor={ { false: Colors.darkPurple, true: Colors.light } }
                    thumbColor='white'
                    ios_backgroundColor={ Colors.darkPurple }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6
    },
    text: {
        color: 'white',
        marginRight: '30%'
    }
});

export default InterestsSelectorItem;