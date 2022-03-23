import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Modal } from 'native-base';
import i18n from 'i18n-js';

const CalendarItemDetailsModal = props => {
    const { isOpen, setIsOpen, item } = props;

    return (
        <View>
            { item && <Modal isOpen={ isOpen }>
                <Modal.Content
                    maxWidth='400px'
                    width={ Dimensions.get('window').width - 40 }
                    height={ Dimensions.get('window').height * 0.9 }
                >
                    <Modal.Header
                        _text={ {
                            textAlign: 'center',
                            bg: 'primary.700',
                            color: '#FFF',
                            borderRadius: 10,
                            padding: 2,
                            overflow: 'hidden',
                            fontFamily: 'open-sans-bold'
                        } }
                    >
                        { item.name }
                    </Modal.Header>
                    <Modal.Body>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant='solid'
                            colorScheme='cyan'
                            onPress={ () => {
                                setIsOpen(false);
                            } }
                        >
                            { i18n.t('back') }
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal> }
        </View>
    );
};

const styles = StyleSheet.create({});

export default CalendarItemDetailsModal;