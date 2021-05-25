import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CREATE_OFFER,
  FILTER,
  FILTERED_OFFERS,
  LOGIN,
  MY_OFFERS,
  OFFER_DETAIL,
  OFFER_LIST,
  REGISTER,
  REQUEST_RESET_PASSWORD,
} from '../constants/routeNames';
import Offers from '../screens/Offers';
import OfferDetail from '../screens/OfferDetail';
import CreateOffer from '../screens/CreateOffer';
import Filter from '../screens/Filter';
import Login from '../screens/Login';
import Register from '../screens/Register';
import MyOffers from '../screens/MyOffers';
import FilteredOffers from '../screens/FilteredOffers';
import RequestResetPassword from '../screens/RequestResetPassword';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={OFFER_LIST}>
      <HomeStack.Screen name={OFFER_LIST} component={Offers} />
      <HomeStack.Screen name={MY_OFFERS} component={MyOffers} />
      <HomeStack.Screen name={OFFER_DETAIL} component={OfferDetail} />
      <HomeStack.Screen name={CREATE_OFFER} component={CreateOffer} />
      <HomeStack.Screen name={FILTERED_OFFERS} component={FilteredOffers} />
      <HomeStack.Screen name={FILTER} component={Filter} />
      <HomeStack.Screen name={LOGIN} component={Login} />
      <HomeStack.Screen name={REGISTER} component={Register} />
      <HomeStack.Screen name={REQUEST_RESET_PASSWORD} component={RequestResetPassword} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
