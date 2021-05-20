import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  CLEAR_CREATE_OFFER_STATE,
  CREATE_OFFER_FAIL,
  CREATE_OFFER_LOADING,
  CREATE_OFFER_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import removeData from '../../../utils/removeData';
import storeData from '../../../utils/storeData';
import envs from '../../../config/env';

export const clearCreateOfferState = () => dispatch => {
  dispatch({
    type: CLEAR_CREATE_OFFER_STATE,
  });
};

export default (form, isLoggedIn) => dispatch => {

  dispatch({
    type: CREATE_OFFER_LOADING,
  });

  const form_data = new FormData();
  form_data.append('product', form.product);
  form_data.append('shop', form.shop);
  form_data.append('city', form.city);
  form_data.append('region', form.region);
  form_data.append('price', form.price);
  form_data.append('image', {
    uri: form.image?.path,
    name: form.image?.path.split('/')[form.image.path.split('/').length - 1],
    type: form.image?.mime,
  });

  AsyncStorage.getItem('access_token').then(value => {
    const access_token = value;
    axios
      .post('http://192.168.1.18:8000/offers/create/', form_data, {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: 'Bearer ' + access_token,
        },
      })
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
                AsyncStorage.getItem('access_token').then(value => {
                  const new_access_token = value;
                  axios
                    .post(envs.BACKEND_URL + 'offers/create/', form_data, {
                      headers: {
                        'Content-type': 'multipart/form-data',
                        Authorization: 'Bearer ' + new_access_token,
                      },
                    })
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
              })
              .catch(() => {
                removeData('refresh_token');
                removeData('acccess_token');
                removeData('username');
                dispatch({
                  type: CREATE_OFFER_FAIL,
                  payload: {error: 'Please log in again'},
                });
              });
          });
        } else {
          dispatch({
            type: CREATE_OFFER_FAIL,
            payload: err.response.data.errors.detail
              ? {error: 'You have to log in to create an offer'}
              : {error: 'Please fill in all the fields'},
          });
        }
      });
  });
};
