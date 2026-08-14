/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
// Use the configured store exported from the reducer folder
import Store from './App/Redux/reducer';

const Main = () => {
    return (
        <Provider
            store={Store}
        >
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
