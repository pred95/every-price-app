import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import {AUTH_NAVIGATOR, HOME_NAVIGATOR} from '../constants/routeNames';
import SideMenu from './SideMenu';

const getDrawerContent = navigation => {
  return <SideMenu navigation={navigation} />;
};
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerType="back"
      drawerContent={({navigation}) => getDrawerContent(navigation)}>
      <Drawer.Screen
        name={HOME_NAVIGATOR}
        component={HomeNavigator}></Drawer.Screen>
      {/* <Drawer.Screen
        name={AUTH_NAVIGATOR}
        component={AuthNavigator}></Drawer.Screen> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
