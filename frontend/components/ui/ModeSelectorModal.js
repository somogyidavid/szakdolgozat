import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Center, FormControl, Modal } from 'native-base';

const ModeSelectorModal = props => {
    return (
        <Modal
            isOpen={ props.showModal && !props.didSelectMode }
            onClose={ () => props.setShowModal(false) }
        >
            <Modal.Content maxWidth='400px'>
                <Modal.Header>Select Mode</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <Center>
                            <Button.Group
                                space={ 16 }
                                size={ 'lg' }
                                style={ { marginVertical: 10 } }
                            >
                                <Button
                                    colorScheme={ 'indigo' }
                                    variant={ props.isCustom ? 'subtle' : 'solid' }
                                    onPress={ () => props.setIsCustom(false) }
                                >
                                    Advise
                                </Button>
                                <Button
                                    colorScheme={ 'indigo' }
                                    variant={ props.isCustom ? 'solid' : 'subtle' }
                                    onPress={ () => props.setIsCustom(true) }
                                >
                                    Custom
                                </Button>
                            </Button.Group>
                        </Center>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={ 2 }>
                        <Button
                            variant='ghost'
                            colorScheme='blueGray'
                            onPress={ () => {
                                props.setShowModal(false);
                            } }
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={ () => {
                                props.setDidSelectMode(true);
                                props.setShowModal(false);
                            } }
                        >
                            Select
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({});

export default ModeSelectorModal;