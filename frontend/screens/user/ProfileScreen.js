import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import SeparatorLine from '../../components/ui/SeparatorLine';

const ProfileScreen = props => {
    return (
        <View style={ styles.container }>
            <SeparatorLine text={ 'Adatok' } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.darkPurple
    }
});

export default ProfileScreen;