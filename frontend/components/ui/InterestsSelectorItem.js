import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Colors from '../../constants/Colors';

const InterestsSelectorItem = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(prevState => !prevState);
        props.chosenHandler(props.item.type);
    };

    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.text }>{ props.item.title }</Text>
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