import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import {AUTH_NAVIGATOR, HOME_NAVIGATOR} from '../constants/routeNames';
import SideMenu from './SideMenu';
import {GlobalContext} from '../context/Provider';

const getDrawerContent = (navigation, authDispatch) => {
  return <SideMenu navigation={navigation} authDispatch={authDispatch} />;
};
const DrawerNavigator = () => {
  const {authDispatch} = useContext(GlobalContext);
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerType="back"
      drawerContent={({navigation}) =>
        getDrawerContent(navigation, authDispatch)
      }>
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
