import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { Button, Center, Divider, FormControl, Modal, ScrollView, Text, View, VStack } from 'native-base';
import i18n from 'i18n-js';

const ActivityAdvisorModal = props => {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setModalOpen(props.isOpen);
    }, [props.isOpen]);

    return (
        <Modal
            isOpen={ modalOpen }
        >
            <Modal.Content
                maxWidth='400px'
                width={ Dimensions.get('window').width - 40 }
                height={ Dimensions.get('window').height * 0.9 }
            >
                <Modal.Header
                    _text={ {
                        textAlign: 'center',
                        bg: 'indigo.500',
                        color: '#FFF',
                        borderRadius: 10,
                        padding: 2,
                        overflow: 'hidden'
                    } }
                >
                    Válassz az alábbi programajánlatok közül!
                </Modal.Header>
                <Modal.Body>
                    <Text>
                        To be filled
                    </Text>
                    <Divider
                        my={ 3 }
                        thickness={ 2 }
                    />
                </Modal.Body>
                <Center>
                    <Button
                        style={ styles.refreshButton }
                        onPress={ () => console.log('refresh') }
                    >
                        Új programokat kérek
                    </Button>
                </Center>
                <Modal.Footer>
                    <Divider
                        my={ 3 }
                        thickness={ 2 }
                    />
                    <Button.Group space={ 2 }>
                        <Button
                            variant='ghost'
                            colorScheme='blueGray'
                            onPress={ () => {
                                props.onCloseHandler();
                                setModalOpen(false);
                            } }
                        >
                            { i18n.t('cancel') }
                        </Button>
                        <Button
                            onPress={ () => console.log('pressed') }
                        >
                            Hozzáadás a programjaimhoz
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({
    label: {
        textAlign: 'center',
        backgroundColor: '#6366f1',
        color: '#FFF',
        borderRadius: 10,
        padding: 6,
        overflow: 'hidden'
    },
    refreshButton: {
        width: '80%',
        borderRadius: 10
    }
});

export default ActivityAdvisorModal;