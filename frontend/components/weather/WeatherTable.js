import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import WeatherTableItem from './WeatherTableItem';

const WeatherTable = props => {
    return (
        <View style={ styles.container }>
            <FlatList
                data={ props.weather }
                renderItem={ ({ index }) => <WeatherTableItem
                    weather={ props.weather[index] }
                /> }
                keyExtractor={ (item, index) => index.toString() }
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});

export default WeatherTable;