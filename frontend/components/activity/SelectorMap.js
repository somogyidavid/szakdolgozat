import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Modal, Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

const SelectorMap = props => {
    const location = useSelector(state => state.location.location);
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: location.lat,
        longitude: location.lng
    });
    const [region, setRegion] = useState({
        ...selectedLocation,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
    });

    const setLocationHandler = (event) => {
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
        setRegion({
            ...region,
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
    };


    return (
        <Modal
            isOpen={ props.visible }
        >
            <Modal.Content>
                <Modal.Header>
                    <Text style={ styles.label }>Helyszín kiválasztása</Text>
                </Modal.Header>
                <Modal.Body>
                    <MapView
                        style={ styles.map }
                        region={ region }
                        onPress={ setLocationHandler }
                    >
                        <Marker coordinate={ selectedLocation } />
                    </MapView>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={ 2 }>
                        <Button
                            variant='ghost'
                            colorScheme='blueGray'
                            onPress={ () => props.closeHandler() }
                        >
                            Mégse
                        </Button>
                        <Button
                            onPress={ () => props.saveHandler(selectedLocation) }
                        >
                            Kiválaszt
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height
    },
    label: {
        textAlign: 'center',
        backgroundColor: '#6366f1',
        color: '#FFF',
        borderRadius: 10,
        padding: 6
    },
});

export default SelectorMap;