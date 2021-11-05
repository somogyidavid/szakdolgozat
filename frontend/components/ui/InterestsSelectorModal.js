import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, Platform, FlatList, TouchableNativeFeedback, Dimensions } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Colors from '../../constants/Colors';
import { saveFirstLaunchToStorage } from '../../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Button';
import Title from './Title';
import { PlacesTypes } from '../../data/places-types';
import HelpButton from './HelpButton';
import InterestsSelectorItem from './InterestsSelectorItem';
import { AntDesign } from '@expo/vector-icons';

const InterestsSelectorModal = props => {
    const flatList = useRef(null);
    const [visible, setVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [chosenItems, setChosenItems] = useState([]);
    const [bottomIcon, setBottomIcon] = useState('downcircleo');

    const launchHandler = async () => {
        setIsLoading(true);
        const result = await AsyncStorage.getItem('firstLaunch');
        setVisible(result ? JSON.parse(result).firstLaunch : visible);
        setIsLoading(false);
    };

    const onViewableItemsChanged = useRef(({ changed, viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            viewableItems.forEach(item => {
                if (item.isViewable && item.index === 1) {
                    setBottomIcon('downcircleo');
                }
            });
        }
    });

    const chosenItemHandler = (item) => {
        if (chosenItems.includes(item)) {
            setChosenItems(chosenItems.filter((_, index) => index !== chosenItems.indexOf(item)));
        } else {
            setChosenItems(chosenItems.concat(item));
        }
    };

    useEffect(() => {
        launchHandler();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <Modal
            animationType={ Platform.OS === 'android' ? 'slide' : 'fade' }
            transparent={ true }
            visible={ visible }
            statusBarTranslucent={ false }
        >
            <View style={ styles.modalContainer }>
                <View style={ styles.modalContent }>
                    <Title
                        content={ 'Choose your interests!' }
                        titleStyle={ styles.title }
                    />
                    <View style={ styles.itemCounter }>
                        <View>
                            <Text style={ { color: chosenItems.length < 5 ? 'red' : 'green' } }>
                                Interests chosen: { chosenItems.length }/5
                            </Text>
                        </View>
                        <View style={ { marginLeft: 8 } }>
                            { chosenItems.length < 5 ? <AntDesign
                                name={ 'exclamationcircleo' }
                                size={ 24 }
                                color={ 'red' }
                            /> : <AntDesign
                                  name={ 'checkcircleo' }
                                  size={ 24 }
                                  color={ 'green' }
                              /> }
                        </View>
                    </View>
                    <Tooltip
                        arrowSize={ { width: 16, height: 8 } }
                        backgroundColor={ 'rgba(0, 0, 0, 0.5)' }
                        isVisible={ tooltipVisible }
                        content={
                            <Text>
                                Choose at least 5 of the items from the list below, which you are interested in, and the
                                application will recommend activities like those! You can edit them later of
                                course, in the options!
                            </Text> }
                        placement='bottom'
                        onClose={ () => setTooltipVisible(false) }
                    >
                        <HelpButton
                            iconName='help-circle-outline'
                            onPress={ () => setTooltipVisible(true) }
                        />
                    </Tooltip>
                    <View style={ { flex: 1, height: Dimensions.get('window').height } }>
                        <FlatList
                            ref={ flatList }
                            data={ PlacesTypes }
                            renderItem={ ({ index, item }) => <InterestsSelectorItem
                                item={ item }
                                chosenHandler={ chosenItemHandler }
                            /> }
                            keyExtractor={ (item, index) => index.toString() }
                            onEndReached={ () => setBottomIcon('upcircleo') }
                            onEndReachedThreshold={ 0.1 }
                            onViewableItemsChanged={ onViewableItemsChanged.current }
                        />
                    </View>
                    <AntDesign
                        name={ bottomIcon }
                        size={ 25 }
                        color={ 'white' }
                        style={ { marginBottom: 6 } }
                        onPress={ () => {
                            if (bottomIcon === 'downcircleo') {
                                flatList.current.scrollToEnd();
                            } else if (bottomIcon === 'upcircleo') {
                                flatList.current.scrollToIndex({ index: 0 });
                                setBottomIcon('downcircleo');
                            }
                        } }
                    />
                    <Button
                        title='Save!'
                        style={ styles.button }
                        onPress={ () => {
                            saveFirstLaunchToStorage();
                            setVisible(false);
                            console.log(chosenItems);
                        } }
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalContent: {
        width: '95%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.dark,
        borderRadius: 40,
        padding: 10,
        overflow: 'hidden'
    },
    itemCounter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: Colors.darkPurple,
        padding: 8,
        borderRadius: 20
    },
    button: {
        height: '8%',
        marginBottom: 6
    },
    title: {
        textAlign: 'center'
    }
});

export default InterestsSelectorModal;