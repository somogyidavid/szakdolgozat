import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={ fetchFonts }
                onFinish={ () => setFontLoaded(true) }
                onError={ () => Alert.alert('Error!', 'Could not load fonts!', [{ text: 'Okay' }]) }
            />
        );
    }

    return (
        <View>
            <Text>App.js</Text>
        </View>
    );
};

export default App;