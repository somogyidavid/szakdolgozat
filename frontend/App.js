import React, { useState } from 'react';
import { Alert, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as Localization from 'expo-localization';
import AppNavigator from './navigation/AppNavigator';
import i18n from 'i18n-js';
import Translations from './i18n/translations';
import { Asset } from 'expo-asset';
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider';
import { extendTheme } from 'native-base';
import moment from 'moment';

moment.locale(Localization.locale);

i18n.translations = Translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

const loadImages = () => {
    const images = [
        require('./assets/images/fog.jpeg'),
        require('./assets/images/snow.jpeg'),
        require('./assets/images/rain.jpeg'),
        require('./assets/images/cloud_day.jpeg'),
        require('./assets/images/cloud_night.jpeg'),
        require('./assets/images/clear_day.jpeg'),
        require('./assets/images/clear_night.jpeg'),
        require('./assets/images/drizzle.jpeg'),
        require('./assets/images/thunder.jpeg'),
        require('./assets/images/wind.jpeg')
    ];

    const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
};

const loadResources = async () => {
    await fetchFonts();
    await loadImages();
};

LogBox.ignoreLogs(['Setting a timer for a long period of time']);
LogBox.ignoreLogs(['Cannot update a component']);
LogBox.ignoreLogs(['Can\'t perform a React state update']);
LogBox.ignoreLogs(['Non-serializable values were found']);
LogBox.ignoreLogs(['Deprecation warning: value provided is not in a recognized RFC2822 or ISO format.']);
LogBox.ignoreLogs(['When server rendering, you must wrap your application in an']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation']);

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    const theme = extendTheme({
        components: {}
    });

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={ loadResources }
                onFinish={ () => setFontLoaded(true) }
                onError={ () => Alert.alert('Error!', 'Could not load fonts!', [{ text: 'Okay' }]) }
            />
        );
    }

    return (
        <NativeBaseProvider theme={ theme }>
            <Provider store={ store }>
                <AppNavigator />
            </Provider>
        </NativeBaseProvider>
    );
};

export default App;