import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as Localization from 'expo-localization';
import AppNavigator from './navigation/AppNavigator';
import i18n from 'i18n-js';
import Translations from './i18n/translations';

i18n.translations = Translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

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
        <AppNavigator />
    );
};

export default App;