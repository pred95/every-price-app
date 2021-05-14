import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CREATE_OFFER,
  FILTER,
  LOGIN,
  OFFER_DETAIL,
  OFFER_LIST,
  REGISTER,
} from '../constants/routeNames';
import Offers from '../screens/Offers';
import OfferDetail from '../screens/OfferDetail';
import CreateOffer from '../screens/CreateOffer';
import Filter from '../screens/Filter';
import Login from '../screens/Login';
import Register from '../screens/Register';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={OFFER_LIST}>
      <HomeStack.Screen name={OFFER_LIST} component={Offers} />
      <HomeStack.Screen name={OFFER_DETAIL} component={OfferDetail} />
      <HomeStack.Screen name={CREATE_OFFER} component={CreateOffer} />
      <HomeStack.Screen name={FILTER} component={Filter} />
      <HomeStack.Screen name={LOGIN} component={Login}></HomeStack.Screen>
      <HomeStack.Screen name={REGISTER} component={Register}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
