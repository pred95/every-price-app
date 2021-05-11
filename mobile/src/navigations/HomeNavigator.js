import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  FILTER,
  OFFER_CREATE,
  OFFER_DETAIL,
  OFFER_LIST,
} from '../constants/routeNames';
import Offers from '../screens/Offers';
import OfferDetail from '../screens/OfferDetail';
import CreateOffer from '../screens/CreateOffer';
import Filter from '../screens/Filter';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={OFFER_LIST}>
      <HomeStack.Screen name={OFFER_LIST} component={Offers}></HomeStack.Screen>
      <HomeStack.Screen
        name={OFFER_DETAIL}
        component={OfferDetail}></HomeStack.Screen>
      <HomeStack.Screen
        name={OFFER_CREATE}
        component={CreateOffer}></HomeStack.Screen>
      <HomeStack.Screen name={FILTER} component={Filter}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
