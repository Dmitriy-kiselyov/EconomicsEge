import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { Root } from './src/components/Root';
import { name as appName } from './app.json';
import { store } from './src/store/store';

AppRegistry.registerComponent(appName, () => () => (
    <Provider store={store}>
        <Root />
    </Provider>
));
