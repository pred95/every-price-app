import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import { Text } from 'react-native';

const AppNavContainer = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavContainer;
