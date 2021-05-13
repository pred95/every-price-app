import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('username');
      if (user) {
        setIsAuthenticated(true);
      } else {
        isAuthenticated(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavContainer;
