import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import { AUTH_NAVIGATOR, HOME_NAVIGATOR } from '../constants/routeNames';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator}></Drawer.Screen>
      <Drawer.Screen name={AUTH_NAVIGATOR} component={AuthNavigator}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
