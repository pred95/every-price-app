import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {
  CREATE_OFFER_FAIL,
  CREATE_OFFER_LOADING,
  CREATE_OFFER_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import removeData from '../../../utils/removeData';
import storeData from '../../../utils/storeData';

export const clearCreateOfferState = () => dispatch => {
  dispatch({
    type: CREATE_OFFER_LOADING,
  });
};

export default (form, isLoggedIn) => dispatch => {
  const requestPayload = {
    product: form.product,
    shop: form.shop,
    city: form.city,
    region: form.region,
    price: form.price,
    image: null,
  };
  dispatch({
    type: CREATE_OFFER_LOADING,
  });

  axiosInstance
    .post(`offers/create/`, requestPayload)
    .then(res => {
      dispatch({
        type: CREATE_OFFER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      if (isLoggedIn) {
        AsyncStorage.getItem('refresh_token').then(value => {
          const refresh = value;
          axiosInstance
            .post(`auth/token/refresh/`, {
              refresh: refresh,
            })
            .then(res => {
              removeData('access_token');
              storeData('access_token', res.data.access);
              axiosInstance
                .post(`offers/create/`, requestPayload)
                .then(res => {
                  dispatch({type: CREATE_OFFER_SUCCESS, payload: res.data});
                })
                .catch(err => {
                  dispatch({
                    type: CREATE_OFFER_FAIL,
                    payload: err.response.data.errors.error
                      ? {error: 'Offer already exists'}
                      : {error: 'Please fill in all the fields'},
                  });
                });
            });
        });
      } else {
        console.log(`err`, err.response.data);
        dispatch({
          type: CREATE_OFFER_FAIL,
          payload: err.response.data.errors.detail
            ? {error: 'You have to log in to create an offer'}
            : {error: 'Please fill in all the fields'},
        });
      }
    });
};
