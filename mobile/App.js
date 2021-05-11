/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from './src/navigations';
import {LogBox} from 'react-native';
import GlobalProvider from './src/context/Provider';

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
};

export default App;
