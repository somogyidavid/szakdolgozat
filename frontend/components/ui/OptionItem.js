import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { HStack, PresenceTransition, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const OptionItem = props => {
    const { visible, setVisible, title } = props;
    const Icon = props.icon;

    return (
        <VStack>
            <TouchableOpacity
                onPress={ () => setVisible(!visible) }
                activeOpacity={ 0.65 }
            >
                <VStack style={ styles.itemContainer }>
                    <HStack>
                        <HStack style={ { flex: 12 } }>
                            <Icon />
                            <Text style={ styles.text }>{ title }</Text>
                        </HStack>
                        <HStack style={ { flex: 1 } }>
                            <Ionicons
                                name={ visible ? 'chevron-up' : 'chevron-down' }
                                size={ 26 }
                                color='#FFF'
                            />
                        </HStack>
                    </HStack>
                </VStack>
            </TouchableOpacity>
            <PresenceTransition
                visible={ visible }
                initial={ { scale: 0, opacity: 0 } }
                animate={ {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        duration: 250
                    }
                } }
            >
                <HStack style={ styles.item }>
                    { props.children }
                </HStack>
            </PresenceTransition>
        </VStack>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: Colors.irisPurple,
        padding: 8,
        margin: 6,
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.9,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        overflow: 'hidden'
    },
    item: {
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 24
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans',
        marginLeft: 12
    },
    smallText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'open-sans',
        marginLeft: 12
    }
});

export default OptionItem;